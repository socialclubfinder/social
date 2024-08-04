import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import FormData from 'form-data';

// Retrieve the PINATA_JWT from environment variables
const PINATA_JWT = process.env.PINATA_JWT_KEY;

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const pinataForm = new FormData();
    pinataForm.append('file', buffer, { filename: file.name, contentType: file.type });
    pinataForm.append('pinataMetadata', JSON.stringify({ name: "image" }));
    pinataForm.append('pinataOptions', JSON.stringify({}));

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: pinataForm,
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error('Pinata response:', response.status, responseText);
      throw new Error(`Pinata upload failed with status ${response.status}: ${responseText}`);
    }

    const data = await response.json();
    console.log('Pinata upload successful, IpfsHash:', data.IpfsHash);

    return NextResponse.json({ success: true, ipfsHash: data.IpfsHash });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
