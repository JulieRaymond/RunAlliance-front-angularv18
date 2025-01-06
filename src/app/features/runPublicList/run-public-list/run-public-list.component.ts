import {Component, ElementRef, ViewChild} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {Table} from "primeng/table";
import {RunService} from "../../../shared/services/run.service";
import {Run} from "../../../shared/models/run.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";
import {firstValueFrom} from 'rxjs';
import {FormatTimePipe} from "../../../shared/pipes/FormatTimePipe";
import {AuthService} from "../../../shared/services/auth.service";
import {CourseRegistrationService} from "../../../shared/services/course-registration.service";
import {User} from "../../../shared/models/user.model";

@Component({
  selector: 'app-run-public-list',
  standalone: true,
  imports: [
    SharedModule,
    NavbarComponent,
    FooterComponent,
    NgOptimizedImage,
    FormatTimePipe
  ],
  templateUrl: './run-public-list.component.html',
  styleUrl: './run-public-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RunPublicListComponent {
  runs: Run[] = [];
  loading: boolean = true;
  expandedRows: any = {};
  isExpanded: boolean = false;
  currentUser: User | null = null; // Stocker les informations utilisateur

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') dt1!: Table;

  constructor(
    private runService: RunService,
    private courseRegistrationService: CourseRegistrationService,
    private authService: AuthService
  ) {
    this.loadRuns();  // Appeler la méthode pour charger les courses au démarrage du composant
  }

  async ngOnInit() {
    try {
      // Charger l'utilisateur actuel
      this.currentUser = await firstValueFrom(this.authService.getCurrentUser());
      this.runs = await firstValueFrom(this.runService.getAllRuns());
      this.loading = false;
    } catch (error) {
      console.error('Error fetching runs or user:', error);
      this.loading = false;
    }
  }

  expandAll() {
    if (!this.isExpanded) {
      this.runs.forEach(run => this.expandedRows[run.runId] = true);
    } else {
      this.expandedRows = {};
    }
    this.isExpanded = !this.isExpanded;
  }

  isRegistered(run: Run): boolean {
    // Vérifier si l'utilisateur est inscrit à la course
    return this.currentUser
      ? run.inscriptions?.some(registration => registration.userId === this.currentUser?.id)
      : false;
  }

  register(run: Run): void {
    this.courseRegistrationService.registerToCourse(run.runId).subscribe(response => {
      console.log('Utilisateur inscrit avec succès!', response);
      this.loadRuns(); // Recharger les courses pour mettre à jour l'état
    });
  }

  unregister(run: Run): void {
    this.courseRegistrationService.unregisterFromCourse(run.runId).subscribe(response => {
      console.log('Utilisateur désinscrit avec succès!', response);
      this.loadRuns(); // Recharger les courses pour mettre à jour l'état
    });
  }

  showParticipants(run: Run): void {
    this.courseRegistrationService.getRegistrationsForRun(run.runId).subscribe(participants => {
      // Afficher la liste des participants
      console.log('Participants inscrits:', participants);
    });
  }

  scrollToTable() {
    const tableElement = document.getElementById('runs-table-public');
    if (tableElement) {
      tableElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }

  async loadRuns(): Promise<void> {
    this.loading = true;
    try {
      this.runs = await firstValueFrom(this.runService.getAllRuns());
      this.loading = false;
    } catch (error) {
      console.error('Erreur lors du chargement des courses', error);
      this.loading = false;
    }
  }
}
