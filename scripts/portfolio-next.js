'use strict';

// Match the project cards in each portfolio home, in reading order.
const orders = {
  visual: ['rayban-tmall', 'novoland', 'eleme-pacman', 'epo', 'zstar', 'visual-explorations', 'iphone17-pro'],
  '3d': ['zstar', 'dewu'],
  'ai-product': ['mimo', 'meowbreak', 'zstar', 'dewu'],
  brand: ['meshy', 'mimo', 'meowbreak', 'zstar', 'dewu', 'iphone17-pro', 'su7'],
  all: ['iphone17-pro', 'su7', 'meowbreak', 'mimo', 'dewu', 'zstar']
};
const titles = {
  'rayban-tmall': '雷朋×天猫双十一主视觉', novoland: '九州缥缈录×视觉设计',
  'eleme-pacman': '饿了么×吃货卡吃豆人', epo: 'E宝设计',
  zstar: '哔哩哔哩 · 幻星项目', 'visual-explorations': '视觉设计探索',
  'iphone17-pro': 'iPhone 17 Pro', su7: '小米SU7',
  mimo: '嘟记豆背单词', meowbreak: '喵息桌面闹钟',
  dewu: '得物 3D 数字资产升级', meshy: '想象，有了形状。'
};

hexo.extend.helper.register('portfolio_next', function (page) {
  const match = (page.path || '').match(/(?:^|\/)projects\/([^/]+)/);
  const slug = page.project_slug || (match && match[1]);
  if (!slug) return null;
  const mode = page.portfolio_home ? page.portfolio_mode : 'all';
  const order = orders[mode] || orders.all;
  // A bookmarked project removed from the home returns to the first listed project.
  const next = order[(order.indexOf(slug) + 1) % order.length];
  return {
    href: (page.portfolio_home || '/') + 'projects/' + next + '/',
    title: mode === 'visual' && next === 'iphone17-pro' ? 'iPhone 17 Pro官网视觉练习' : titles[next]
  };
});
