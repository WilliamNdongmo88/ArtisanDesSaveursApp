import { ContactForms, ContactRequest } from "./product";

export class User implements ContactForms {
	firstName!: string;
	lastName!: string;
	email!: string;
	phone!: string;
	consent!: boolean;
	contactRequests!: ContactRequest[];

}