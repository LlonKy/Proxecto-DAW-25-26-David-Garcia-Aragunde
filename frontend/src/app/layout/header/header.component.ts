import { Component, computed, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header implements OnInit, OnDestroy {
  /** Menú hamburguesa móvil */
  menuOpen        = signal(false);
  /** Dropdown de avatar (escritorio) */
  profileMenuOpen = signal(false);
  searchQuery     = signal('');

  isLoggedIn = computed(() => !!this.auth.currentUser$());
  user       = computed(() => this.auth.currentUser$());

  initials = computed(() => {
    const name = this.user()?.name;
    if (!name) return '?';
    return name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    public notifService: NotificationService
  ) {}

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.notifService.startPolling();
    }
  }

  ngOnDestroy(): void {
    this.notifService.stopPolling();
  }

  onSearch(): void {
    const q = this.searchQuery().trim();
    if (q) this.router.navigate(['/skills'], { queryParams: { q } });
  }

  logout(): void {
    this.notifService.stopPolling();
    this.auth.logout();
    this.menuOpen.set(false);
    this.profileMenuOpen.set(false);
  }

  toggleMenu(): void        { this.menuOpen.update(v => !v); }
  closeMenu(): void         { this.menuOpen.set(false); }

  toggleProfileMenu(): void { this.profileMenuOpen.update(v => !v); }
  closeProfileMenu(): void  { this.profileMenuOpen.set(false); }

  /** @deprecated use closeMenu / closeProfileMenu */
  toggleLegacy(): void { this.toggleProfileMenu(); }
}