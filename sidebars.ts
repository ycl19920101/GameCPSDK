import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  appSdkSidebar: [
    'app-sdk/overview',
    {
      type: 'category',
      label: '海外版',
      items: [
        'app-sdk/overseas/quick-start',
        'app-sdk/overseas/integration-guide',
        'app-sdk/overseas/faq',
      ],
    },
    {
      type: 'category',
      label: '国内版',
      items: [
        'app-sdk/domestic/integration-guide',
        'app-sdk/domestic/faq',
      ],
    },
  ],

  miniGameSidebar: [
    'mini-game/overview',
    {
      type: 'category',
      label: '通用文档',
      items: [
        'mini-game/common/server-integration',
        'mini-game/common/signing',
        'mini-game/common/data-reporting',
      ],
    },
    {
      type: 'category',
      label: '微信小游戏',
      items: [
        'mini-game/wechat/frontend-guide',
        'mini-game/wechat/server-specifics',
      ],
    },
    {
      type: 'category',
      label: '抖音小游戏',
      items: [
        'mini-game/douyin/frontend-guide',
        'mini-game/douyin/server-specifics',
      ],
    },
    {
      type: 'category',
      label: '快手小游戏',
      items: [
        'mini-game/kuaishou/frontend-guide',
        'mini-game/kuaishou/server-specifics',
      ],
    },
  ],
};

export default sidebars;
