// .vuepress/config.js
module.exports = {
  // 网站的标题
  title: "Clean Code 中文",
  // 上下文根
  base: "/doc-cleancode/",
  themeConfig: {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "gdut-yy/Clean-Code-zh",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "Github",
    // 以下为可选的编辑链接选项
    // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: "gdut-yy/Clean-Code-zh",
    // 假如文档放在一个特定的分支下：
    docsBranch: "master/docs",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "帮助我们改善此页面！",
    // 最后更新时间
    lastUpdated: "Last Updated",
    // 最大深度
    sidebarDepth: 2,
    // 导航栏
    nav: [],
    // 侧边栏
    sidebar: {
      "/": [
        "",
        "ch1.md",
        "ch2.md",
        "ch3.md",
        "ch4.md",
        "ch5.md",
        "ch6.md",
        "ch7.md",
        "ch8.md",
        "ch9.md",
        "ch10.md",
        "ch11.md",
        "ch12.md",
        "ch13.md",
        "ch14.md",
        "ch15.md",
        "ch16.md",
        "ch17.md",
        "apA.md"
      ]
    }
  }
};
