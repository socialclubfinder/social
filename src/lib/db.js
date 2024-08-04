import { Client } from 'pg';

let client;

async function connectToDatabase() {
  if (!client) {
    console.log('Initializing database connection...');
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    try {
      await client.connect();
      console.log('Database connected successfully');
    } catch (err) {
      console.error('Error connecting to database:', err);
      throw err;
    }
  }
  return client;
}

export async function query(text, params) {
  const client = await connectToDatabase();
  try {
    console.log('Executing query:', text);
    const result = await client.query(text, params);
    console.log('Query executed successfully, rows:', result.rows.length);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

export { connectToDatabase };