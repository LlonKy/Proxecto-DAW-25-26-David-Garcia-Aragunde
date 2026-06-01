import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category, Skill } from '../../../models/skill.model';

@Component({
  selector: 'app-skill-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './skill-form.component.html',
  styleUrl: './skill-form.component.scss'
})
export class SkillForm implements OnInit {
  private apiUrl = 'http://localhost:3001/api';

  form!: FormGroup;
  categories  = signal<Category[]>([]);
  loading     = signal(false);
  loadingData = signal(false);
  error       = signal('');
  skillId     = signal<number | null>(null);

  isEditMode  = computed(() => this.skillId() !== null);
  pageTitle   = computed(() => this.isEditMode() ? 'Editar habilidad' : 'Publicar habilidad');
  submitLabel = computed(() => this.isEditMode() ? 'Guardar cambios' : 'Publicar');
  descLength  = computed(() => (this.form?.get('description')?.value ?? '').length);

  constructor(
    private fb:     FormBuilder,
    private http:   HttpClient,
    private router: Router,
    private route:  ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:        ['', [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      type:        ['offering', Validators.required],
      category_id: [null, Validators.required]
    });

    this.loadCategories();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.skillId.set(Number(id));
      this.loadSkill(Number(id));
    }
  }

  loadCategories(): void {
    this.http.get<Category[]>(`${this.apiUrl}/categories`).subscribe({
      next: c => {
        const unique = c.filter((cat, index, self) =>
          self.findIndex(t => t.name === cat.name) === index
        );
        this.categories.set(unique);
      }
    });
  }

  loadSkill(id: number): void {
    this.loadingData.set(true);
    this.http.get<Skill>(`${this.apiUrl}/skills/${id}`).subscribe({
      next: skill => {
        this.form.patchValue({
          name:        skill.name,
          description: skill.description,
          type:        skill.type,
          category_id: skill.category?.id ?? null
        });
        this.loadingData.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la habilidad');
        this.loadingData.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading.set(true);
    this.error.set('');

    const request = this.isEditMode()
      ? this.http.put(`${this.apiUrl}/skills/${this.skillId()}`, this.form.value)
      : this.http.post(`${this.apiUrl}/skills`, this.form.value);

    request.subscribe({
      next:  () => this.router.navigate(['/profile/me']),
      error: (err) => {
        this.error.set(err.error?.message || 'Error al guardar la habilidad');
        this.loading.set(false);
      }
    });
  }

  get name()        { return this.form.get('name')!; }
  get description() { return this.form.get('description')!; }
  get type()        { return this.form.get('type')!; }
  get category_id() { return this.form.get('category_id')!; }
}