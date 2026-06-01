export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  exchange_id?: number;
  content: string;
  created_at: string;
  read_at?: string | null;
  sender?: { id: number; name: string; photo?: string };
  receiver?: { id: number; name: string; photo?: string };
}

export interface MessageInput {
  receiver_id: number;
  content: string;
  exchange_id?: number;
}
