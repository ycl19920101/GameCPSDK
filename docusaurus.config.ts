import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '猕猴桃SDK文档中心',
  tagline: 'APP SDK · 小游戏SDK 对接文档',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ycl19920101.github.io',
  baseUrl: '/GameCPSDK/',

  onBrokenLinks: 'throw',

  organizationName: 'ycl19920101',
  projectName: 'GameCPSDK',
  trailingSlash: false,

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
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
      title: '猕猴桃SDK文档',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'appSdkSidebar',
          position: 'left',
          label: 'APP SDK',
        },
        {
          type: 'docSidebar',
          sidebarId: 'miniGameSidebar',
          position: 'left',
          label: '小游戏 SDK',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: 'APP SDK',
              to: '/docs/app-sdk/overview',
            },
            {
              label: '小游戏 SDK',
              to: '/docs/mini-game/overview',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} 猕猴桃`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['objectivec', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
