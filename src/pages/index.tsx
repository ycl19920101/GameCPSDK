import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import {homepageCardsMap} from '../../partners/homepage-cards';
import type {SdkCardProps} from '../../partners/homepage-cards';

function SdkCard({title, description, to, tags}: SdkCardProps) {
  return (
    <Link to={to} className={styles.sdkCard}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.tags}>
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </Link>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const partnerId = (siteConfig.customFields?.partnerId as string) ?? 'full';
  const sdkCards = homepageCardsMap[partnerId] ?? homepageCardsMap['full']!;

  return (
    <Layout title={siteConfig.title} description="猕猴桃SDK对接文档中心">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main className={styles.main}>
        <section className={styles.sdkGrid}>
          {sdkCards.map((card) => (
            <SdkCard key={card.title} {...card} />
          ))}
        </section>
      </main>
    </Layout>
  );
}
