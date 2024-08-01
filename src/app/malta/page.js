import React from 'react';

export default function Malta() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cannabis in Malta</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legalization and Regulations</h2>
        <p className="mb-4">
          In 2021, Malta became the first EU country to legalize recreational cannabis for personal use and possession. Individuals over 18 can:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Carry up to 7g of cannabis</li>
          <li>Grow four plants per household</li>
          <li>Possess up to 50g of dried cannabis</li>
        </ul>
        <p className="mb-4">
          The Authority on the Responsible Use of Cannabis (ARUC) oversees the implementation and regulation of this law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cannabis Social Clubs (CSCs)</h2>
        <p className="mb-4">
          Cannabis clubs, known as &apos;Cannabis Harm Reduction Associations,&apos; are the sole legal source for purchasing cannabis in Malta. These member-only, non-profit organizations operate under strict guidelines.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Joining a Cannabis Club in Malta</h2>
        <p className="mb-4">To become a member of a Cannabis Club in Malta:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Visit ARUC&apos;s website (https://aruc.mt)</li>
          <li>Navigate to the &quot;Associations&quot; tab</li>
          <li>Select your preferred club from the list of approved associations</li>
          <li>Contact the club via phone or email for membership procedures</li>
        </ol>
        <p className="mb-4">
          Note that clubs have the right to refuse membership, and currently, only three clubs are operational with limited membership spots.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Starting a Cannabis Club in Malta</h2>
        <p className="mb-4">To start a Cannabis Club in Malta:</p>
        <ol className="list-decimal pl-6 mb-4">
          <li>Decide on the club category based on intended membership (50 to 500 members)</li>
          <li>Propose a name for your cannabis club</li>
          <li>Provide details such as registered address and information about founding members, administrators, and key persons</li>
          <li>Prepare and submit required documentation, including:</li>
        </ol>
        <ul className="list-disc pl-10 mb-4">
          <li>Draft Statute of the Cannabis Association</li>
          <li>Logo</li>
          <li>Membership Policies</li>
          <li>Organizational Structure</li>
          <li>Personal Declaration Forms and Source of Wealth</li>
          <li>Fit and Proper Enquiry</li>
          <li>Code of Conduct</li>
          <li>Declaration by an Architect</li>
          <li>Detailed Floor Plan</li>
          <li>Operating Environment Details</li>
          <li>Distribution Process Details</li>
          <li>Human Resources Plan</li>
          <li>Financial Plan</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current State of Cannabis Clubs</h2>
        <p className="mb-4">As of May 2024:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Three legal cannabis clubs are operational</li>
          <li>750 individuals signed up for club memberships in the first month</li>
          <li>Seven associations have been issued licenses</li>
          <li>Remaining clubs are undergoing testing before operation</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Malta&apos;s Approach to Cannabis Regulation</h2>
        <p className="mb-4">
          Malta&apos;s cannabis reform is focused on harm reduction rather than profit maximization. As Leonid McKay, executive chairperson of ARUC, stated: {`"Our reform is not about the maximization of profits... In Malta, we strongly believe that a full-blown commercialized market goes against the very principles of harm reduction."`}
        </p>
      </section>
    </div>
  );
}