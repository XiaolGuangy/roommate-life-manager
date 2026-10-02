import { useCallback, useEffect, useMemo, useState } from 'react';
import { sampleHousehold } from '../data/sampleHousehold';
import type { Chore, Expense, HouseholdState, HouseRule, Supply } from '../types';

const STORAGE_KEY = 'roommate-life-manager-household';
const cloneSample = () => JSON.parse(JSON.stringify(sampleHousehold)) as HouseholdState;

export function useHousehold() {
  const [state, setState] = useState<HouseholdState>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...cloneSample(), ...JSON.parse(raw), isSample: false } : cloneSample();
  });
  useEffect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)), [state]);
  const update = useCallback((fn: (current: HouseholdState) => HouseholdState) => setState(current => fn(current)), []);
  const actions = useMemo(() => ({
    addExpense: (expense: Expense) => update(s => ({ ...s, isSample: false, expenses: [expense, ...s.expenses], activity: [{ id: crypto.randomUUID(), text: `新增了${expense.title}`, time: '刚刚', tone: 'accent' }, ...s.activity] })),
    removeExpense: (id: string) => update(s => ({ ...s, expenses: s.expenses.filter(item => item.id !== id), isSample: false })),
    toggleExpense: (id: string) => update(s => ({ ...s, isSample: false, expenses: s.expenses.map(item => item.id === id ? { ...item, settled: !item.settled } : item) })),
    addChore: (chore: Chore) => update(s => ({ ...s, chores: [...s.chores, chore], isSample: false })),
    toggleChore: (id: string) => update(s => ({ ...s, chores: s.chores.map(item => item.id === id ? { ...item, completed: !item.completed } : item), isSample: false })),
    assignChore: (id: string, assigneeId: string) => update(s => ({ ...s, chores: s.chores.map(item => item.id === id ? { ...item, assigneeId } : item), isSample: false })),
    addSupply: (supply: Supply) => update(s => ({ ...s, supplies: [...s.supplies, supply], isSample: false })),
    changeSupply: (id: string, delta: number) => update(s => ({ ...s, supplies: s.supplies.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta), updatedAt: '刚刚' } : item), isSample: false })),
    addRule: (rule: HouseRule) => update(s => ({ ...s, rules: [...s.rules, rule], isSample: false })),
    toggleRule: (id: string, memberId: string) => update(s => ({ ...s, rules: s.rules.map(item => item.id === id ? { ...item, acknowledgedBy: item.acknowledgedBy.includes(memberId) ? item.acknowledgedBy.filter(id => id !== memberId) : [...item.acknowledgedBy, memberId] } : item), isSample: false })),
    removeRule: (id: string) => update(s => ({ ...s, rules: s.rules.filter(item => item.id !== id), isSample: false })),
    reset: () => setState(cloneSample()),
  }), [update]);
  return { state, actions };
}
