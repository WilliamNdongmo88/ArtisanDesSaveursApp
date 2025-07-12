import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContactForm } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  sendContactForm(formData: ContactForm): Observable<{ success: boolean; message: string }> {
    // Simulation d'un appel API
    console.log('Formulaire de contact envoyé:', formData);
    
    // Simulation d'un délai de traitement
    return of({
      success: true,
      message: 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    }).pipe(delay(1000));
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

