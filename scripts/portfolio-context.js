'use strict';

const home = '/ai-native-builder/';
const projects = ['mimo', 'meowbreak', 'zstar', 'dewu', 'iphone17-pro', 'su7'];

// Render the existing project templates within a dedicated portfolio path.
// Navigation remains correct without cookies, storage, referrers or client JS.
hexo.extend.generator.register('builder-projects', function (locals) {
  return projects.map(function (slug) {
    const source = locals.pages.toArray().find(page => page.path === 'projects/' + slug + '/index.html');
    if (!source) throw new Error('Missing portfolio project: ' + slug);
    const path = 'ai-native-builder/projects/' + slug + '/index.html';
    const data = Object.assign({}, source.toObject ? source.toObject() : source, {
      path,
      portfolio_home: home,
      portfolio_mode: 'ai-product',
      portfolio_project: true
    });
    return { path, layout: source.layout, data };
  });
});

hexo.extend.filter.register('after_render:html', function (html) {
  if (!html.includes('data-portfolio-home="' + home + '"')) return html;
  return html.replace(/(<a\b[^>]*\bhref=")([^"]*)(")/g, function (match, before, href, after) {
    // Preview role selectors are intentionally outside the scoped navigation.
    if (before.includes('data-role-switch')) return match;
    if (!href.startsWith('/') || href.startsWith('//')) return match;
    const url = new URL(href, 'https://portfolio.invalid');
    const project = url.pathname.match(/^\/projects\/([^/]+)\/(?:index\.html)?$/);
    if (project && projects.includes(project[1])) {
      url.pathname = home + 'projects/' + project[1] + '/';
    } else if (['/', '/index.html', '/3d/', '/ai-product/'].includes(url.pathname)) {
      url.pathname = home;
    } else if (url.pathname === '/projects/' || url.pathname === '/about/') {
      url.hash = url.hash || (url.pathname === '/projects/' ? '#projects' : '#about');
      url.pathname = home;
    }
    return before + url.pathname + url.search + url.hash + after;
  });
});
