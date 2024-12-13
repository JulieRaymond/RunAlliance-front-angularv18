import {Component} from '@angular/core';
import {SharedModule} from "../../../shared/shared.module";
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

}
