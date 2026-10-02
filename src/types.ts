export type Member = { id: string; name: string; color: string };
export type Expense = { id: string; title: string; category: string; amountCents: number; payerId: string; participantIds: string[]; date: string; settled: boolean };
export type Chore = { id: string; title: string; area: string; assigneeId: string; due: string; completed: boolean };
export type Supply = { id: string; name: string; unit: string; quantity: number; minimum: number; updatedAt: string };
export type HouseRule = { id: string; text: string; category: string; acknowledgedBy: string[] };
export type HouseholdState = { name: string; isSample: boolean; month: string; members: Member[]; expenses: Expense[]; chores: Chore[]; supplies: Supply[]; rules: HouseRule[]; activity: { id: string; text: string; time: string; tone: 'accent' | 'muted' }[] };
