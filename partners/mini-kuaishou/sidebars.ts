import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  miniGameSidebar: [
    'mini-game/kuaishou/_index',
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
      label: '快手小游戏',
      items: [
        'mini-game/kuaishou/frontend-guide',
        'mini-game/kuaishou/server-specifics',
      ],
    },
  ],
};

export default sidebars;
