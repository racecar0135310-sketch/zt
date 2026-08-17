import { supabase } from '../supabase.js';

export async function onRequest() {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .limit(100);
    if (error) throw error;
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}