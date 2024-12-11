import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {HttpClient} from "@angular/common/http";

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
  styleUrl: './contact-form.component.scss'
})
export class ContactFormComponent {
  filteredCountries: any[] = [];
  countries: { name: string; code: string }[] = [];
  selectedCountry: any;

  firstname: string = '';
  lastname: string = '';
  city: string = '';
  zip: string = '';

  constructor(private http: HttpClient) {
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
}
