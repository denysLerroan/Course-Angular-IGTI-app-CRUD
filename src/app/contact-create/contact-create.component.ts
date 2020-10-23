import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  styleUrls: ['./contact-create.component.css'],
})
export class ContactCreateComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    private contactsService: ContactsService,
    private route: Router
  ) {}

  createContact(): void {
    const newContact = this.contactForm.value;
    this.contactsService.createContact(newContact).subscribe((contact) => {
      this.route.navigate(['/contacts']);
    });
  }
}
