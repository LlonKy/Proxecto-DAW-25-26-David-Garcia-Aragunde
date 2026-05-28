import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface SkillCard {
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  user: string;
}

@Component({
  selector: 'app-landing',
  imports: [RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class Landing {
  featuredSkills: SkillCard[] = [
    {
      category: 'Idiomas',
      categoryColor: '#3b82f6',
      title: 'Conversación en inglés',
      description: 'Practica inglés hablado en situaciones cotidianas y de trabajo.',
      user: 'Carlos Ruiz'
    },
    {
      category: 'Cocina',
      categoryColor: '#f59e0b',
      title: 'Cocina italiana',
      description: 'Aprende a hacer pasta fresca, risotto y recetas clásicas.',
      user: 'Lucía Romano'
    },
    {
      category: 'Código',
      categoryColor: '#1DB954',
      title: 'Introducción a Python',
      description: 'Fundamentos de programación con Python desde cero.',
      user: 'Adrián López'
    },
    {
      category: 'Deporte',
      categoryColor: '#ef4444',
      title: 'Yoga para principiantes',
      description: 'Flexibilidad, fuerza y mindfulness en sesiones de 30 min.',
      user: 'Priya Sharma'
    },
    {
      category: 'Música',
      categoryColor: '#8b5cf6',
      title: 'Guitarra acústica',
      description: 'Aprende acordes y canciones populares desde el primer día.',
      user: 'Marta Gil'
    },
    {
      category: 'Diseño',
      categoryColor: '#ec4899',
      title: 'Figma desde cero',
      description: 'Diseña interfaces modernas con la herramienta más usada.',
      user: 'Iván Torres'
    }
  ];

  getInitials(name: string): string {
    return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }
}