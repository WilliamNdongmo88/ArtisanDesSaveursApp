import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, ProductCategory } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Côtes de Porc Première',
      description: 'Côtes de porc fraîches, parfaites pour vos grillades et barbecues. Viande tendre et savoureuse, idéale pour les repas en famille ou entre amis.',
      price: 12.90,
      unit: 'kg',
      category: ProductCategory.COTES_TRAVERS,
      image: 'img/produits/cotes-de-porc.jpg',
      featured: true,
      origin: 'France'
    },
    {
      id: '2',
      name: 'Travers de Porc',
      description: 'Travers de porc marinés selon notre recette maison. Parfaits pour une cuisson lente au four ou au barbecue.',
      price: 14.50,
      unit: 'kg',
      category: ProductCategory.COTES_TRAVERS,
      image: 'img/produits/cotes-de-porc.jpg',
      featured: false,
      origin: 'France'
    },
    {
      id: '3',
      name: 'Rôti de Porc dans l\'Échine',
      description: 'Rôti de porc tendre et juteux, parfait pour vos repas dominicaux. Préparé avec soin par nos bouchers expérimentés.',
      price: 15.50,
      unit: 'kg',
      category: ProductCategory.ROTIS_FILETS,
      image: 'img/produits/roti-de-porc.jpg',
      featured: true,
      origin: 'France'
    },
    {
      id: '4',
      name: 'Filet de Porc',
      description: 'Morceau noble et tendre, le filet de porc se cuisine rapidement et offre une chair délicate et savoureuse.',
      price: 22.90,
      unit: 'kg',
      category: ProductCategory.ROTIS_FILETS,
      image: 'img/produits/roti-de-porc.jpg',
      featured: false,
      origin: 'France'
    },
    {
      id: '5',
      name: 'Rôti de Porc Farci',
      description: 'Rôti de porc farci aux herbes de Provence et aux champignons. Une spécialité de notre boucherie pour les grandes occasions.',
      price: 18.90,
      unit: 'kg',
      category: ProductCategory.ROTIS_FILETS,
      image: 'img/produits/roti-de-porc.jpg',
      featured: false,
      origin: 'France'
    },
    {
      id: '6',
      name: 'Saucisses Fraîches de Porc',
      description: 'Saucisses artisanales préparées selon nos recettes traditionnelles. 100% viande de porc, sans colorants ni conservateurs.',
      price: 8.90,
      unit: 'kg',
      category: ProductCategory.SAUCISSES_CHARCUTERIE,
      image: 'img/produits/saucisses-fraiches.jpg',
      featured: true,
      origin: 'Fabrication Maison'
    },
    {
      id: '7',
      name: 'Saucisses aux Herbes de Provence',
      description: 'Saucisses parfumées aux herbes de Provence, idéales pour apporter une touche méditerranéenne à vos repas.',
      price: 9.50,
      unit: 'kg',
      category: ProductCategory.SAUCISSES_CHARCUTERIE,
      image: 'img/produits/saucisses-fraiches.jpg',
      featured: false,
      origin: 'Fabrication Maison'
    },
    {
      id: '8',
      name: 'Jambon Blanc Artisanal',
      description: 'Jambon blanc cuit à l\'ancienne, sans polyphosphates. Goût authentique et texture fondante garantis.',
      price: 16.90,
      unit: 'kg',
      category: ProductCategory.SAUCISSES_CHARCUTERIE,
      image: 'img/produits/saucisses-fraiches.jpg',
      featured: false,
      origin: 'Fabrication Maison'
    },
    {
      id: '9',
      name: 'Jarret de Porc',
      description: 'Jarret de porc parfait pour vos plats mijotés et potées. Viande gélatineuse qui apporte du moelleux à vos préparations.',
      price: 7.90,
      unit: 'kg',
      category: ProductCategory.MORCEAUX_BRAISER,
      image: 'img/produits/cotes-de-porc.jpg',
      featured: false,
      origin: 'France'
    },
    {
      id: '10',
      name: 'Palette de Porc',
      description: 'Morceau savoureux idéal pour les cuissons lentes. Parfait pour les rôtis braisés et les plats en sauce.',
      price: 9.90,
      unit: 'kg',
      category: ProductCategory.MORCEAUX_BRAISER,
      image: 'img/produits/cotes-de-porc.jpg',
      featured: false,
      origin: 'France'
    },
    {
      id: '11',
      name: 'Poitrine de Porc',
      description: 'Poitrine de porc fraîche, parfaite pour les lardons maison ou les plats traditionnels comme le petit salé.',
      price: 6.90,
      unit: 'kg',
      category: ProductCategory.MORCEAUX_BRAISER,
      image: 'img/produits/cotes-de-porc.jpg',
      featured: false,
      origin: 'France'
    },
    {
      id: '12',
      name: 'Lardons Fumés',
      description: 'Lardons fumés au bois de hêtre, découpés à la demande. Parfaits pour vos quiches, salades et plats cuisinés.',
      price: 12.50,
      unit: 'kg',
      category: ProductCategory.PRODUITS_TRANSFORMES,
      image: 'img/produits/saucisses-fraiches.jpg',
      featured: false,
      origin: 'Fabrication Maison'
    },
    {
      id: '13',
      name: 'Bacon Artisanal',
      description: 'Bacon préparé selon la méthode traditionnelle, fumé lentement pour développer tous ses arômes.',
      price: 15.90,
      unit: 'kg',
      category: ProductCategory.PRODUITS_TRANSFORMES,
      image: 'img/produits/saucisses-fraiches.jpg',
      featured: false,
      origin: 'Fabrication Maison'
    },
    {
      id: '14',
      name: 'Pâté de Campagne',
      description: 'Pâté de campagne traditionnel préparé avec du porc fermier. Recette familiale transmise de génération en génération.',
      price: 13.90,
      unit: 'kg',
      category: ProductCategory.PRODUITS_TRANSFORMES,
      image: 'img/produits/saucisses-fraiches.jpg',
      featured: false,
      origin: 'Fabrication Maison'
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    const filteredProducts = this.products.filter(product => product.category === category);
    return of(filteredProducts);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featuredProducts = this.products.filter(product => product.featured);
    return of(featuredProducts);
  }

  getProductById(id: string): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getCategoryDisplayName(category: ProductCategory): string {
    const categoryNames = {
      [ProductCategory.COTES_TRAVERS]: 'Côtes et Travers',
      [ProductCategory.ROTIS_FILETS]: 'Rôtis et Filets',
      [ProductCategory.SAUCISSES_CHARCUTERIE]: 'Saucisses et Charcuterie',
      [ProductCategory.MORCEAUX_BRAISER]: 'Morceaux à Braiser',
      [ProductCategory.PRODUITS_TRANSFORMES]: 'Produits Transformés'
    };
    return categoryNames[category];
  }

  getAllCategories(): ProductCategory[] {
    return Object.values(ProductCategory);
  }
}

