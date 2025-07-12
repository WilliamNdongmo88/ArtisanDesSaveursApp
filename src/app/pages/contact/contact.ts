import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { ContactForm } from '../../models/product';
import { ScrollToTopComponent } from "../../components/scroll-to-top-button/scroll-to-top.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ScrollToTopComponent],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  subjects = [
    { value: 'commande', label: 'Commande spéciale' },
    { value: 'information', label: 'Demande d\'information' },
    { value: 'livraison', label: 'Question sur la livraison' },
    { value: 'qualite', label: 'Question sur la qualité' },
    { value: 'autre', label: 'Autre' }
  ];

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.submitMessage = '';

      const formData: ContactForm = this.contactForm.value;

      this.contactService.sendContactForm(formData).subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage = response.message;
          this.contactForm.reset();
          this.isSubmitting = false;
          
          // Masquer le message après 5 secondes
          setTimeout(() => {
            this.submitMessage = '';
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          this.submitSuccess = false;
          this.submitMessage = 'Une erreur est survenue. Veuillez réessayer.';
          this.isSubmitting = false;
          
          // Masquer le message après 5 secondes
          setTimeout(() => {
            this.submitMessage = '';
          }, 5000);
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `Ce champ est requis`;
      }
      if (field.errors['email']) {
        return 'Veuillez entrer une adresse email valide';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Minimum ${requiredLength} caractères requis`;
      }
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}
