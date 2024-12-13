import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {Table} from "primeng/table";
import {MessageService} from "primeng/api";
import {CalendarModule} from "primeng/calendar";
import {InputMaskModule} from "primeng/inputmask";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [SharedModule, CalendarModule, InputMaskModule, RouterOutlet],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss',
  providers: [MessageService]
})
export class DashboardAdminComponent {
  //
  // runDialog: boolean = false;
  // deleteRunDialog: boolean = false;
  // deleteRunsDialog: boolean = false;
  //
  // runs: any[] = [];
  // run: any = {};
  // selectedRuns: any[] = [];
  // submitted: boolean = false;
  // cols: any[] = [];
  // difficultyLevels: any[] = [];
  // rowsPerPageOptions = [5, 10, 20];
  //
  // constructor(private messageService: MessageService) {
  // }
  //
  // ngOnInit() {
  //   this.cols = [
  //     {field: 'title', header: 'Titre'},
  //     {field: 'date', header: 'Date'},
  //     {field: 'description', header: 'Description'},
  //     {field: 'time', header: 'Heure'},
  //     {field: 'location', header: 'Lieu'},
  //     {field: 'difficultyLevel', header: 'Difficulté'},
  //     {field: 'distanceKm', header: 'Distance (km)'},
  //     {field: 'durationMinutes', header: 'Durée (min)'},
  //   ];
  //
  //   this.difficultyLevels = [
  //     {label: 'Facile', value: 'EASY'},
  //     {label: 'Moyenne', value: 'MEDIUM'},
  //     {label: 'Difficile', value: 'HARD'},
  //   ];
  // }
  //
  // openNew() {
  //   this.run = {};
  //   this.submitted = false;
  //   this.runDialog = true;
  // }
  //
  // deleteSelectedRuns() {
  //   this.deleteRunsDialog = true;
  // }
  //
  // editRun(run: any) {
  //   this.run = {...run};
  //   this.runDialog = true;
  // }
  //
  // deleteRun(run: any) {
  //   this.deleteRunDialog = true;
  //   this.run = {...run};
  // }
  //
  // confirmDeleteSelected() {
  //   this.deleteRunsDialog = false;
  //   this.runs = this.runs.filter((val) => !this.selectedRuns.includes(val));
  //   this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Courses supprimées', life: 3000});
  //   this.selectedRuns = [];
  // }
  //
  // confirmDelete() {
  //   this.deleteRunDialog = false;
  //   this.runs = this.runs.filter((val) => val.runId !== this.run.runId);
  //   this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course supprimée', life: 3000});
  //   this.run = {};
  // }
  //
  // hideDialog() {
  //   this.runDialog = false;
  //   this.submitted = false;
  // }
  //
  // saveRun() {
  //   this.submitted = true;
  //
  //   if (this.run.title?.trim()) {
  //     if (this.run.runId) {
  //       this.runs[this.findIndexById(this.run.runId)] = this.run;
  //       this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course mise à jour', life: 3000});
  //     } else {
  //       this.run.runId = this.createId();
  //       this.runs.push(this.run);
  //       this.messageService.add({severity: 'success', summary: 'Réussi', detail: 'Course créée', life: 3000});
  //     }
  //
  //     this.runs = [...this.runs];
  //     this.runDialog = false;
  //     this.run = {};
  //   }
  // }
  //
  // findIndexById(id: number): number {
  //   return this.runs.findIndex((run) => run.runId === id);
  // }
  //
  // createId(): number {
  //   return Math.floor(Math.random() * 10000);
  // }
  //
  // onGlobalFilter(table: Table, event: Event) {
  //   table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  // }
}
