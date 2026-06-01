import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message, MessageInput } from '../models/message.model';

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
