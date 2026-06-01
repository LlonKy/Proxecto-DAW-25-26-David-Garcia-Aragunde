import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Exchange, SkillExchange } from '../../models/exchange.model';

@Component({
  selector: 'app-exchanges',
  imports: [CommonModule, RouterLink],
  templateUrl: './exchanges.component.html',
  styleUrl: './exchanges.component.scss'
})
export class Exchanges implements OnInit {
  private apiUrl = 'http://localhost:3001/api';

  exchanges = signal<Exchange[]>([]);
  loading   = signal(true);
  error     = signal('');
  updating  = signal<number | null>(null);

  currentUser: any;

  pending   = computed(() => this.exchanges().filter(e => e.status === 'pending'));
  active    = computed(() => this.exchanges().filter(e => ['accepted', 'in_progress'].includes(e.status)));
  completed = computed(() => this.exchanges().filter(e => ['completed', 'rejected'].includes(e.status)));

  constructor(
    private http:   HttpClient,
    private auth:   AuthService,
    private router: Router
  ) {
    this.currentUser = this.auth.getCurrentUser();
  }

  ngOnInit(): void {
    this.loadExchanges();
  }

  loadExchanges(): void {
    this.loading.set(true);
    this.http.get<Exchange[]>(`${this.apiUrl}/exchanges`).subscribe({
      next:  e  => { this.exchanges.set(e); this.loading.set(false); },
      error: () => { this.error.set('No se pudieron cargar los intercambios'); this.loading.set(false); }
    });
  }

  updateStatus(exchange: Exchange, status: string): void {
    this.updating.set(exchange.id);
    this.http.patch(`${this.apiUrl}/exchanges/${exchange.id}/status`, { status }).subscribe({
      next: (updated: any) => {
        this.exchanges.update(list =>
          list.map(e => e.id === exchange.id ? { ...e, status: updated.status } : e)
        );
        this.updating.set(null);
      },
      error: () => this.updating.set(null)
    });
  }

  isReceiver(exchange: Exchange): boolean {
    return exchange.receiver_id === this.currentUser?.id;
  }

  getOtherUser(exchange: Exchange): { id: number; name: string } {
    return exchange.requester_id === this.currentUser?.id
      ? exchange.receiver
      : exchange.requester;
  }

  getOfferedSkill(exchange: Exchange): string {
    const se = exchange.skill_exchanges.find(s => s.role === 'offered');
    return se?.skill?.name ?? '—';
  }

  getRequestedSkill(exchange: Exchange): string {
    const se = exchange.skill_exchanges.find(s => s.role === 'received');
    return se?.skill?.name ?? '—';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending:     'Pendiente',
      accepted:    'Aceptado',
      in_progress: 'En progreso',
      completed:   'Completado',
      rejected:    'Rechazado'
    };
    return labels[status] ?? status;
  }

  getInitials(name: string = ''): string {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }
}