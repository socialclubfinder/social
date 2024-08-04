import { NextResponse } from 'next/server';
import { Client } from 'pg';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request) {
  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return NextResponse.json({ error: 'Unsupported Media Type' }, { status: 415 });
  }

  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Ensure openingHours and memberfee are parsed from JSON strings
    if (typeof data.openingHours === 'string') {
      data.openingHours = JSON.parse(data.openingHours);
    }
    if (typeof data.memberfee === 'string') {
      data.memberfee = JSON.parse(data.memberfee);
    }

    await client.connect();
    const query = `
      INSERT INTO pending_clubs (name, address, zipcode, city, country, website, email, phone, openinghours, description, image, memberfee)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    `;
    const values = [
      data.name,
      data.address,
      data.zipcode,
      data.city,
      data.country,
      data.website,
      data.email,
      data.phone,
      JSON.stringify(data.openingHours),
      data.description,
      data.image || null, // Use null if no image CID is provided
      JSON.stringify(data.memberfee),
    ];

    await client.query(query, values);
    console.log('Club added successfully');
    return NextResponse.json({ message: 'Club added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Error adding club: ' + error.message }, { status: 500 });
  } finally {
    await client.end();
  }
}