import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

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

  constructor(private router: Router, private cartService: CartService) {}

  onImageError(event: any) {
    // Fallback image en cas d'erreur de chargement
    // event.target.src = 'img/placeholder-product.jpg';
  }

  navigateToDetails() {
    this.router.navigate(['/produit', this.product.id]);
  }

  addToCart() {
    // Logique pour ajouter le produit au panier
    // Par exemple, appeler un service de panier
    this.cartService.addToCart(this.product);
    //alert(`${this.product.name} ajouté au panier !`);
  }
}

