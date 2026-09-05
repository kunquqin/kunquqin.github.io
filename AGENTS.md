# 协作约定

- 使用简洁中文。用户要求修改时直接修改项目文件，复用现有样式、变量和逻辑，仅修改需求涉及部分。
- 定向搜索和读取相关代码；避免无关重构、重复定义、反复追加覆盖样式和大段日志。
- 过程仅简报必要进展；完成后简报改动、验证结果和未解决项，不重复贴代码。用户需要复制时仅提供差异代码。
- 保留必要验证；简单改动验证通过后不重复检查。视觉结果未实际检查时如实说明，构建通过不等于视觉验证通过。
- 开始工作前读取 `PROGRESS.md`。阶段完成或交接前更新进度，只保留当前状态、重要决策、相关文件、验证结果和待办，不累积聊天记录。
- 以当前文件为准，不覆盖用户已有修改。普通修改不自动提交、推送或部署。

# 项目定位

- Hexo 网站，主题 `themes/portfolica/`；在本目录运行 `npm.cmd run build`。
- iPhone 页面：`themes/portfolica/layout/iphone-render.ejs`。
- 主样式：`themes/portfolica/source/css/style.css`；iPhone 排版补充：`themes/portfolica/source/css/iphone-typography.css`。
- 修改源文件，通过构建生成 `public/`，不要仅修改生成文件。
