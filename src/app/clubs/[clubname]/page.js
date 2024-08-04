import { getClubByUrlName, getAllClubUrlNames } from '@/lib/clubs';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Banner from '@/components/Banner';

export default async function ClubPage({ params }) {
  const club = await getClubByUrlName(params.clubname);

  if (!club) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Banner />

      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-4">{club.name}</h1>
        <p className="mb-2">{club.address}</p>
        <p className="mb-2">{club.city}, {club.country}</p>
        {club.zipcode && <p className="mb-2">Zip Code: {club.zipcode}</p>}
        {club.website && (
          <p className="mb-2">
            <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Visit Website
            </a>
          </p>
        )}
        {club.phone && (
          <p className="mb-2">
            <a href={`tel:${club.phone}`} className="text-blue-500 hover:underline">
              Call {club.phone}
            </a>
          </p>
        )}
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Map
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const urlNames = await getAllClubUrlNames();
  return urlNames.map((urlName) => ({
    clubname: urlName,
  }));
}