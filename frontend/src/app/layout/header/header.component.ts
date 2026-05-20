import { Component, computed } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class Header {
  menuOpen = signal(false);
  searchQuery = signal('');

  isLoggedIn = computed(() => !!this.auth.currentUser$());
  user = computed(() => this.auth.currentUser$());

  initials = computed(() => {
    const name = this.user()?.name;
    if (!name) return '?';
    return name.split(' ').map((w: string) => w[0]).slice(0, 2).join('').toUpperCase();
  });

  constructor(private auth: AuthService, private router: Router) {}

  onSearch(): void {
    const q = this.searchQuery().trim();
    if (q) this.router.navigate(['/skills'], { queryParams: { q } });
  }

  logout(): void {
    this.auth.logout();
    this.menuOpen.set(false);
  }

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }
}