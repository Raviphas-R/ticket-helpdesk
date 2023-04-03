import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';
import { TicketData } from 'src/app/interfaces/ticket_interface';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent {
  myForm: FormGroup;
  tickets: TicketData[];
  filteredData: TicketData[];
  selectedStatus: string = 'Pending';

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<CreateTicketComponent>,
    private fb: FormBuilder
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.ticketService.createTicket(form.value).subscribe();
      this.dialogRef.close({ reload: true });
    }
  }

  getSelectClass(selectOption: string) {
    switch (selectOption) {
      case 'Pending':
        return 'text--yellow';
      case 'Resolved':
        return 'text--green';
      case 'Rejected':
        return 'text--red';
      case 'Accepted':
        return 'text--blue';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }
}
