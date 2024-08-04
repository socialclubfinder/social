import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import FormData from 'form-data';

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3MGUxMWJhNi05YWU3LTRmNGMtYTIzNi1iODg0ZDk5Y2M4MDIiLCJlbWFpbCI6ImNvZGVpbmd3aXRoam9lQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIwOTlmZWY0OTgwMzRmMDk0ZTZmNCIsInNjb3BlZEtleVNlY3JldCI6IjI5NmY5NTFlZTViZjQwNmZkZTM3NDhjYWY0ZjQ0MDMzYzQxZmVlZDhmODFlNDRhYzAwMjY4NjlmZGI0Y2FjZjMiLCJleHAiOjE3NTQyODY1NDd9.yqqL6VXV-tlBnBLN_EtrXfdRgspVSH1VQIu1tta16zg';

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