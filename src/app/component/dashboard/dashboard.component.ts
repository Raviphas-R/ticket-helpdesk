import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';
import { EditTicketComponent } from '../edit-ticket/edit-ticket.component';
import { TicketService } from '../../services/ticket.service';
import { TicketData } from '../../interfaces/ticket_interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChildren('sorted') sortedEl: QueryList<ElementRef>;

  constructor(private ticketService: TicketService, public dialog: MatDialog) {}
  tickets: TicketData[];
  filteredData: TicketData[];
  ticketBeforeSorted: TicketData[];
  selectedStatus: string = '';
  filtered: Boolean = false;
  sorted: Boolean = false;

  filterTickets(selectedStatus: string): void {
    this.ticketBeforeSorted = undefined; ///
    this.clearSortAcitve();
    if (selectedStatus === '') {
      this.filteredData = [...this.tickets];
      return;
    }
    this.filteredData = this.tickets.filter((ticket) => {
      const status = ticket.status;
      return status.includes(selectedStatus);
    });
    this.filtered = true;
  }

  sortTickets(key: string, event: Event) {
    this.sorted = true;
    if (!this.ticketBeforeSorted) {
      this.ticketBeforeSorted = [...this.filteredData];
    }

    this.filteredData.sort((a, b) => {
      const x = a[key];
      const y = b[key];
      if (x === undefined) {
        return 1;
      }
      if (y === undefined) {
        return -1;
      }
      return x > y ? -1 : x < y ? 1 : 0;
    });

    const eventEl = event.target as HTMLElement;
    if (eventEl.classList.contains('active')) {
      this.filteredData = this.filtered
        ? [...this.ticketBeforeSorted]
        : [...this.tickets];
      eventEl.classList.remove('active');
      this.sorted = false;
    } else {
      this.clearSortAcitve();
      eventEl.classList.add('active');
    }
  }

  /// Finish
  clearFilter() {
    this.clearSortAcitve();
    this.sorted = false;
    this.filtered = false;
    this.selectedStatus = '';
    this.filteredData = [...this.tickets];
  }

  openEditTicketDialog(ticket: TicketData) {
    const data = { ...ticket };
    data.createAt = new Date(data.createAt);
    data.updateAt = data.updateAt ? new Date(data.updateAt) : undefined;
    const dialogRef = this.dialog.open(EditTicketComponent, {
      width: '800px',
      data,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
      this.clearSortAcitve();
    });
  }

  openCreateTicketDialog() {
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      width: '800px',
      data: '',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadData();
      this.clearSortAcitve();
    });
  }

  clearSortAcitve() {
    this.sortedEl.forEach((el) => el.nativeElement.classList.remove('active'));
  }

  loadData() {
    this.ticketService.getAllticket().subscribe((response) => {
      this.tickets = response.data;
      this.filteredData = [...this.tickets];
    });
  }

  ngOnInit() {
    this.loadData();
  }
}
