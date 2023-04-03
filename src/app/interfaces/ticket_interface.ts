export interface TicketData {
  title: String;
  description: String;
  contactInfo: String;
  createAt: Date;
  updateAt: Date;
  slug: String;
  status: String;
}

export interface Response {
  status: String;
  data: TicketData[];
}
