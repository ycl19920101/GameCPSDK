import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  miniGameSidebar: [
    'mini-game/douyin/_index',
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
      label: '抖音小游戏',
      items: [
        'mini-game/douyin/frontend-guide',
        'mini-game/douyin/server-specifics',
      ],
    },
  ],
};

export default sidebars;
