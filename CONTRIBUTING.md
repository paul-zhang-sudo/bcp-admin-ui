# 贡献指南

感谢你对 BCP Admin UI 项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 报告 Bug
- 提交功能建议
- 提交代码修复
- 改进文档
- 分享使用经验

## 行为准则

请在参与项目时保持友善和尊重。我们致力于为所有人提供一个开放、友好的环境。

## 如何贡献

### 报告 Bug

如果你发现了 Bug，请通过 [GitHub Issues](https://github.com/paul-zhang-sudo/bcp-admin-ui/issues) 提交，并包含以下信息：

1. **Bug 描述**：清晰简洁地描述问题
2. **复现步骤**：详细的复现步骤
3. **期望行为**：你期望发生什么
4. **实际行为**：实际发生了什么
5. **环境信息**：
   - 操作系统及版本
   - 浏览器及版本
   - Node.js 版本
6. **截图**：如果适用，请添加截图

### 提交功能建议

我们欢迎新功能的建议！请通过 [GitHub Issues](https://github.com/paul-zhang-sudo/bcp-admin-ui/issues) 提交，并：

1. 使用清晰的标题描述功能
2. 详细说明功能的使用场景
3. 描述期望的行为
4. 如果可能，提供设计草图或参考

### 提交代码

#### 1. Fork 仓库

点击页面右上角的 Fork 按钮，将仓库 Fork 到你的账户下。

#### 2. 克隆仓库

```bash
git clone https://github.com/你的用户名/bcp-admin-ui.git
cd bcp-admin-ui
```

#### 3. 创建分支

```bash
# 从 master 分支创建新分支
git checkout -b feature/你的功能名称

# 或者修复 Bug
git checkout -b fix/bug描述
```

分支命名规范：
- `feature/xxx` - 新功能
- `fix/xxx` - Bug 修复
- `docs/xxx` - 文档更新
- `refactor/xxx` - 代码重构
- `style/xxx` - 样式调整
- `test/xxx` - 测试相关

#### 4. 安装依赖

```bash
npm install
```

#### 5. 开发

```bash
# 启动开发服务器
npm run dev
```

#### 6. 代码规范

在提交前，请确保：

```bash
# 运行代码检查
npm run lint

# 运行测试
npm run test:unit
```

#### 7. 提交代码

提交信息请遵循以下格式：

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Type 类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修复 Bug）
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

**示例：**

```bash
git commit -m "feat(user): 添加用户批量导入功能

- 支持 Excel 文件导入
- 添加导入进度显示
- 添加导入结果反馈

Closes #123"
```

#### 8. 推送分支

```bash
git push origin feature/你的功能名称
```

#### 9. 创建 Pull Request

1. 访问你 Fork 的仓库
2. 点击 "Compare & pull request" 按钮
3. 填写 PR 描述，说明你的更改
4. 提交 PR

**PR 描述模板：**

```markdown
## 概述
简要描述这个 PR 做了什么

## 改动类型
- [ ] Bug 修复
- [ ] 新功能
- [ ] 文档更新
- [ ] 代码重构
- [ ] 其他

## 改动内容
- 改动点 1
- 改动点 2

## 测试
描述你如何测试这些更改

## 截图（如适用）
添加截图帮助解释你的更改

## 关联 Issue
Closes #issue编号
```

## 开发指南

### 项目结构

```
src/
├── api/            # API 接口定义
├── assets/         # 静态资源
├── components/     # 公共组件
├── icons/          # SVG 图标
├── layout/         # 布局组件
├── router/         # 路由配置
├── store/          # Vuex 状态管理
├── styles/         # 全局样式
├── utils/          # 工具函数
└── views/          # 页面视图
```

### 代码风格

- 使用 ESLint 进行代码检查
- 使用 2 空格缩进
- 组件名使用 PascalCase
- 文件名使用 kebab-case 或 camelCase

### 组件开发规范

```vue
<template>
  <!-- 模板内容 -->
</template>

<script>
export default {
  name: 'ComponentName',
  props: {
    // props 定义
  },
  data() {
    return {
      // 数据定义
    }
  },
  computed: {
    // 计算属性
  },
  methods: {
    // 方法定义
  }
}
</script>

<style lang="scss" scoped>
/* 样式定义 */
</style>
```

## 审核流程

1. 提交 PR 后，维护者会尽快审核
2. 可能会要求修改或提供更多信息
3. 审核通过后，PR 将被合并到 master 分支
4. 你的贡献将出现在下一个版本中

## 获取帮助

如果你有任何问题，可以：

- 在 [GitHub Issues](https://github.com/paul-zhang-sudo/bcp-admin-ui/issues) 中提问
- 查阅项目文档

再次感谢你的贡献！
