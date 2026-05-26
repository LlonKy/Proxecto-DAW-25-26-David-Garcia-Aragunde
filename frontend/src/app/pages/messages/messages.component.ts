import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
}

interface OtherUser {
  id: number;
  name: string;
}

@Component({
  selector: 'app-messages',
  imports: [CommonModule, FormsModule, DatePipe, RouterLink],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss'
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesList') messagesList!: ElementRef;

  private apiUrl = 'http://localhost:3001/api';

  messages       = signal<Message[]>([]);
  conversations  = signal<any[]>([]);
  loading        = signal(true);
  error          = signal('');
  newMessageText = signal('');
  sending        = signal(false);
  otherUserName  = signal('');

  otherId!: number;
  currentUser: any;

  constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private http:   HttpClient,
    private auth:   AuthService
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.otherId = parseInt(params['id']);
      if (this.otherId) {
        this.loadOtherUser();
        this.loadMessages();
      } else {
        this.loadConversations();
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      const el = this.messagesList?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch {}
  }

  loadOtherUser(): void {
    this.http.get<OtherUser>(`${this.apiUrl}/users/${this.otherId}`).subscribe({
      next: user => this.otherUserName.set(user.name)
    });
  }

  loadMessages(): void {
    this.loading.set(true);
    this.http.get<Message[]>(`${this.apiUrl}/messages/${this.otherId}`).subscribe({
      next: msgs => {
        this.messages.set(msgs);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los mensajes');
        this.loading.set(false);
      }
    });
  }

  loadConversations(): void {
    this.loading.set(true);
    this.http.get<any[]>(`${this.apiUrl}/messages`).subscribe({
      next: convs => {
        this.conversations.set(convs);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar las conversaciones');
        this.loading.set(false);
      }
    });
  }

  sendMessage(): void {
    const content = this.newMessageText().trim();
    if (!content || !this.currentUser) return;

    this.sending.set(true);
    this.http.post<Message>(`${this.apiUrl}/messages`, {
      receiver_id: this.otherId,
      content
    }).subscribe({
      next: msg => {
        this.messages.update(msgs => [...msgs, msg]);
        this.newMessageText.set('');
        this.sending.set(false);
      },
      error: () => {
        this.error.set('Error al enviar mensaje');
        this.sending.set(false);
      }
    });
  }

  goBack(): void {
    if (this.otherId) {
      this.router.navigate(['/messages']);
    } else {
      this.router.navigate(['/skills']);
    }
  }
}