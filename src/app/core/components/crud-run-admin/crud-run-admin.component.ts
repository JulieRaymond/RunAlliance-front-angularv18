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

  constructor(private messageService: MessageService) {
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
      {field: 'durationMinutes', header: 'Durée (min)'},
    ];

    this.difficultyLevels = [
      {label: 'Facile', value: 'EASY'},
      {label: 'Moyenne', value: 'MEDIUM'},
      {label: 'Difficile', value: 'HARD'},
    ];
  }

  openNew() {
    this.run = {};
    this.submitted = false;
    this.runDialog = true;
  }

  deleteSelectedRuns() {
    this.deleteRunsDialog = true;
  }

  editRun(run: any) {
    this.run = {...run};
    this.runDialog = true;
  }

  deleteRun(run: any) {
    this.deleteRunDialog = true;
    this.run = {...run};
  }

  confirmDeleteSelected() {
    this.deleteRunsDialog = false;
    this.runs = this.runs.filter((val) => !this.selectedRuns.includes(val));
    this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Courses supprimées', life: 3000});
    this.selectedRuns = [];
  }

  confirmDelete() {
    this.deleteRunDialog = false;
    this.runs = this.runs.filter((val) => val.runId !== this.run.runId);
    this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course supprimée', life: 3000});
    this.run = {};
  }

  hideDialog() {
    this.runDialog = false;
    this.submitted = false;
  }

  saveRun() {
    this.submitted = true;

    // Validation des champs
    if (this.run.title?.trim() && this.run.description?.trim() && this.run.date && this.run.time &&
      this.run.location?.trim() && this.run.difficultyLevel && this.run.distanceKm > 0 && this.run.durationMinutes > 0) {

      if (this.run.runId) {
        this.runs[this.findIndexById(this.run.runId)] = this.run;
        this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course mise à jour', life: 3000});
      } else {
        this.run.runId = this.createId();
        this.runs.push(this.run);
        this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course créée', life: 3000});
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

  createId(): number {
    return Math.floor(Math.random() * 10000);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
