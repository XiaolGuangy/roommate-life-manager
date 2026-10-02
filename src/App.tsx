import { useMemo, useState } from 'react';
import { BarChart3, BookOpen, Boxes, CalendarDays, ChevronRight, CircleDollarSign, Home, RotateCcw, Users } from 'lucide-react';
import { useHousehold } from './hooks/useHousehold';
import OverviewView from './components/OverviewView';
import ExpensesView from './components/ExpensesView';
import ChoresView from './components/ChoresView';
import SuppliesView from './components/SuppliesView';
import HouseRulesView from './components/HouseRulesView';
import type { HouseholdState } from './types';

export type View = 'overview' | 'expenses' | 'chores' | 'supplies' | 'rules';
const nav: { id: View; label: string; icon: typeof Home }[] = [
  { id: 'overview', label: '总览', icon: Home }, { id: 'expenses', label: '费用 AA', icon: CircleDollarSign },
  { id: 'chores', label: '值日排班', icon: CalendarDays }, { id: 'supplies', label: '公共物品', icon: Boxes }, { id: 'rules', label: '室友公约', icon: BookOpen },
];

export default function App() {
  const { state, actions } = useHousehold();
  const [view, setView] = useState<View>('overview');
  const content = useMemo(() => {
    if (view === 'expenses') return <ExpensesView state={state} actions={actions} />;
    if (view === 'chores') return <ChoresView state={state} actions={actions} />;
    if (view === 'supplies') return <SuppliesView state={state} actions={actions} />;
    if (view === 'rules') return <HouseRulesView state={state} actions={actions} />;
    return <OverviewView state={state} onNavigate={setView} />;
  }, [actions, state, view]);
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">合</div><div><strong>合租生活管家</strong><span>HOUSEHOLD DESK</span></div></div>
      <div className="house-switch"><div className="house-icon"><Home size={16} /></div><div><span>当前房屋</span><strong>{state.name}</strong></div><ChevronRight size={16} /></div>
      <nav className="nav-list">{nav.map(item => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setView(item.id)}><Icon size={18} /><span>{item.label}</span>{view === item.id && <i />}</button>; })}</nav>
      <div className="sidebar-foot"><div className="members"><Users size={16} /><span>{state.members.length} 位室友</span></div><button className="reset-button" onClick={actions.reset}><RotateCcw size={14} />重置示例数据</button></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="mobile-brand"><div className="brand-mark">合</div><strong>合租生活管家</strong></div><div className="top-context"><span className="sample-pill">{state.isSample ? '示例房屋' : '已保存'}</span><span>{state.month}</span><span className="top-divider" /><span>{state.members.length} 人合住</span></div></header>
      <div className="mobile-nav">{nav.map(item => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? 'mobile-nav-item active' : 'mobile-nav-item'} onClick={() => setView(item.id)}><Icon size={16} />{item.label}</button>; })}</div>
      <div className="page-wrap">{content}</div>
    </main>
  </div>;
}

export type ViewProps = { state: HouseholdState; actions: ReturnType<typeof useHousehold>['actions'] };
