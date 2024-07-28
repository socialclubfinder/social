import { NextResponse } from 'next/server';
import kitespots from '../../../data/socialclubs.json';

export async function GET() {
  try {
    console.log('Socialclub data:', JSON.stringify(kitespots, null, 2));
    return NextResponse.json(kitespots);
  } catch (error) {
    console.error('Error in socialclub API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}