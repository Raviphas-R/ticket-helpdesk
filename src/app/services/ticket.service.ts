import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TicketData, Response } from '../interfaces/ticket_interface';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  constructor(private http: HttpClient) {}
  private URL = 'http://127.0.0.1:8000/api/tickets';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllticket() {
    return this.http.get<any>(this.URL);
  }

  createTicket(ticket: TicketData) {
    const body = JSON.stringify(ticket);
    return this.http.post<TicketData>(this.URL, body, this.httpOptions);
  }

  updateTicket(id: any, ticket: any) {
    return this.http.patch<TicketData>(
      `${this.URL}/${id}`,
      JSON.stringify(ticket),
      this.httpOptions
    );
  }
}
