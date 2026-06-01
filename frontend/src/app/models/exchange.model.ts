export interface SkillExchange {
  skill_id: number;
  role: 'offered' | 'received';
  skill: { id: number; name: string };
}

export interface Exchange {
  id: number;
  requester_id: number;
  receiver_id: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';
  created_at: string;
  updated_at?: string;
  requester: { id: number; name: string };
  receiver: { id: number; name: string };
  skill_exchanges: SkillExchange[];
}

export interface ExchangeRequest {
  receiver_id: number;
  offered_skill_id: number;
  requested_skill_id: number;
}
