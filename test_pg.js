const { Client } = require('pg');

async function testConn() {
  const connStr = 'postgresql://postgres.hfifupzdtuhotjkwsduc:Leo10Messi10*%2F*@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require';
  const client = new Client({ connectionString: connStr });
  try {
    await client.connect();
    console.log("SUCCESS: Connected to Supabase directly via pg client!");
    const res = await client.query('SELECT NOW()');
    console.log("Current DB Time:", res.rows[0]);
    await client.end();
  } catch(e) {
    console.error("FAIL:", e.message);
  }
}
testConn();