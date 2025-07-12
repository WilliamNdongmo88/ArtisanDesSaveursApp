export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: ProductCategory;
  image: string;
  featured: boolean;
  origin: string;
  preparation?: string;
}

export enum ProductCategory {
  COTES_TRAVERS = 'cotes-travers',
  ROTIS_FILETS = 'rotis-filets',
  SAUCISSES_CHARCUTERIE = 'saucisses-charcuterie',
  MORCEAUX_BRAISER = 'morceaux-braiser',
  PRODUITS_TRANSFORMES = 'produits-transformes'
}

export interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  consent: boolean;
}

