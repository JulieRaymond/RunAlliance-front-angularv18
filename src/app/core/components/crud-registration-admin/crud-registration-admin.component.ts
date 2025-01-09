import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {CourseRegistrationDTO} from "../../../shared/models/course-registration-dto.model";
import {CourseRegistrationService} from "../../../shared/services/course-registration.service";
import {MessageService} from "primeng/api";
import {RunService} from "../../../shared/services/run.service";
import {catchError, of} from "rxjs";
import {Run} from "../../../shared/models/run.model";
import {ManageUsersService} from "../../../shared/services/manage-users.service";

@Component({
  selector: 'app-crud-registration-admin',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './crud-registration-admin.component.html',
  styleUrl: './crud-registration-admin.component.scss'
})
export class CrudRegistrationAdminComponent {
  registrations: CourseRegistrationDTO[] = [];
  selectedRegistrations: CourseRegistrationDTO[] = [];
  registrationDialog: boolean = false;
  deleteRegistrationDialog: boolean = false;
  registration: CourseRegistrationDTO = {} as CourseRegistrationDTO;
  runs: Run[] = [];
  users: any[] = []; // Liste des utilisateurs participants
  submitted: boolean = false;

  constructor(
    private registrationService: CourseRegistrationService,
    private messageService: MessageService,
    private runService: RunService,
    private userService: ManageUsersService  // Assurer que ce service existe
  ) {
  }

  ngOnInit() {
    this.loadRegistrations();
    this.loadRuns();
    this.loadUsers();
  }

  loadRegistrations() {
    this.registrationService.getAllRegistrations().pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la récupération des inscriptions.',
          life: 3000
        });
        return of([]);
      })
    ).subscribe(registrations => {
      this.registrations = registrations;
    });
  }

  loadRuns() {
    this.runService.getAllRuns().pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la récupération des courses.',
          life: 3000
        });
        return of([]);
      })
    ).subscribe(runs => {
      this.runs = runs;
    });
  }

  loadUsers() {
    this.userService.getAllUsers().pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la récupération des utilisateurs.',
          life: 3000
        });
        return of([]);
      })
    ).subscribe(users => {
      this.users = users;
    });
  }

  getRunTitleById(runId: number): string {
    const run = this.runs.find(r => r.runId === runId);
    return run ? run.title : 'Non défini';
  }

  getUserEmailById(userId: number): string {
    const user = this.users.find(u => u.id === userId); // Assurez-vous que l'ID est correctement comparé
    return user ? user.email : 'Email non disponible';  // Retourner l'email ou un message par défaut
  }

  openNew() {
    this.registration = {} as CourseRegistrationDTO;
    this.registrationDialog = true;
  }

  editRegistration(registration: CourseRegistrationDTO) {
    this.registration = {...registration};
    this.registrationDialog = true;
  }

  deleteRegistration(registration: CourseRegistrationDTO) {
    this.registration = {...registration};
    this.deleteRegistrationDialog = true;
  }

  confirmDelete() {
    if (this.registration.registrationId) {
      this.registrationService.deleteRegistration(this.registration.registrationId).pipe(
        catchError(error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Échec de la suppression de l\'inscription.',
            life: 3000
          });
          return of(null);
        })
      ).subscribe(() => {
        this.registrations = this.registrations.filter(val => val.registrationId !== this.registration.registrationId);
        this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Inscription supprimée', life: 3000});
        this.registration = {} as CourseRegistrationDTO;
        this.deleteRegistrationDialog = false;
      });
    }
  }

  saveRegistration() {
    this.submitted = true;

    if (this.registration.runId && this.registration.userId) {
      // Utilisation de la fonction pour extraire et convertir runId
      const numberRunId = this.extractRunId(this.registration.runId);

      if (isNaN(numberRunId)) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'L\'identifiant de la course est invalide.',
          life: 3000
        });
        return;
      }

      if (this.registration.registrationId) {
        // Mise à jour d'une inscription
        const updatedRegistrationDto: CourseRegistrationDTO = {
          registrationId: this.registration.registrationId,
          userId: this.registration.userId,
          runId: numberRunId,
        };

        this.registrationService.updateRegistration(this.registration.registrationId, updatedRegistrationDto).pipe(
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de la mise à jour de l\'inscription.',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(updatedRegistration => {
          if (updatedRegistration) {
            const index = this.registrations.findIndex(reg => reg.registrationId === updatedRegistration.registrationId);
            if (index !== -1) {
              this.registrations[index] = updatedRegistration;
            }
            this.messageService.add({
              severity: 'success',
              summary: 'Réussi',
              detail: 'Inscription mise à jour',
              life: 3000
            });
            this.registrationDialog = false;
            this.registration = {} as CourseRegistrationDTO;
          }
        });
      } else {
        // Création d'une nouvelle inscription
        const registrationDto: CourseRegistrationDTO = {
          userId: this.registration.userId,
          runId: numberRunId,
        };

        console.log('Nouvelle inscription : ', registrationDto);

        this.registrationService.createRegistration(registrationDto).pipe(
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de l\'ajout de l\'inscription.',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(newRegistration => {
          if (newRegistration) {
            this.messageService.add({
              severity: 'success',
              summary: 'Réussi',
              detail: 'Inscription ajoutée',
              life: 3000
            });

            // Rafraîchir le tableau après ajout
            this.loadRegistrations();

            this.registrationDialog = false;
            this.registration = {} as CourseRegistrationDTO;
          }
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires.',
        life: 3000
      });
    }
  }

  private extractRunId(runId: any): number {
    // Si runId est un objet avec une propriété runId
    if (typeof runId === 'object' && runId !== null && 'runId' in runId) {
      return Number(runId.runId); // Extraction et conversion en nombre
    }

    // Si runId est déjà un nombre ou une chaîne convertible en nombre
    return Number(runId);
  }

  deleteSelectedRegistrations() {
    const idsToDelete = this.selectedRegistrations.map(reg => reg.registrationId);
    idsToDelete.forEach(id => {
      if (id) {
        this.registrationService.deleteRegistration(id).pipe(
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de la suppression des inscriptions.',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(() => {
          // Retirer les inscriptions supprimées de la liste
          this.registrations = this.registrations.filter(reg => reg.registrationId !== id);
          this.messageService.add({
            severity: 'success',
            summary: 'Réussi',
            detail: 'Inscriptions supprimées',
            life: 3000
          });
          this.selectedRegistrations = [];  // Réinitialiser la sélection
        });
      }
    });
  }

  hideDialog() {
    this.registrationDialog = false;
    this.submitted = false;
  }
}
