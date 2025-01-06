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
  @ViewChild('filter') filter!: ElementRef;
  @ViewChild('dt1') dt1!: Table;

  constructor(private runService: RunService) {
  }

  async ngOnInit() {
    try {
      this.runs = await firstValueFrom(this.runService.getAllRuns());
      this.loading = false;
    } catch (error) {
      console.error('Error fetching runs:', error);
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

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  isRegistered(run: Run): boolean {
    // Implement your logic to check if the user is registered for the run
    return false;
  }

  register(run: Run) {
    // Implement your logic to register the user for the run
  }

  unregister(run: Run) {
    // Implement your logic to unregister the user from the run
  }

  showParticipants(run: Run) {
    // Implement your logic to show participants for the run
  }

  scrollToTable() {
    const tableElement = document.getElementById('runs-table-public');
    if (tableElement) {
      tableElement.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }
}
