'use strict';

const portfolios = [
  { home: '/3d-character/', mode: 'character' },
  { home: '/3d/', mode: '3d' },
  { home: '/ai-native-builder/', mode: 'ai-product' },
  { home: '/visual-designer/', mode: 'visual' },
  { home: '/brand-creative/', mode: 'brand' }
];
const projects = ['mimo', 'meowbreak', 'zstar', 'dewu', 'iphone17-pro', 'su7'];

// Render the existing project templates within a dedicated portfolio path.
// Navigation remains correct without cookies, storage, referrers or client JS.
hexo.extend.generator.register('builder-projects', function (locals) {
  return portfolios.flatMap(function (portfolio) { return (portfolio.mode === 'character' ? ['zstar', 'one-piece'] : portfolio.mode === 'brand' ? ['meshy'].concat(projects) : portfolio.mode === 'visual' ? ['rayban-tmall', 'visual-explorations', 'eleme-pacman', 'epo', 'ocean-engine'].concat(projects) : projects).map(function (slug) {
    const source = locals.pages.toArray().find(page => page.path === 'projects/' + slug + '/index.html');
    if (!source) throw new Error('Missing portfolio project: ' + slug);
    const path = portfolio.home.slice(1) + 'projects/' + slug + '/index.html';
    const data = Object.assign({}, source.toObject ? source.toObject() : source, {
      path,
      portfolio_home: portfolio.home,
      portfolio_mode: portfolio.mode,
      portfolio_project: true
    });
    return { path, layout: source.layout, data };
  }); });
});

hexo.extend.filter.register('after_render:html', function (html) {
  const portfolio = portfolios.find(item => html.includes('data-portfolio-home="' + item.home + '"'));
  const home = portfolio && portfolio.home;
  return html.replace(/(<a\b[^>]*\bhref=")([^"]*)(")/g, function (match, before, href, after) {
    // Preview role selectors are intentionally outside the scoped navigation.
    if (before.includes('data-role-switch')) return match;
    if (!href.startsWith('/') || href.startsWith('//')) return match;
    const url = new URL(href, 'https://portfolio.invalid');
    if (!portfolio) {
      if (url.pathname !== '/' && url.pathname !== '/index.html') return match;
      return before + '/alljobs/' + url.search + url.hash + after;
    }
    const project = url.pathname.match(/^\/projects\/([^/]+)\/(?:index\.html)?$/);
    if (project && (projects.includes(project[1]) || (portfolio.mode === 'character' && project[1] === 'one-piece') || (portfolio.mode === 'brand' && project[1] === 'meshy') || (portfolio.mode === 'visual' && ['rayban-tmall', 'visual-explorations', 'eleme-pacman', 'epo', 'ocean-engine'].includes(project[1])))) {
      url.pathname = home + 'projects/' + project[1] + '/';
    } else if (['/', '/index.html', '/alljobs/', '/3d/', '/ai-product/'].includes(url.pathname)) {
      url.pathname = home;
    } else if (url.pathname === '/projects/' || url.pathname === '/about/') {
      url.hash = url.hash || (url.pathname === '/projects/' ? '#projects' : '#about');
      url.pathname = home;
    }
    return before + url.pathname + url.search + url.hash + after;
  });
});
