import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface SdkCardProps {
  title: string;
  description: string;
  to: string;
  tags: string[];
}

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

const sdkCards: SdkCardProps[] = [
  {
    title: 'APP SDK 海外版 (iOS)',
    description: '海外iOS应用SDK对接，支持游客登录、Apple登录、Facebook登录、内购支付、数据上报等功能',
    to: '/docs/app-sdk/overseas/quick-start',
    tags: ['iOS', '海外版', 'Facebook'],
  },
  {
    title: 'APP SDK 国内版 (iOS)',
    description: '国内iOS应用SDK对接，支持微信登录、用户中心、关键行为上报、引力引擎等功能',
    to: '/docs/app-sdk/domestic/integration-guide',
    tags: ['iOS', '国内版', '微信'],
  },
  {
    title: '微信小游戏 SDK',
    description: '微信小游戏平台SDK对接，包含前端JS接口、服务端对接、加签验证、数据上报',
    to: '/docs/mini-game/wechat/frontend-guide',
    tags: ['JavaScript', '微信'],
  },
  {
    title: '抖音小游戏 SDK',
    description: '抖音小游戏平台SDK对接，包含前端JS接口、服务端对接、虚拟支付、数据上报',
    to: '/docs/mini-game/douyin/frontend-guide',
    tags: ['JavaScript', '抖音'],
  },
  {
    title: '快手小游戏 SDK',
    description: '快手小游戏平台SDK对接，包含前端JS接口、服务端对接、支付、视频广告、数据上报',
    to: '/docs/mini-game/kuaishou/frontend-guide',
    tags: ['JavaScript', '快手'],
  },
];

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
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
