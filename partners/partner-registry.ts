interface PartnerBuildConfig {
  title: string;
  tagline: string;
  baseUrl: string;
  navbarTitle: string;
  sidebarPath: string;
  navbarItems: {
    type: string;
    sidebarId: string;
    position: string;
    label: string;
  }[];
  footerLinks: {
    title: string;
    items: {
      label: string;
      to: string;
    }[];
  }[];
  exclude: string[];
  partnerId: string;
}

export const partnerConfig: Record<string, PartnerBuildConfig> = {
  full: {
    title: '猕猴桃SDK文档中心',
    tagline: 'APP SDK · 小游戏SDK 对接文档',
    baseUrl: '/GameCPSDK/',
    navbarTitle: '猕猴桃SDK文档',
    sidebarPath: './sidebars.ts',
    navbarItems: [
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
    footerLinks: [
      {
        title: '文档',
        items: [
          {label: 'APP SDK', to: '/docs/app-sdk/overview'},
          {label: '小游戏 SDK', to: '/docs/mini-game/overview'},
        ],
      },
    ],
    exclude: [],
    partnerId: 'full',
  },

  appOverseas: {
    title: '猕猴桃 APP SDK (海外版) 文档',
    tagline: '海外 iOS 应用 SDK 对接文档',
    baseUrl: '/GameCPSDK/app-overseas/',
    navbarTitle: 'APP SDK 海外版',
    sidebarPath: './partners/app-overseas/sidebars.ts',
    navbarItems: [
      {
        type: 'docSidebar',
        sidebarId: 'appSdkSidebar',
        position: 'left',
        label: 'APP SDK',
      },
    ],
    footerLinks: [
      {
        title: '文档',
        items: [{label: 'APP SDK 海外版', to: '/docs/app-sdk/overseas/_index'}],
      },
    ],
    exclude: ['app-sdk/domestic/**', 'mini-game/**', 'app-sdk/overview.md'],
    partnerId: 'app-overseas',
  },

  appDomestic: {
    title: '猕猴桃 APP SDK (国内版) 文档',
    tagline: '国内 iOS 应用 SDK 对接文档',
    baseUrl: '/GameCPSDK/app-domestic/',
    navbarTitle: 'APP SDK 国内版',
    sidebarPath: './partners/app-domestic/sidebars.ts',
    navbarItems: [
      {
        type: 'docSidebar',
        sidebarId: 'appSdkSidebar',
        position: 'left',
        label: 'APP SDK',
      },
    ],
    footerLinks: [
      {
        title: '文档',
        items: [{label: 'APP SDK 国内版', to: '/docs/app-sdk/domestic/_index'}],
      },
    ],
    exclude: ['app-sdk/overseas/**', 'mini-game/**', 'app-sdk/overview.md'],
    partnerId: 'app-domestic',
  },

  miniWechat: {
    title: '猕猴桃 微信小游戏 SDK 文档',
    tagline: '微信小游戏平台 SDK 对接文档',
    baseUrl: '/GameCPSDK/mini-wechat/',
    navbarTitle: '微信小游戏 SDK',
    sidebarPath: './partners/mini-wechat/sidebars.ts',
    navbarItems: [
      {
        type: 'docSidebar',
        sidebarId: 'miniGameSidebar',
        position: 'left',
        label: '小游戏 SDK',
      },
    ],
    footerLinks: [
      {
        title: '文档',
        items: [
          {label: '微信小游戏 SDK', to: '/docs/mini-game/wechat/_index'},
        ],
      },
    ],
    exclude: [
      'app-sdk/**',
      'mini-game/douyin/**',
      'mini-game/kuaishou/**',
      'mini-game/overview.md',
    ],
    partnerId: 'mini-wechat',
  },

  miniDouyin: {
    title: '猕猴桃 抖音小游戏 SDK 文档',
    tagline: '抖音小游戏平台 SDK 对接文档',
    baseUrl: '/GameCPSDK/mini-douyin/',
    navbarTitle: '抖音小游戏 SDK',
    sidebarPath: './partners/mini-douyin/sidebars.ts',
    navbarItems: [
      {
        type: 'docSidebar',
        sidebarId: 'miniGameSidebar',
        position: 'left',
        label: '小游戏 SDK',
      },
    ],
    footerLinks: [
      {
        title: '文档',
        items: [
          {label: '抖音小游戏 SDK', to: '/docs/mini-game/douyin/_index'},
        ],
      },
    ],
    exclude: [
      'app-sdk/**',
      'mini-game/wechat/**',
      'mini-game/kuaishou/**',
      'mini-game/overview.md',
    ],
    partnerId: 'mini-douyin',
  },

  miniKuaishou: {
    title: '猕猴桃 快手小游戏 SDK 文档',
    tagline: '快手小游戏平台 SDK 对接文档',
    baseUrl: '/GameCPSDK/mini-kuaishou/',
    navbarTitle: '快手小游戏 SDK',
    sidebarPath: './partners/mini-kuaishou/sidebars.ts',
    navbarItems: [
      {
        type: 'docSidebar',
        sidebarId: 'miniGameSidebar',
        position: 'left',
        label: '小游戏 SDK',
      },
    ],
    footerLinks: [
      {
        title: '文档',
        items: [
          {label: '快手小游戏 SDK', to: '/docs/mini-game/kuaishou/_index'},
        ],
      },
    ],
    exclude: [
      'app-sdk/**',
      'mini-game/wechat/**',
      'mini-game/douyin/**',
      'mini-game/overview.md',
    ],
    partnerId: 'mini-kuaishou',
  },
};
