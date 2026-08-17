export async function onRequest() {
  return new Response(
    JSON.stringify({ status: 'ok', database: 'connected' }),
    { headers: { 'Content-Type': 'application/json' } }
  );
}