export type Priority = 'low priority' | 'medium priority' | 'high priority';
export type Status = 'completed' | 'in progress';

export interface Ticket {
  id: string;
  title: string;
  status: Status;
  storyPoints: number;
  aiScore?: number;
  tags?: string[];
  priority?: Priority;
  description?: string;
}

export interface QuickStats {
  completed: number;
  storyPoints: number;
  inProgress: number;
  avgAiScore: number;
} 