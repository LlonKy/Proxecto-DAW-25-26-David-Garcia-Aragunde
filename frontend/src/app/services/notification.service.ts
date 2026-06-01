import { Injectable, signal, computed, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Exchange } from '../models/exchange.model';
import { Message } from '../models/message.model';

@Injectable({ providedIn: 'root' })
export class NotificationService implements OnDestroy {
  private apiUrl = 'http://localhost:3001/api';
  private intervalId: ReturnType<typeof setInterval> | null = null;

  pendingExchanges = signal<number>(0);
  unreadMessages   = signal<number>(0);

  totalNotifications = computed(() =>
    this.pendingExchanges() + this.unreadMessages()
  );

  constructor(private http: HttpClient, private auth: AuthService) {}

  /** Inicia el polling de notificaciones. Llamar al iniciar sesión. */
  startPolling(intervalMs = 30_000): void {
    this.fetchAll();
    this.intervalId = setInterval(() => this.fetchAll(), intervalMs);
  }

  /** Detiene el polling. Llamar al cerrar sesión. */
  stopPolling(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.pendingExchanges.set(0);
    this.unreadMessages.set(0);
  }

  fetchAll(): void {
    if (!this.auth.isLoggedIn()) return;

    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) return;

    // Intercambios donde soy el receptor y están pendientes
    this.http.get<Exchange[]>(`${this.apiUrl}/exchanges`).subscribe({
      next: exchanges => {
        const pending = exchanges.filter(
          e => e.status === 'pending' && e.receiver_id === currentUser.id
        ).length;
        this.pendingExchanges.set(pending);
      },
      error: () => {} // silencioso
    });

    // Mensajes no leídos donde soy el receptor
    this.http.get<{ unreadCount: number }>(`${this.apiUrl}/messages/unread/count`).subscribe({
      next: res => {
        this.unreadMessages.set(res.unreadCount);
      },
      error: () => {} // silencioso
    });
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }
}
