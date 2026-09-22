# 海贼王3D角色创作

最新调整：保留原站原文和图片顺序，删除每组末尾TO BE CONTINUED结束图，共42张内容图；取消来源链接、创作手记标题、年份/编号/图片角标。介绍与制作工具分栏，手机上下排列。合集顶部仅显示用户Logo（透明WebP约112KB），卡片默认英文、hover上移并显示中文，背景黑白转彩。

2026-09-22 根据用户指定的站酷公开作品整理，作者“锟曲”为用户本人。主页：https://www.zcool.com.cn/u/ZMTc0ODEwOA== 。原作链接与图片来源见 SOURCES.json。

## 页面组织

- 岗位首页 `/3d-character/`：幻星、海贼王3D角色创作两项。
- 合集 `/3d-character/projects/one-piece/`：四皇、雷利、女帝汉库克、索隆、艾斯五张卡片。
- 子页 `/3d-character/projects/one-piece/{slug}/`：作品说明、原文工具、成品与模型图集、点击放大、返回合集、下一位角色循环。
- 合集不显示 NEXT PROJECT；子页在五组作品中循环，保留返回合集。

## 素材整理

网页图片42张，四皇25、雷利6、汉库克5、索隆5、艾斯1，另有5张封面和1张Logo。保留原站分隔图，仅移除末尾结束图；未修改作品内容或原图文字。原始素材在 assets-source/14_海贼王3D角色创作/，网站WebP在 source/images/one-piece/。

来源为公开页面实际提供的图片（详情宽度最高1280px，封面按站酷原尺寸），没有放大冒充高清原件；WebP质量94，封面92。数据中的文件编号保留站酷图片顺序，便于追溯。

## 文案边界

- 明确个人同人创作，不写成官方委托。
- 雷利：原文明确ZBrush/C4D/Ornatrix/Redshift/Photoshop，并描述首次尝试Ornatrix。
- 汉库克：原文明确上述工具及Substance Painter。
- 索隆：原文明确ZBrush/C4D/Substance Painter/Redshift/Photoshop、业余直播创作及断续一个多月。
- 艾斯：原文明确Blender，没有制作视频；展示成品，不虚构制作过程。
- 四皇：原作者标签/回复明确ZBrush与C4D。根据实际图像区分角色成品与模型展示。
- 雷利、汉库克原站存在制作视频，本次以图片为主，按用户要求不显示原站跳转链接，未下载视频。

页面配置：source/_data/one_piece.json；模板：themes/portfolica/layout/one-piece.ejs；样式：themes/portfolica/source/css/one-piece.css。大图复用eleme-pacman.js及既有dialog样式。
