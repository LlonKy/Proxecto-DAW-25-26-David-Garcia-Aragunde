import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Skill, Category } from '../../models/skill.model';

const CATEGORY_PALETTE: Record<string, { color: string; icon: string }> = {
  'Tecnología':  { color: '#1DB954', icon: '💻' },
  'Música':      { color: '#8b5cf6', icon: '🎵' },
  'Idiomas':     { color: '#3b82f6', icon: '💬' },
  'Diseño':      { color: '#ec4899', icon: '🎨' },
  'Deporte':     { color: '#ef4444', icon: '⚡' },
  'Cocina':      { color: '#f59e0b', icon: '🍳' },
  'Educación':   { color: '#06b6d4', icon: '📚' },
  'Negocios':    { color: '#6366f1', icon: '📊' },
};

const DEFAULT_COLOR = '#1DB954';
const DEFAULT_ICON  = '⭐';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class Skills implements OnInit {
  private apiUrl = 'http://localhost:3001/api';

  skills          = signal<Skill[]>([]);
  categories      = signal<Category[]>([]);
  loading         = signal(true);
  error           = signal('');
  searchQuery     = signal('');
  activeType      = signal<'all' | 'offering' | 'seeking'>('all');
  activeCategory  = signal<number | null>(null);
  selectedSkill   = signal<Skill | null>(null);
  loadingDetail   = signal(false);
  exchangeSuccess = signal(false);
  exchangeError   = signal('');

  filtered = computed(() => {
    const q    = this.searchQuery().toLowerCase().trim();
    const type = this.activeType();
    const cat  = this.activeCategory();

    return this.skills().filter(s => {
      const matchesSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      const matchesType = type === 'all' || s.type === type;
      const matchesCat  = cat === null || s.category?.id === cat;
      return matchesSearch && matchesType && matchesCat;
    });
  });

  hasActiveFilters = computed(() =>
    this.searchQuery() !== '' ||
    this.activeType() !== 'all' ||
    this.activeCategory() !== null
  );

  isOwnSkill = computed(() => {
    const skill = this.selectedSkill();
    const user  = this.auth.getCurrentUser();
    if (!skill || !user) return false;
    return skill.user?.id === user.id;
  });

  constructor(
    private http:   HttpClient,
    private route:  ActivatedRoute,
    private router: Router,
    private auth:   AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['q']) this.searchQuery.set(params['q']);
    });
    this.loadCategories();
    this.loadSkills();
  }

  loadSkills(): void {
    this.loading.set(true);
    this.http.get<Skill[]>(`${this.apiUrl}/skills`).subscribe({
      next:  s  => { this.skills.set(s); this.loading.set(false); },
      error: () => { this.error.set('No se pudieron cargar las habilidades'); this.loading.set(false); }
    });
  }

  loadCategories(): void {
    this.http.get<Category[]>(`${this.apiUrl}/categories`).subscribe({
      next: c => this.categories.set(c)
    });
  }

  setType(type: 'all' | 'offering' | 'seeking'): void { this.activeType.set(type); }
  setCategory(id: number | null): void { this.activeCategory.set(id); }

  clearFilters(): void {
    this.searchQuery.set('');
    this.activeType.set('all');
    this.activeCategory.set(null);
  }

  openSkill(skill: Skill): void {
    this.selectedSkill.set(skill);
    this.exchangeSuccess.set(false);
    this.exchangeError.set('');
    document.body.style.overflow = 'hidden';
  }

  closeSkill(): void {
    this.selectedSkill.set(null);
    document.body.style.overflow = '';
  }

  requestExchange(): void {
    const skill = this.selectedSkill();
    if (!skill) return;

    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/register']);
      return;
    }

    this.loadingDetail.set(true);
    this.exchangeError.set('');

    this.http.post(`${this.apiUrl}/exchanges`, { skill_ids: [skill.id] }).subscribe({
      next:  () => { this.exchangeSuccess.set(true); this.loadingDetail.set(false); },
      error: (err) => {
        this.exchangeError.set(err.error?.message || 'Error al solicitar el intercambio');
        this.loadingDetail.set(false);
      }
    });
  }

  getInitials(name: string = ''): string {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }

  getCategoryColor(name: string = ''): string {
    return CATEGORY_PALETTE[name]?.color ?? DEFAULT_COLOR;
  }

  getCategoryIcon(name: string = ''): string {
    return CATEGORY_PALETTE[name]?.icon ?? DEFAULT_ICON;
  }
}