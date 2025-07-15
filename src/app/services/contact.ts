import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { ContactForm, ContactForms, ContactRequest } from '../models/product';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:8070/api/users';

  constructor(private http: HttpClient) { }

  sendContactForm(formDatas: ContactForms): Observable<{ success: boolean; message: string }> {
    // Simulation d'un appel API
    console.log('Formulaire de contact envoyé:', formDatas);
		return this.http.post<{ success: boolean; message: string }>(this.apiUrl+'/place-order', formDatas).pipe(
			tap((response) => console.log('Produit créé avec succès par l\'API :', response),
    ),
			catchError(err => {
				console.error("[ProductService] Erreur de l'API : ", err.error.message);
				return throwError(() => err);
			})
		);
    // return of({
    //   success: true,
    //   message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    // }).pipe(delay(1000));
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateForm(formData: Partial<ContactForm>): string[] {
    const errors: string[] = [];

    if (!formData.firstName?.trim()) {
      errors.push('Le prénom est requis');
    }

    if (!formData.lastName?.trim()) {
      errors.push('Le nom est requis');
    }

    if (!formData.email?.trim()) {
      errors.push('L\'email est requis');
    } else if (!this.validateEmail(formData.email)) {
      errors.push('L\'email n\'est pas valide');
    }

    if (!formData.subject) {
      errors.push('Veuillez sélectionner un sujet');
    }

    if (!formData.message?.trim()) {
      errors.push('Le message est requis');
    }

    if (!formData.consent) {
      errors.push('Vous devez accepter l\'utilisation de vos données personnelles');
    }

    return errors;
  }
}

