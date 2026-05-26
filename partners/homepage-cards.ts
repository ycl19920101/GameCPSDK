export interface SdkCardProps {
  title: string;
  description: string;
  to: string;
  tags: string[];
}

export const homepageCardsMap: Record<string, SdkCardProps[]> = {
  full: [
    {
      title: 'APP SDK 海外版 (iOS)',
      description:
        '海外iOS应用SDK对接，支持游客登录、Apple登录、Facebook登录、内购支付、数据上报等功能',
      to: '/docs/app-sdk/overseas/quick-start',
      tags: ['iOS', '海外版', 'Facebook'],
    },
    {
      title: 'APP SDK 国内版 (iOS)',
      description:
        '国内iOS应用SDK对接，支持微信登录、用户中心、关键行为上报、引力引擎等功能',
      to: '/docs/app-sdk/domestic/integration-guide',
      tags: ['iOS', '国内版', '微信'],
    },
    {
      title: '微信小游戏 SDK',
      description:
        '微信小游戏平台SDK对接，包含前端JS接口、服务端对接、加签验证、数据上报',
      to: '/docs/mini-game/wechat/frontend-guide',
      tags: ['JavaScript', '微信'],
    },
    {
      title: '抖音小游戏 SDK',
      description:
        '抖音小游戏平台SDK对接，包含前端JS接口、服务端对接、虚拟支付、数据上报',
      to: '/docs/mini-game/douyin/frontend-guide',
      tags: ['JavaScript', '抖音'],
    },
    {
      title: '快手小游戏 SDK',
      description:
        '快手小游戏平台SDK对接，包含前端JS接口、服务端对接、支付、视频广告、数据上报',
      to: '/docs/mini-game/kuaishou/frontend-guide',
      tags: ['JavaScript', '快手'],
    },
  ],

  'app-overseas': [
    {
      title: 'APP SDK 海外版 (iOS)',
      description:
        '海外iOS应用SDK对接，支持游客登录、Apple登录、Facebook登录、内购支付、数据上报等功能',
      to: '/docs/app-sdk/overseas/quick-start',
      tags: ['iOS', '海外版', 'Facebook'],
    },
  ],

  'app-domestic': [
    {
      title: 'APP SDK 国内版 (iOS)',
      description:
        '国内iOS应用SDK对接，支持微信登录、用户中心、关键行为上报、引力引擎等功能',
      to: '/docs/app-sdk/domestic/integration-guide',
      tags: ['iOS', '国内版', '微信'],
    },
  ],

  'mini-wechat': [
    {
      title: '微信小游戏 SDK',
      description:
        '微信小游戏平台SDK对接，包含前端JS接口、服务端对接、加签验证、数据上报',
      to: '/docs/mini-game/wechat/frontend-guide',
      tags: ['JavaScript', '微信'],
    },
  ],

  'mini-douyin': [
    {
      title: '抖音小游戏 SDK',
      description:
        '抖音小游戏平台SDK对接，包含前端JS接口、服务端对接、虚拟支付、数据上报',
      to: '/docs/mini-game/douyin/frontend-guide',
      tags: ['JavaScript', '抖音'],
    },
  ],

  'mini-kuaishou': [
    {
      title: '快手小游戏 SDK',
      description:
        '快手小游戏平台SDK对接，包含前端JS接口、服务端对接、支付、视频广告、数据上报',
      to: '/docs/mini-game/kuaishou/frontend-guide',
      tags: ['JavaScript', '快手'],
    },
  ],
};
