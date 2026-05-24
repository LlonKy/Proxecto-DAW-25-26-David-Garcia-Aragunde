export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Skill {
  id: number;
  name: string;
  description: string;
  type: 'offering' | 'seeking';
  category?: Category;
  user?: { id: number; name: string };
}