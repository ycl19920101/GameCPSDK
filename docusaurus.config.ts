import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {partnerConfig} from './partners/partner-registry';

const partner = process.env.PARTNER || 'full';
const config = partnerConfig[partner] ?? partnerConfig['full']!;

export default {
  title: config.title,
  tagline: config.tagline,
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ycl19920101.github.io',
  baseUrl: config.baseUrl,

  onBrokenLinks: 'throw',

  organizationName: 'ycl19920101',
  projectName: 'GameCPSDK',
  trailingSlash: false,

  customFields: {
    partnerId: config.partnerId,
  },

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: config.sidebarPath,
          exclude: config.exclude,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: config.navbarTitle,
      items: config.navbarItems as Preset.ThemeConfig['navbar']['items'],
    },
    footer: {
      style: 'dark',
      links: config.footerLinks,
      copyright: `Copyright © ${new Date().getFullYear()} 猕猴桃`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['objectivec', 'json'],
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;
