import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Jean-Pierre Dubois',
      role: 'Fondateur & Maître Boucher',
      description: 'Avec plus de 40 ans d\'expérience, Jean-Pierre a fondé la boucherie avec la passion de transmettre les traditions de son métier. Il supervise personnellement la sélection de nos fournisseurs.',
      icon: '👨‍🍳'
    },
    {
      name: 'Marc Dubois',
      role: 'Boucher & Responsable Qualité',
      description: 'Fils de Jean-Pierre, Marc a repris le flambeau familial. Formé aux techniques modernes tout en respectant les traditions, il assure la continuité de notre savoir-faire.',
      icon: '👨‍💼'
    },
    {
      name: 'Sophie Martin',
      role: 'Responsable Clientèle',
      description: 'Sophie accueille nos clients avec le sourire et les conseille dans leurs choix. Sa connaissance approfondie de nos produits en fait une ambassadrice de notre qualité.',
      icon: '👩‍💼'
    }
  ];

  values = [
    {
      icon: '🤝',
      title: 'Proximité et Confiance',
      description: 'Nous cultivons une relation de proximité avec nos clients, basée sur la confiance mutuelle et le conseil personnalisé. Chaque client est unique et mérite une attention particulière.'
    },
    {
      icon: '🏆',
      title: 'Excellence et Tradition',
      description: 'L\'excellence est notre standard quotidien. Nous perpétuons les traditions tout en nous adaptant aux attentes modernes de nos clients.'
    },
    {
      icon: '🌍',
      title: 'Responsabilité et Durabilité',
      description: 'Nous assumons notre responsabilité envers l\'environnement et les générations futures en privilégiant les pratiques durables et éthiques.'
    }
  ];

  commitments = [
    {
      icon: '🐷',
      title: 'Sélection Rigoureuse',
      description: 'Nos porcs proviennent exclusivement d\'élevages français respectueux du bien-être animal. Nous visitons régulièrement nos partenaires pour nous assurer du respect de nos critères de qualité.'
    },
    {
      icon: '🔪',
      title: 'Savoir-Faire Artisanal',
      description: 'Nos bouchers maîtrisent les techniques traditionnelles de découpe et de préparation. Chaque produit est préparé avec soin selon des méthodes éprouvées.'
    },
    {
      icon: '❄️',
      title: 'Chaîne du Froid',
      description: 'Le respect de la chaîne du froid est primordial. Nos installations modernes garantissent une conservation optimale de nos produits.'
    },
    {
      icon: '🌱',
      title: 'Respect de l\'Environnement',
      description: 'Nous privilégions les circuits courts et les emballages recyclables pour minimiser notre impact environnemental.'
    }
  ];
}