/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/content/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'React Navigation中文网' /* title for your website */,
  tagline: '路由定义了URI、操作和导航状态之间的关系，以及移动应用，Web应用和服务端渲染之间共享导航的逻辑',
  url: 'https://reactnavigation.org.cn' /* your website url */,
  baseUrl: '/content/' /* base url for your project */,
  projectName: 'react-navigation',
  algolia: {
    apiKey: "66f2a36406a99cf1312af16ba1ff44f4",
    indexName: "reactnavigation_cn"
  },
  headerLinks: [
    { search: true },
    {doc: 'Guide-Intro', label: '文档'},
    {blog: true, label: '博客'},
    {href: 'https://expo.io/@react-navigation/NavigationPlayground', label: '官方栗子', external: true},
    {href: 'https://github.com/react-navigation/react-navigation', label: 'GitHub', external: true},
  ],
  users,
  /* path to images for header/footer */
  headerIcon: 'img/react_white.png',
  footerIcon: 'img/react_white.png',
  favicon: 'img/favicon.ico',
  /* colors for website */
  colors: {
    primaryColor: '#6b52ae',
    secondaryColor: '#eee',
  },
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'None',
  // organizationName: 'deltice', // or set an env variable ORGANIZATION_NAME
  // projectName: 'test-site', // or set an env variable PROJECT_NAME
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'github-gist',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/react-navigation/react-navigation',
};

module.exports = siteConfig;
