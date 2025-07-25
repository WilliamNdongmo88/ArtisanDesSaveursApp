import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { OrderPayload } from '../models/order';
import { catchError, delay, tap } from 'rxjs/operators';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  private apiUrl = 'http://localhost:8070/api/orders';

  constructor(private http: HttpClient) {
    // Charger le panier depuis le localStorage au démarrage
    this.loadCartFromStorage();
  }

  // Observable pour le nombre d'articles dans le panier
  getCartItemCount(): Observable<number> {
    return this.cartItemCountSubject.asObservable();
  }

  // Ajouter un produit au panier
  addToCart(product: Product, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.updateCartCount();
    this.saveCartToStorage();
  }

  // Retirer un produit du panier
  removeFromCart(productId: string): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCartCount();
    this.saveCartToStorage();
  }

  // Mettre à jour la quantité d'un produit
  updateQuantity(productId: string, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCartCount();
        this.saveCartToStorage();
      }
    }
  }

  // Obtenir tous les articles du panier
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Vider le panier
  clearCart(): void {
    this.cartItems = [];
    this.updateCartCount();
    this.saveCartToStorage();
  }

  // Calculer le total du panier
  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  // Mettre à jour le compteur d'articles
  private updateCartCount(): void {
    const totalCount = this.cartItems.reduce((count, item) => count + item.quantity, 0);
    this.cartItemCountSubject.next(totalCount);
  }

  // Sauvegarder le panier dans le localStorage
  private saveCartToStorage(): void {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }

  // Charger le panier depuis le localStorage
  private loadCartFromStorage(): void {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        this.updateCartCount();
      }
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      this.cartItems = [];
    }
  }

  // Méthode pour envoyer le panier à un serveur ou une API
  submitOrder(order: OrderPayload): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(this.apiUrl+"/place-order", order).pipe(
      tap((response) => console.log('Produit créé avec succès par l\'API :', response),
    ),
      catchError(err => {
        console.error("[CartService] Erreur de l'API : ", err.error.message);
        return throwError(() => err);
      })
    );
  }
}

