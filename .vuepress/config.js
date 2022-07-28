module.exports = {
  "title": "sugarblog",
  "description": "",
  "dest": "public",
  "base": '/sugarblog/',
  "head": [
    // 移动端优化
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      // {
      //   "text": "Docs",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "vuepress-reco",
      //       "link": "/docs/theme-reco/"
      //     }
      //   ]
      // },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/sugarboo",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "sidebar": {
      // "/docs/theme-reco/": [
      //   "",
      //   "theme",
      //   "plugin",
      //   "api"
      // ]
    },
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    // "friendLink": [
    //   {
    //     "title": "vuepress-theme-reco",
    //     "desc": "A simple and beautiful vuepress Blog & Doc theme.",
    //     "avatar": "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //     "link": "https://vuepress-theme-reco.recoluan.com"
    //   }
    // ],
    "logo": "/avatar.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "Last Updated",
    "author": "sugarboo",
    "authorAvatar": "/avatar.png",
    // "record": "xxxx",
    // "startYear": "2017",

    // vssue评论功能配置
    vssueConfig: {
      platform: 'github',
      owner: 'sugarboo',
      repo: 'sugarblog',
      clientId: 'f6ef76ab0d10b5bd8d89',
      clientSecret: '25d0547b014e46c62566bbfc71f6ab45782387a5',
    }
  },
  "markdown": {
    "lineNumbers": true
  },
  "plugins": {
    '@vuepress-reco/vuepress-plugin-kan-ban-niang': {
      'theme': ['whiteCat'],
      'clean': true
    }
  }
}