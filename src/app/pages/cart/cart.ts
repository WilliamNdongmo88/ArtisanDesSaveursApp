import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  subtotal = 0;
  discountPercentage = 10;
  discountAmount = 0;
  total = 0;
  freeShippingThreshold = 3000;
  isEligibleForFreeShipping = false;
  amountNeededForFreeShipping = 0;
  private cartSubscription?: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
    this.cartSubscription = this.cartService.getCartItemCount().subscribe(() => {
      this.loadCartItems();
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);

    this.discountAmount = this.subtotal * (this.discountPercentage / 100);
    this.total = this.subtotal - this.discountAmount;

    // Vérifier l'éligibilité à la livraison gratuite
    this.isEligibleForFreeShipping = this.total >= this.freeShippingThreshold;
    this.amountNeededForFreeShipping = this.isEligibleForFreeShipping ? 
      0 : this.freeShippingThreshold - this.total;
  }

  updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(productId);
    } else {
      this.cartService.updateQuantity(productId, newQuantity);
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  continueShopping() {
    this.router.navigate(['/catalogue']);
  }

  submitOrder() {
    if (this.cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }

    // Simulation de soumission de commande
    const orderSummary = {
      items: this.cartItems,
      subtotal: this.subtotal,
      discount: this.discountAmount,
      total: this.total,
      freeShipping: this.isEligibleForFreeShipping
    };

    console.log('Commande soumise:', orderSummary);
    
    // Message de confirmation
    alert(`Commande soumise avec succès !\n\nTotal: Rs ${this.total.toFixed(2)}\n${this.isEligibleForFreeShipping ? 'Livraison gratuite incluse !' : 'Frais de livraison à ajouter'}`);
    
    // Vider le panier après la commande
    this.clearCart();
    
    // Rediriger vers la page d'accueil
    this.router.navigate(['/']);
  }

  onImageError(event: any) {
    // Fallback image en cas d'erreur de chargement
    // event.target.src = 'img/placeholder-product.jpg';
  }
}

