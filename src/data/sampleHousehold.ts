import type { HouseholdState } from '../types';

export const sampleHousehold: HouseholdState = {
  name: '和光里 3A', isSample: true, month: '2026年10月',
  members: [
    { id: 'lin', name: '林夏', color: '#e34f43' }, { id: 'zhou', name: '周野', color: '#2b6cb0' },
    { id: 'chen', name: '陈默', color: '#2f855a' }, { id: 'jiang', name: '江宁', color: '#b7791f' },
  ],
  expenses: [
    { id: 'e1', title: '十月房租', category: '房租', amountCents: 680000, payerId: 'lin', participantIds: ['lin', 'zhou', 'chen', 'jiang'], date: '10月01日', settled: false },
    { id: 'e2', title: '燃气费', category: '水电', amountCents: 12600, payerId: 'zhou', participantIds: ['lin', 'zhou', 'chen', 'jiang'], date: '10月04日', settled: true },
    { id: 'e3', title: '厨房纸与垃圾袋', category: '日用品', amountCents: 3580, payerId: 'chen', participantIds: ['lin', 'zhou', 'chen', 'jiang'], date: '10月07日', settled: false },
  ],
  chores: [
    { id: 'c1', title: '客厅与玄关', area: '公共区域', assigneeId: 'lin', due: '今天', completed: false },
    { id: 'c2', title: '厨房台面', area: '厨房', assigneeId: 'zhou', due: '周六', completed: false },
    { id: 'c3', title: '卫生间', area: '卫生间', assigneeId: 'chen', due: '周日', completed: true },
    { id: 'c4', title: '倒垃圾', area: '公共区域', assigneeId: 'jiang', due: '周一', completed: false },
  ],
  supplies: [
    { id: 's1', name: '抽纸', unit: '包', quantity: 2, minimum: 3, updatedAt: '2小时前' },
    { id: 's2', name: '洗衣液', unit: '瓶', quantity: 1, minimum: 1, updatedAt: '昨天' },
    { id: 's3', name: '垃圾袋', unit: '卷', quantity: 4, minimum: 2, updatedAt: '周一' },
    { id: 's4', name: '洗洁精', unit: '瓶', quantity: 1, minimum: 1, updatedAt: '周一' },
  ],
  rules: [
    { id: 'r1', text: '公共区域使用后恢复原状，垃圾满三分之二及时处理。', category: '公共区域', acknowledgedBy: ['lin', 'zhou', 'chen'] },
    { id: 'r2', text: '晚上 23:00 后降低音量，临时聚会提前在群里说明。', category: '作息', acknowledgedBy: ['lin', 'zhou'] },
    { id: 'r3', text: '公共物品低于最低库存时，发现的人负责加入采购清单。', category: '采购', acknowledgedBy: ['lin'] },
  ],
  activity: [
    { id: 'a1', text: '周野确认了燃气费', time: '今天 09:12', tone: 'muted' },
    { id: 'a2', text: '陈默补充了厨房纸与垃圾袋', time: '昨天 20:36', tone: 'accent' },
    { id: 'a3', text: '江宁完成了卫生间值日', time: '周二 18:10', tone: 'muted' },
  ],
};
