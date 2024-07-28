import styles from './Malta.module.css';

export default function Malta() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Malta</h1>
      <p className={styles.paragraph}>
        <strong>Malta</strong>
      </p>
      <p className={styles.paragraph}>
        Malta became the first country in the European Union to legalize cannabis
        for adult-use in 2021. Under the Cannabis Reform Act, consumers are now
        permitted to carry up to 7g of cannabis in public and grow four plants
        at home, without risk of prosecution. The country has taken a
        non-commercial approach, with consumers required to purchase cannabis
        through formally regulated membership-based non-profit cooperatives,
        rather than dispensaries, pharmacies, or stores. Six entities have
        received licenses to operate clubs, the first of which began
        distributing cannabis to members at the end of January.
      </p>
      <p className={styles.paragraph}>
        Speaking at a webinar hosted by the European Monitoring Centre for Drugs
        and Drug Addiction (EMCDDA) in September 2023, Leonid McKay, executive
        chairperson of Malta’s Authority for the Responsible Use of Cannabis
        (ARUC), said: “Our reform is not about the maximization of profits... In
        Malta, we strongly believe that a full-blown commercialized market goes
        against the very principles of harm reduction.”
      </p>
    </div>
  );
}
