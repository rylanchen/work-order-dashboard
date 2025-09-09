# 工单管理与图表展示页面
##在线预览
https://work-order-dashboard.vercel.app/login

技术栈
> React + Vite + TypeScript + TailwindCSS + Ant Design + ECharts

## 本地运行
```bash
pnpm i   # 或 npm i / yarn
pnpm dev # or npm run dev
```
用户名为 `admin` 则拥有管理员权限（可删除），其他用户名为普通用户。删除表格中的一行会同步更新右侧柱状图。

## 技术点
- **权限模拟**：基于简单的 `AuthContext` 判断角色，不做持久化。
- **表格 + 图表联动**：删除后更新 `rows` 状态，通过 `useMemo` 聚合到图表数据。
- **UI**：Ant Design 表格、按钮；**样式**：Tailwind 实现布局与留白；
- **图表**：`echarts-for-react` 封装，柱状图展示各项目累计工时。

## 说明文档
### 使用了哪些 AI 工具？在哪些模块？
- 与项目脚手架说明由 ‘ChatGPT’ 协助
- README 撰写与代码注释由 ‘ChatGPT’ 先产出一个有骨架的草稿，再填充具体内容

### 哪些代码由 AI 生成？你做了哪些修改？
1.项目脚手架 & 配置样板

  Vite + TS + Tailwind + AntD + ECharts 的最小可用模板。

原因：步骤繁琐但标准化，AI 省时省错。

2.UI 骨架/列定义初稿

  AntD Table 列配置、Form 骨架、布局（Tailwind 栅格）。

原因：样板代码多、语法固定；你再按业务语义做细化。

3.ECharts 的 option 初版

  轴、标签、grid 留白、tooltip 等基础配置。

原因：配置项多、记忆成本高；AI 先出一个再微调。

4.文案/README/提交说明

  说明书、Demo 讲解、面试自述草稿。

原因：非核心逻辑，可快速生成并迭代。

5.Mock 数据扩充
  需要更多样例场景时（极端值、长名称、多项目）。

### 哪一部分最难或最满意？
难点在于：表格有删除权限的控制，而图表展示的是按项目累计的工时，两者的数据口径不一样。要解决的问题是——删除表格某一行之后，图表的数据要自动同步变化。
我比较满意的是，组件保持了低耦合。HoursBarChart 只认聚合数据，不关心原始工单；TaskTable 只根据 canDelete 判断要不要渲染“Delete”，不用知道角色细节。这让整体逻辑既清晰又方便扩展。

## 目录结构
```
work-order-dashboard/
  ├─ src/
  │  ├─ components/
  │  │  ├─ HoursBarChart.tsx
  │  │  └─ TaskTable.tsx
  │  ├─ pages/
  │  │  ├─ Dashboard.tsx
  │  │  └─ Login.tsx
  │  ├─ context.AuthContext.tsx
  │  ├─ data.ts
  │  ├─ types.ts
  │  ├─ App.tsx
  │  ├─ main.tsx
  │  └─ index.css
  ├─ index.html
  ├─ package.json
  ├─ postcss.config.js
  ├─ tailwind.config.js
  ├─ tsconfig.json
  └─ vite.config.ts
```

## 我对 AI 协作开发的理解
1. AI 的优势：快速生成和降低门槛

样板/重复性工作：如脚手架搭建、依赖配置、UI 组件初稿、图表配置（ECharts option）、文档撰写。
这些工作规则清晰、场景通用，AI 可以一次性生成，极大减少时间成本。

多样化思维：AI 可以快速给出多个实现思路（比如表格和图表的联动写法），便于开发者选择最合适的方案。

2. 开发者的责任：业务逻辑与可维护性

核心逻辑必须自己写：业务规则、权限控制、数据聚合、错误处理，这是保证项目正确性和可维护性的关键。

架构与分层：AI 可以生成代码片段，但模块拆分、职责边界（如本项目里的 TaskTable / HoursBarChart 解耦）需要开发者根据业务来设计。

质量把关：AI 代码可能有 bug、冗余或语义不准确，开发者必须具备审查与改造的能力。

3. 协作方式：人机分工

AI 做“工程助手”：生成可运行的样板、写文档、产出多种候选方案。

人类开发者做“产品负责人”：决定最终的数据结构、逻辑规则、代码规范，处理复杂的边界条件。

迭代模式：让 AI 先出初稿，再由开发者修改、优化、测试。这样既快又有质量保障。

总结

AI 协作开发不是“替代”，而是“放大”：

放大我的效率：我不用在样板代码上浪费时间。

放大我的思考：AI 给出多种可能，我能快速比较和选择。

所以，我认为最理想的模式是：AI 负责生成 → 我负责判断和裁剪 → 结果共同完成。这样既能保证交付速度，又能保证代码质量。
