# 当前进度

更新：2026-09-08

## 当前目标

发布已完成的网站改动到 GitHub Pages，等待线上验证。

## 当前实现

- 面试官入口 `/ai-native-builder/` 默认隐藏岗位标签；自用 `?preview=1` 显示标签。旧 `/ai-product/` 自动跳转。
- 六个项目复用原模板生成 `/ai-native-builder/projects/{slug}/`，导航、返回作品集、下个项目均保持岗位路径；刷新与分享不依赖浏览器存储。其他公开方向仍可直接访问。
- 首屏仅嘟记豆、喵息、幻星，5.5 秒同步轮播；大尺寸 16:9 彩色图片、外侧箭头、底部圆点；左侧大描边项目标签、主副标题与查看项目/更多作品；全宽淡网格和随项目变化的渐变。
- 岗位资料卡使用 619×619、约 25 KB 的 portrait-real.webp；原 PNG 归档 assets-source/portraits。身份 Ai Native Builder，经历数字、学校专业、能力标签居中。
- 经历顶部新增 2025—2026 个人产品实践；下方新增六项核心能力与三类专业技能，支持与经历协调的悬停反馈。
- 项目顺序：AI独立开发（嘟记豆、喵息）、AI流程提效（幻星、得物）、网页设计（iPhone 17 Pro、小米SU7）。移除重复介绍和分隔线。
- 联系区电话/邮箱左侧高亮、独立复制按钮、已复制反馈，保留拨号与邮件链接。
- HMI 方向、SU7 智能座舱概念项目、Tesla 驾驶可视化项目及其专用文件已移除；独立 SU7 产品体验项目保留。
- 本次发布同时包含已完成的 SU7、iPhone、喵息、嘟记豆、得物、幻星页面与素材优化；以当前源文件为准。

## 相关文件

- `themes/portfolica/layout/index.ejs`、`partial/builder-hero.ejs`、`partial/builder-capabilities.ejs`。
- `themes/portfolica/source/css/builder-hero.css`、`style.css`、`js/builder-hero.js`、`main.js`。
- `scripts/portfolio-context.js`、`source/ai-native-builder/index.md`、`source/ai-product/index.md`、`js/portfolio-preview.js`及共用导航模板。

## 验证与发布

- 干净构建通过；七个岗位页面静态链接/素材检查通过，HMI 输出无残留。
- 已浏览器验证岗位入口、往返路径、预览开关、刷新、旧地址跳转、轮播、联系复制；多次桌面视觉检查通过。近期小幅排版调整未逐项重做手机视觉验证。
- GitHub Pages 由推送 main 触发 Actions。当前准备提交并推送；线上结果待核实。
- 本地旧 4000 预览未加载新增 generator；4001 为已重启新版预览。
- `docs/` 未提交参考资料与 `assets-source/` 原始素材留在本地，不纳入本次发布。