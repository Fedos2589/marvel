import { Section } from './section';

import styles from './accordion.module.scss';

export type AccordionSections = Record<string, string[]>

export interface AccordionProps {
  sections: AccordionSections;
}

export const Accordion = ({ sections }: AccordionProps) =>
  <div className={styles.container}>
    {Object.keys(sections).map(sectionTitle =>
      <Section key={sectionTitle} title={sectionTitle} list={sections[sectionTitle]} />)
    }
  </div>
