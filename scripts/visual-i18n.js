'use strict';

// Only the visual portfolio and its scoped projects are bilingual.
const projects = new Set(['rayban-tmall', 'ocean-engine', 'eleme-pacman', 'epo', 'zstar', 'dewu', 'visual-explorations', 'iphone17-pro', 'su7', 'mimo', 'meowbreak']);
hexo.extend.helper.register('visual_bilingual', function (page) {
  if (page.portfolio_mode !== 'visual') return false;
  if (!page.portfolio_project) return true;
  const match = (page.path || '').match(/projects\/([^/]+)/);
  return !!match && projects.has(match[1]);
});
