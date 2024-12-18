import {Component} from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {CalendarModule} from "primeng/calendar";
import {DatePipe, NgClass, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {MessageService, PrimeTemplate} from "primeng/api";
import {Ripple} from "primeng/ripple";
import {Table, TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {RunService} from "../../../shared/services/run.service";
import {catchError, of} from "rxjs";

@Component({
  selector: 'app-crud-run-admin',
  standalone: true,
  imports: [
    ButtonDirective,
    CalendarModule,
    DatePipe,
    DialogModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    NgIf,
    PaginatorModule,
    PrimeTemplate,
    Ripple,
    TableModule,
    ToastModule,
    ToolbarModule,
    NgClass
  ],
  templateUrl: './crud-run-admin.component.html',
  styleUrl: './crud-run-admin.component.scss'
})
export class CrudRunAdminComponent {
  runDialog: boolean = false;
  deleteRunDialog: boolean = false;
  deleteRunsDialog: boolean = false;
  runs: any[] = [];
  run: any = {};
  selectedRuns: any[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  difficultyLevels: any[] = [];
  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private messageService: MessageService,
    private runService: RunService,
  ) {
  }

  ngOnInit() {
    this.cols = [
      {field: 'title', header: 'Titre'},
      {field: 'date', header: 'Date'},
      {field: 'description', header: 'Description'},
      {field: 'time', header: 'Heure'},
      {field: 'location', header: 'Lieu'},
      {field: 'difficultyLevel', header: 'Difficulté'},
      {field: 'distanceKm', header: 'Distance (km)'},
      {field: 'durationMinutes', header: 'Durée (min)'}
    ];

    this.difficultyLevels = [
      {label: 'DEBUTANT', value: 'DEBUTANT'},
      {label: 'INTERMEDIAIRE', value: 'INTERMEDIAIRE'},
      {label: 'AVANCE', value: 'AVANCE'}
    ];

    this.loadRuns(); // Charger les courses au démarrage du composant
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
        return of([]); // Retourner un tableau vide en cas d'erreur
      })
    ).subscribe(runs => {
      this.runs = runs;
    });
  }

  openNew() {
    this.run = {};  // Réinitialiser l'objet `run`
    this.submitted = false;  // Réinitialiser la validation
    this.runDialog = true;
  }

  deleteSelectedRuns() {
    this.deleteRunsDialog = true;
  }

  editRun(run: any) {
    this.run = {...run};  // Copier les données de la course
    this.runDialog = true;
  }

  deleteRun(run: any) {
    this.deleteRunDialog = true;
    this.run = {...run};
  }

  confirmDeleteSelected() {
    this.deleteRunsDialog = false;
    this.runService.deleteRuns(this.selectedRuns).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la suppression des courses sélectionnées.',
          life: 3000
        });
        return of(null);
      })
    ).subscribe(() => {
      this.runs = this.runs.filter(val => !this.selectedRuns.includes(val));
      this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Courses supprimées', life: 3000});
      this.selectedRuns = [];
    });
  }

  confirmDelete() {
    this.deleteRunDialog = false;
    this.runService.deleteRun(this.run.runId).pipe(
      catchError(error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la suppression de la course.',
          life: 3000
        });
        return of(null);
      })
    ).subscribe(() => {
      this.runs = this.runs.filter(val => val.runId !== this.run.runId);
      this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course supprimée', life: 3000});
      this.run = {};
    });
  }

  hideDialog() {
    this.runDialog = false;
    this.submitted = false;
  }

  saveRun() {
    this.submitted = true;

    if (this.run.title?.trim() && this.run.description?.trim() && this.run.date && this.run.time &&
      this.run.location?.trim() && this.run.difficultyLevel && this.run.distanceKm > 0 && this.run.durationMinutes > 0) {

      if (this.run.runId) {
        this.runService.updateRun(this.run).pipe(
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de la mise à jour de la course.',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(updatedRun => {
          const index = this.findIndexById(updatedRun.runId);
          this.runs[index] = updatedRun;
          this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course mise à jour', life: 3000});
        });
      } else {
        this.runService.createRun(this.run).pipe(
          catchError(error => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: 'Échec de la création de la course.',
              life: 3000
            });
            return of(null);
          })
        ).subscribe(newRun => {
          this.runs.push(newRun);
          this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course créée', life: 3000});
        });
      }

      this.runs = [...this.runs];
      this.runDialog = false;
      this.run = {};
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires.',
        life: 3000
      });
    }
  }

  findIndexById(id: number): number {
    return this.runs.findIndex((run) => run.runId === id);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
