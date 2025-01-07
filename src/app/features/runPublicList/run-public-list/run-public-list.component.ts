import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { Table } from 'primeng/table';
import { RunService } from '../../../shared/services/run.service';
import { Run } from '../../../shared/models/run.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { FooterComponent } from '../../../core/components/footer/footer.component';
import { NgOptimizedImage } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { FormatTimePipe } from '../../../shared/pipes/FormatTimePipe';
import { AuthService } from '../../../shared/services/auth.service';
import { CourseRegistrationService } from '../../../shared/services/course-registration.service';
import { Router } from '@angular/router';
import { CourseRegistrationDTO } from '../../../shared/models/course-registration-dto.model';

@Component({
  selector: 'app-run-public-list',
  standalone: true,
  imports: [SharedModule, NavbarComponent, FooterComponent, NgOptimizedImage, FormatTimePipe],
  templateUrl: './run-public-list.component.html',
  styleUrls: ['./run-public-list.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RunPublicListComponent {
  runs: Run[] = [];
  loading: boolean = true;
  expandedRows: any = {};
  isExpanded: boolean = false;
  currentUser: any = null;
  userRegistrations: CourseRegistrationDTO[] = [];

  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') dt1!: Table;

  constructor(
    private runService: RunService,
    private courseRegistrationService: CourseRegistrationService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.loadRuns().then(r => console.log('Runs loaded:', r));
  }

  async ngOnInit() {
    try {
      this.runs = await firstValueFrom(this.runService.getAllRuns());
      this.loading = false;
      await this.loadCurrentUser();
      await this.loadUserRegistrations();
    } catch (error) {
      console.error('Error fetching runs:', error);
      this.loading = false;
    }
  }

  async loadCurrentUser(): Promise<void> {
    if (this.authService.isAuthenticated()) {
      try {
        this.currentUser = await firstValueFrom(this.authService.getCurrentUser());
      } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur:', error);
        this.authService.logout();
      }
    }
  }

  async loadUserRegistrations(): Promise<void> {
    if (this.currentUser) {
      try {
        this.userRegistrations = await firstValueFrom(this.courseRegistrationService.getRegistrationsByUserId(this.currentUser.id));
      } catch (error) {
        console.error('Erreur lors de la récupération des inscriptions de l’utilisateur:', error);
      }
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
    if (!this.currentUser) {
      return false;
    }
    return this.userRegistrations.some(registration => registration.runId === run.runId);
  }

  async register(run: Run): Promise<void> {
    if (!this.authService.isAuthenticated()) {
      await this.router.navigate(['/login']);
      return;
    }
    if (this.isRegistered(run)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Déjà inscrit',
        detail: 'Vous êtes déjà inscrit à cette course.'
      });
      return;
    }
    try {
      await firstValueFrom(this.courseRegistrationService.registerToCourse(run.runId));
      this.messageService.add({
        severity: 'success',
        summary: 'Inscription réussie',
        detail: 'Bravo, vous êtes inscrit à la course!'
      });
      await this.loadRuns();
      await this.loadUserRegistrations();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors de l\'inscription.'
      });
    }
  }

  async unregister(run: Run): Promise<void> {
    try {
      await firstValueFrom(this.courseRegistrationService.unregisterFromCourse(run.runId));
      this.messageService.add({
        severity: 'success',
        summary: 'Désinscription réussie',
        detail: 'Vous avez été désinscrit de la course.'
      });
      await this.loadRuns();
      await this.loadUserRegistrations();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Une erreur est survenue lors de la désinscription.'
      });
    }
  }

  showParticipants(run: Run): void {
    this.courseRegistrationService.getRegistrationsForRun(run.runId).subscribe(participants => {
      console.log('Participants inscrits:', participants);
    });
  }

  scrollToTable() {
    const tableElement = document.getElementById('runs-table-public');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
