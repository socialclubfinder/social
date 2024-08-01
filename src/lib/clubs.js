import clubsData from '../data/socialclubs.json'; // Adjust the path as needed

function formatNameForUrl(name) {
  return name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}

export function getAllClubs() {
  return Object.entries(clubsData).flatMap(([country, clubs]) => 
    clubs.map(club => ({
      ...club,
      country,
      urlName: formatNameForUrl(club.name)
    }))
  );
}

export function getClubByUrlName(urlName) {
  const allClubs = getAllClubs();
  return allClubs.find(club => formatNameForUrl(club.name) === urlName) || null;
}

export function getAllClubUrlNames() {
  const allClubs = getAllClubs();
  return allClubs.map(club => formatNameForUrl(club.name));
}
