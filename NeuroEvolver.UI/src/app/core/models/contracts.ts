// Чернова на договорите със SignalR. Променя се само след съгласуване с бекенда.
export type PartKind = 'bone' | 'muscle' | 'eye' | 'ear' | 'tooth' | 'skin';
export type Role = 'user' | 'admin' | 'dev';
export interface GenerationStats { runId: string; generation: number; bestFitness: number; meanFitness: number; speciesCount: number; }
export interface Diagnostic { runId: string; severity: 'info' | 'warning' | 'blocking'; message: string; suggestion?: string; }
export interface GoalPlan { goalText: string; subtasks: { id: string; label: string; status: 'pending' | 'active' | 'done' }[]; }
export interface EnvironmentSummary { id: string; name: string; description: string; rating: number; runs: number; status: 'pending' | 'published' | 'rejected'; }
