import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Skill {
  id: number;
  name: string;
  description: string;
  type: 'offering' | 'seeking';
  category_id: number;
  user_id: number;
  created_at: string;
  category?: { id: number; name: string };
  user?: { id: number; name: string; photo?: string };
}

export interface SkillInput {
  name: string;
  description?: string;
  type: 'offering' | 'seeking';
  category_id: number;
}

@Injectable({ providedIn: 'root' })
export class SkillService {
  private apiUrl = 'http://localhost:3001/api/skills';

  constructor(private http: HttpClient) {}

  // Obtener todas las skills
  getSkills(filters?: { type?: string; category_id?: number; user_id?: number }): Observable<Skill[]> {
    let url = this.apiUrl;
    if (filters) {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.category_id) params.append('category_id', String(filters.category_id));
      if (filters.user_id) params.append('user_id', String(filters.user_id));
      if (params.toString()) url += '?' + params.toString();
    }
    return this.http.get<Skill[]>(url);
  }

  // Obtener una skill por id
  getSkill(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  // Crear skill
  createSkill(data: SkillInput): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}`, data);
  }

  // Actualizar skill
  updateSkill(id: number, data: Partial<SkillInput>): Observable<Skill> {
    return this.http.put<Skill>(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar skill
  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
