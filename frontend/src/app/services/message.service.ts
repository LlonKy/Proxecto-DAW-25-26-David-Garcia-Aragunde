import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  exchange_id?: number;
  content: string;
  created_at: string;
  sender?: { id: number; name: string; photo?: string };
  receiver?: { id: number; name: string; photo?: string };
}

export interface MessageInput {
  receiver_id: number;
  content: string;
  exchange_id?: number;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = 'http://localhost:3001/api/messages';

  constructor(private http: HttpClient) {}

  // Obtener mis mensajes
  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}`);
  }

  // Obtener mensajes con un usuario específico
  getMessagesWith(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiUrl}?user_id=${userId}`);
  }

  // Enviar mensaje
  sendMessage(data: MessageInput): Observable<Message> {
    return this.http.post<Message>(`${this.apiUrl}`, data);
  }
}
