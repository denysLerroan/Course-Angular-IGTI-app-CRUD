import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  constructor(private contactService: ContactsService) {}

  ngOnInit(): void {
    this.contactService.listContact().subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact.id).subscribe(() => {
      const index = this.contacts.indexOf(contact);
      this.contacts.splice(index, 1);
    });
  }
}
