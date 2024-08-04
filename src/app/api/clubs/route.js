import { getClubsByCountry } from '@/lib/clubs';

export async function GET() {
  try {
    console.log('API route: Attempting to fetch clubs...');
    const clubs = await getClubsByCountry();
    console.log('API route: Clubs fetched:', clubs);
    
    if (Object.keys(clubs).length === 0) {
      return new Response(JSON.stringify({ message: 'No clubs found' }), {
        status: 204,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(clubs), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch clubs', 
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}