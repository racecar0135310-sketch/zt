import { supabase } from '../../supabase.js';

export async function onRequest(context) {
  const { request } = context;
  
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use POST.' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: 'Username and password required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ⚠️ For now, plain-text check – upgrade to bcrypt later
    if (data.password !== password) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { password: _, ...safeUser } = data;
    return new Response(
      JSON.stringify({ success: true, user: safeUser }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}