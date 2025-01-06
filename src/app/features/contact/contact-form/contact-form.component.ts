import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {HttpClient} from "@angular/common/http";
import {ContactService} from '../../../shared/services/contact.service';
import {MessageService} from 'primeng/api';
import {firstValueFrom} from 'rxjs';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    SharedModule,
    NavbarComponent,
    FooterComponent,
    AutoCompleteModule
  ],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [MessageService]
})
export class ContactFormComponent {
  filteredCountries: any[] = [];
  countries: { name: string; code: string }[] = [];
  selectedCountry: any;

  firstname: string = '';
  lastname: string = '';
  city: string = '';
  zip: string = '';
  message: string = '';

  isLoading: boolean = false;

  constructor(private http: HttpClient, private contactService: ContactService, private messageService: MessageService) {
  }

  ngOnInit() {
    // Chargement des pays
    this.http.get<any>('assets/demo/data/countries.json').subscribe(data => {
      this.countries = data.data;
    });
  }

  filterCountry(event: any) {
    const query = event.query.toLowerCase();
    this.filteredCountries = this.countries.filter(country =>
      country.name.toLowerCase().startsWith(query)
    );
  }

  async submitForm(contactForm: any) {
    this.isLoading = true;
    const contactData = {
      firstname: this.firstname,
      lastname: this.lastname,
      city: this.city,
      zip: this.zip,
      country: this.selectedCountry?.name || '',
      message: this.message
    };

    try {
      // Attente de l'envoi de l'email
      const response = await firstValueFrom(this.contactService.sendEmail(contactData));

      // Vérification de la réponse du serveur
      if (response && response.status === "success") {
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: 'Votre message a été envoyé avec succès.'
        });
        this.resetForm();
        contactForm.resetForm(); // Réinitialisation complète de l'état de validation
      } else {
        // Si la réponse contient une erreur
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: response.message || 'Une erreur est survenue lors de l\'envoi du message.'
        });
      }
    } catch (error) {
      // Gestion des erreurs générales
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors de l\'envoi du message.'
      });
    } finally {
      this.isLoading = false;
    }
  }

  resetForm() {
    this.firstname = '';
    this.lastname = '';
    this.city = '';
    this.zip = '';
    this.message = '';
    this.selectedCountry = null;
  }
}
