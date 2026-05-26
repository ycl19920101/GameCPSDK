import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  miniGameSidebar: [
    'mini-game/wechat/_index',
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
  ],
};

export default sidebars;
