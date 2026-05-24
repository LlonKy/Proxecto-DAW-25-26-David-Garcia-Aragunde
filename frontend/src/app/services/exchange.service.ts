import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ExchangeRequest {
  receiver_id: number;
  offered_skill_id: number;
  requested_skill_id: number;
}

export interface Exchange {
  id: number;
  requester_id: number;
  receiver_id: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'rejected';
  created_at: string;
  updated_at: string;
}

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  private apiUrl = 'http://localhost:3001/api/exchanges';

  constructor(private http: HttpClient) {}

  // Obtener mis intercambios
  getMyExchanges(): Observable<Exchange[]> {
    return this.http.get<Exchange[]>(`${this.apiUrl}`);
  }

  // Obtener intercambio por id
  getExchange(id: number): Observable<Exchange> {
    return this.http.get<Exchange>(`${this.apiUrl}/${id}`);
  }

  // Crear solicitud de intercambio
  createExchange(data: ExchangeRequest): Observable<Exchange> {
    return this.http.post<Exchange>(`${this.apiUrl}`, data);
  }

  // Actualizar estado del intercambio
  updateExchangeStatus(id: number, status: string): Observable<Exchange> {
    return this.http.patch<Exchange>(`${this.apiUrl}/${id}/status`, { status });
  }
}
