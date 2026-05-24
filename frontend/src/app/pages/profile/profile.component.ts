import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  description: string | null;
  role: string;
  created_at: string;
  skills?: Skill[];
  ratings?: Rating[];
}

interface Skill {
  id: number;
  name: string;
  description: string;
  type: 'offering' | 'seeking';
  category?: { name: string; color?: string };
}

interface Rating { score: number; }

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class Profile implements OnInit {
  private apiUrl = 'http://localhost:3001/api';

  profile = signal<UserProfile | null>(null);
  loading = signal(true);
  error = signal('');
  isOwnProfile = signal(false);
  isEditing = signal(false);
  saving = signal(false);
  saveError = signal('');
  saveSuccess = signal(false);
  showExchangeModal = signal(false);
  exchangeSuccess = signal(false);
  exchangeError = signal('');
  mySkills = signal<Skill[]>([]);

  editForm: FormGroup;
  exchangeForm: FormGroup;

  offeringSkills = computed(() => this.profile()?.skills?.filter(s => s.type === 'offering') ?? []);
  seekingSkills = computed(() => this.profile()?.skills?.filter(s => s.type === 'seeking') ?? []);

  averageRating = computed(() => {
    const ratings = this.profile()?.ratings;
    if (!ratings?.length) return 0;
    return ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
  });

  ratingCount = computed(() => this.profile()?.ratings?.length ?? 0);

  initials = computed(() => {
    const name = this.profile()?.name;
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  });

  memberSince = computed(() => {
    const date = this.profile()?.created_at;
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });

    this.exchangeForm = this.fb.group({
      offered_skill_id: ['', Validators.required],
      requested_skill_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const currentUser = this.auth.getCurrentUser();

      if (!id || id === 'me') {
        if (!currentUser) { this.router.navigate(['/login']); return; }
        this.isOwnProfile.set(true);
        this.loadProfile(currentUser.id);
      } else if (currentUser && String(currentUser.id) === String(id)) {
        this.isOwnProfile.set(true);
        this.loadProfile(id);
      } else {
        this.isOwnProfile.set(false);
        this.loadProfile(id);
        this.loadMySkills();
      }
    });
  }

  loadProfile(id: string | number): void {
    this.loading.set(true);
    this.http.get<UserProfile>(`${this.apiUrl}/users/${id}`).subscribe({
      next: user => {
        this.profile.set(user);
        this.editForm.patchValue({ name: user.name, description: user.description || '' });
        this.loadSkills(user.id);
      },
      error: () => {
        this.error.set('No se pudo cargar el perfil');
        this.loading.set(false);
      }
    });
  }

  loadSkills(userId: number): void {
    this.http.get<Skill[]>(`${this.apiUrl}/skills?user_id=${userId}`).subscribe({
      next: skills => {
        this.profile.update(p => p ? { ...p, skills } : p);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadMySkills(): void {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) return;
    this.http.get<Skill[]>(`${this.apiUrl}/skills?user_id=${currentUser.id}`).subscribe({
      next: skills => this.mySkills.set(skills.filter(s => s.type === 'offering'))
    });
  }

  startEdit(): void {
    this.isEditing.set(true);
    this.saveError.set('');
    this.saveSuccess.set(false);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    const p = this.profile();
    if (p) this.editForm.patchValue({ name: p.name, description: p.description || '' });
  }

  saveProfile(): void {
    if (this.editForm.invalid) { this.editForm.markAllAsTouched(); return; }
    this.saving.set(true);
    this.saveError.set('');

    this.http.put(`${this.apiUrl}/users/profile`, this.editForm.value).subscribe({
      next: (updated: any) => {
        this.profile.update(p => p ? { ...p, name: updated.name, description: updated.description } : p);
        const user = this.auth.getCurrentUser();
        if (user) {
          user.name = updated.name;
          localStorage.setItem('user', JSON.stringify(user));
        }
        this.saving.set(false);
        this.isEditing.set(false);
        this.saveSuccess.set(true);
        setTimeout(() => this.saveSuccess.set(false), 3000);
      },
      error: (err) => {
        this.saveError.set(err.error?.message || 'Error al guardar');
        this.saving.set(false);
      }
    });
  }

  openExchangeModal(): void {
    if (this.isOwnProfile()) return;
    this.exchangeSuccess.set(false);
    this.exchangeError.set('');
    this.exchangeForm.reset();
    this.showExchangeModal.set(true);
  }

  closeExchangeModal(): void {
    this.showExchangeModal.set(false);
    this.exchangeForm.reset();
  }

  proposeExchange(): void {
    if (this.exchangeForm.invalid) { this.exchangeForm.markAllAsTouched(); return; }
    const profile = this.profile();
    const currentUser = this.auth.getCurrentUser();
    if (!profile || !currentUser) return;

    this.http.post(`${this.apiUrl}/exchanges`, {
      receiver_id: profile.id,
      offered_skill_id: this.exchangeForm.value.offered_skill_id,
      requested_skill_id: this.exchangeForm.value.requested_skill_id
    }).subscribe({
      next: () => {
        this.exchangeSuccess.set(true);
        setTimeout(() => this.closeExchangeModal(), 1500);
      },
      error: (err) => {
        this.exchangeError.set(err.error?.message || 'Error al proponer el intercambio');
      }
    });
  }

  deleteSkill(skillId: number): void {
    if (!confirm('¿Eliminar esta habilidad?')) return;
    this.http.delete(`${this.apiUrl}/skills/${skillId}`).subscribe({
      next: () => {
        this.profile.update(p => p ? {
          ...p,
          skills: (p.skills ?? []).filter(s => s.id !== skillId)
        } : p);
      },
      error: (err) => {
        this.saveError.set(err.error?.message || 'Error al eliminar');
        setTimeout(() => this.saveError.set(''), 3000);
      }
    });
  }

  editSkill(skill: Skill): void {
    this.router.navigate(['/skills/edit', skill.id]);
  }

  goToMessages(): void {
    const p = this.profile();
    if (p) this.router.navigate(['/messages', p.id]);
  }

  starsArray(rating: number): string[] {
    return Array(5).fill('').map((_, i) => {
      if (i < Math.floor(rating)) return 'full';
      if (i < rating) return 'half';
      return 'empty';
    });
  }
}