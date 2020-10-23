import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.css'],
})
export class ContactUpdateComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });
  id: number;

  constructor(
    private contactsService: ContactsService,
    private route: ActivatedRoute,
    private routeReturn: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = parseInt(paramMap.get('id'));
      this.contactsService.retrieveContact(this.id).subscribe((contact) => {
        this.contactForm.reset(contact);
      });
    });
  }

  updateContact() {
    this.contactsService
      .updateContact({
        id: this.id,
        ...this.contactForm.value,
      })
      .subscribe((contact) => {
        this.contactForm.reset(contact);
        this.routeReturn.navigate(['/contacts']);
      });
  }
}
