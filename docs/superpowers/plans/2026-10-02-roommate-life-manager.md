# 合租生活管家 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 构建一个可公开部署的合租生活管家单页工作台，覆盖费用 AA、值日、公共物品和室友公约四项任务。

**Architecture:** 使用 Vite + React + TypeScript 构建静态前端。`useHousehold` 统一管理房屋状态并写入 `localStorage`，视图组件只通过明确的更新回调修改状态；`AppShell` 负责导航和布局，业务视图负责各自表单与列表。

**Tech Stack:** React 18, TypeScript, Vite, lucide-react, CSS modules-free global stylesheet.

**Spec:** `docs/superpowers/specs/2026-10-02-roommate-life-manager-design.md`

## Global Constraints

- 公开链接可直接访问，无需登录或后端服务。
- 示例数据必须明确标为“示例房屋”。
- 使用 Swiss 视觉方向：白色/浅灰表面、系统无衬线、珊瑚红强调色、1px 规则线。
- 所有写操作通过状态更新函数完成并立即持久化到 `localStorage`。
- 金额使用整数分值计算，展示时格式化为人民币金额。

## Review Focus

- 刷新后状态保持：新增费用、勾选值日后重新加载仍显示更新结果；由 `useHousehold` 的持久化验证覆盖。
- 空列表和零值：删除最后一条记录或库存为 0 时，界面仍显示可操作的空状态；由各业务视图的条件渲染覆盖。
- 金额分摊：多人参与和小数元金额按分值计算，汇总不出现浮点误差；由费用工具函数验证覆盖。
- 小屏布局：窄视口下导航可横向滚动，表单和卡片不造成页面横向溢出；由浏览器移动视口检查覆盖。
- 示例重置：点击重置后恢复初始示例房屋且清除用户改动；由状态 hook 验证覆盖。

### Task 1: Scaffold and state model

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/types.ts`, `src/data/sampleHousehold.ts`, `src/hooks/useHousehold.ts`, `src/lib/money.ts`
- Test: `src/lib/money.test.ts`

**Interfaces:**
- `HouseholdState`, `Expense`, `Chore`, `Supply`, `HouseRule` in `src/types.ts`
- `useHousehold(): { state, actions, isSample }` where actions cover add/update/remove/toggle and reset
- `splitExpense(amountCents: number, participantIds: string[]): Record<string, number>` in `src/lib/money.ts`

- [ ] Create Vite React TypeScript scaffold and install `lucide-react` plus a lightweight test runner only if needed.
- [ ] Define the state types and sample household data with four members, representative expenses, chores, supplies, and rules.
- [ ] Implement integer-cent splitting and the `useHousehold` localStorage hook with reset support.
- [ ] Run `npm run build` and a focused money test or equivalent node check.

### Task 2: Shell and visual system

**Files:**
- Create: `src/App.tsx`, `src/styles.css`
- Modify: `src/main.tsx`

**Interfaces:**
- `App` owns active view state and consumes `useHousehold` actions.
- `AppShell` layout exposes navigation labels and `children` content region.

- [ ] Build the fixed desktop rail, mobile tab navigation, house header, and view routing.
- [ ] Add the Swiss token system, grid rules, typography, responsive breakpoints, focus states, and status rail differentiator.
- [ ] Add reusable primitives for section headers, stat blocks, empty states, and action buttons using lucide icons.
- [ ] Verify desktop and mobile shells render without overflow in the dev server.

### Task 3: Overview and expense workflow

**Files:**
- Create: `src/components/OverviewView.tsx`, `src/components/ExpensesView.tsx`
- Modify: `src/App.tsx`, `src/styles.css`

**Interfaces:**
- Views receive `state` and `actions` from `useHousehold`.
- Expenses view supports add, delete, settle, and participant selection.

- [ ] Render overview totals, per-person balances, today’s chore, low-stock alerts, recent activity, and the red status rail.
- [ ] Implement expense form validation, expense list, AA summary, delete, and mark-settled actions.
- [ ] Verify a new expense changes total and balance values immediately.

### Task 4: Chores, supplies, and rules workflows

**Files:**
- Create: `src/components/ChoresView.tsx`, `src/components/SuppliesView.tsx`, `src/components/HouseRulesView.tsx`
- Modify: `src/App.tsx`, `src/styles.css`

**Interfaces:**
- Chores: create task, assign member, toggle completion.
- Supplies: create item, increment/decrement stock, mark purchased.
- Rules: create rule, toggle acknowledgement, delete rule.

- [ ] Implement each list’s form, empty state, row/card layout, and local updates.
- [ ] Add labels that communicate real state: due, completed, low stock, acknowledged.
- [ ] Verify each mutation updates its count and overview-derived alert.

### Task 5: Verification and deployment

**Files:**
- Modify: `package.json` scripts as needed
- Create: `README.md` with run/build/deploy notes

- [ ] Run a production build and inspect generated assets.
- [ ] Start the local server and browser-check first load, all navigation paths, mutations, refresh persistence, and mobile viewport.
- [ ] Deploy the static build to a public long-lived URL, confirm anonymous access from a fresh browser context, and record the URL without changing it in later iterations.
