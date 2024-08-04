import { query } from './db';

export async function getClubsByCountry() {
  try {
    console.log('Attempting to fetch clubs from database...');
    const result = await query(`
      SELECT 
        country, 
        json_agg(json_build_object(
          'id', id,
          'name', name,
          'city', city,
          'address', address,
          'zipcode', zipcode,
          'lat', latitude,
          'long', longitude,
          'website', website,
          'phone', phone
        )) as clubs
      FROM approved_clubs
      GROUP BY country
    `);
    
    console.log('Query result row count:', result.length);
    
    if (result.length === 0) {
      console.log('No clubs found in the database');
      return {};
    }

    return result.reduce((acc, row) => {
      acc[row.country] = row.clubs;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error in getClubsByCountry:', error);
    throw error;
  }
}

export async function getAllClubs() {
  try {
    const result = await query(`
      SELECT * FROM approved_clubs
    `);
    return result.map(club => ({
      ...club,
      urlName: formatNameForUrl(club.name)
    }));
  } catch (error) {
    console.error('Error in getAllClubs:', error);
    throw error;
  }
}

export async function getClubByUrlName(urlName) {
  try {
    const clubs = await getAllClubs();
    return clubs.find(club => club.urlName === urlName) || null;
  } catch (error) {
    console.error('Error in getClubByUrlName:', error);
    throw error;
  }
}

export async function getAllClubUrlNames() {
  try {
    const clubs = await getAllClubs();
    return clubs.map(club => formatNameForUrl(club.name));
  } catch (error) {
    console.error('Error in getAllClubUrlNames:', error);
    throw error;
  }
}

function formatNameForUrl(name) {
  return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}