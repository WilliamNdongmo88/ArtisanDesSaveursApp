import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() featured: boolean = false;

  onImageError(event: any) {
    // Fallback image en cas d'erreur de chargement
    // event.target.src = 'img/placeholder-product.jpg';
  }
}

