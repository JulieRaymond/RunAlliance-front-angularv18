import {Component, ElementRef, ViewChild} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
import {Table} from "primeng/table";
import {RunService} from "../../../shared/services/run.service";
import {Run} from "../../../shared/models/run.model";
import {ConfirmationService, MessageService} from "primeng/api";
import {NavbarComponent} from "../../../core/components/navbar/navbar.component";
import {FooterComponent} from "../../../core/components/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-run-public-list',
  standalone: true,
  imports: [
    SharedModule,
    NavbarComponent,
    FooterComponent,
    NgOptimizedImage
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

  //
  // async ngOnInit() {
  //   try {
  //     this.runs = await this.runService.getRunsAsync();
  //     this.loading = false;
  //   } catch (error) {
  //     console.error('Error fetching runs:', error);
  //     this.loading = false;
  //   }
  // }

  async ngOnInit() {
    try {
      // Ajoutez des données de test
      this.runs = [
        {
          runId: 1,
          title: 'Course 1',
          description: 'Description de la course 1',
          date: new Date('2023-12-01'),
          time: new Date('2023-12-01T09:00:00'),
          location: 'Paris',
          difficultyLevel: 'Moyen',
          distanceKm: 10,
          durationMinutes: 60,
          inscriptions: []
        },
        {
          runId: 2,
          title: 'Course 2',
          description: 'Description de la course 2',
          date: new Date('2023-12-02'),
          time: new Date('2023-12-02T10:00:00'),
          location: 'Lyon',
          difficultyLevel: 'Difficile',
          distanceKm: 15,
          durationMinutes: 90,
          inscriptions: []
        }
      ];
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
