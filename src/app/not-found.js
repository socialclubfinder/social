import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>View our list of cannabis clubs to find what you&apos;re looking for:</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}