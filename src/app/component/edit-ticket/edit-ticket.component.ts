import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TicketService } from 'src/app/services/ticket.service';
import { TicketData } from 'src/app/interfaces/ticket_interface';

@Component({
  selector: 'app-edit-ticket',
  templateUrl: './edit-ticket.component.html',
  styleUrls: ['./edit-ticket.component.css'],
})
export class EditTicketComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<EditTicketComponent>,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  getSelectClass() {
    switch (this.data.status) {
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.data.updateAt = new Date(Date.now());
    this.dialogRef.close(this.data);
    this.ticketService.updateTicket(this.data._id, this.data).subscribe();
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }
}
