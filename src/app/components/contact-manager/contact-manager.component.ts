import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/model/IContact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrls: ['./contact-manager.component.css']
})
export class ContactManagerComponent implements OnInit {

  public loading:boolean = false;
  public contacts: IContact[] = [];
  public errorMessage: string | null = null;

  constructor(
    private contactService:ContactService
  ) { 
    //
  }

  ngOnInit(): void {
    this.getAllContactDetails();
  }

  getAllContactDetails(){
    this.loading = true;
    this.contactService.getAllContacts().subscribe((data: IContact[])=>{
      this.contacts = data;
      this.loading = false;
    }, (error) => {
      this.errorMessage = error;
      this.loading = false;
    })
  }

  clickDeleteContact(contactId: any){
    if(contactId){
      this.contactService.deleteContact(contactId).subscribe((data:[]) => {
        this.getAllContactDetails();
      }, (error) => {
        this.errorMessage = error;
      })
    }
  }
}
