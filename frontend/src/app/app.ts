import { Component, signal, computed } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Header } from './layout/header/header.component';
import { Footer } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('swaply-frontend');
  showLayout = signal(false);

  private readonly AUTH_ROUTES = ['/login', '/register'];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      this.showLayout.set(!this.AUTH_ROUTES.includes(e.urlAfterRedirects));
    });
  }
}