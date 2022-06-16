import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IContact } from 'src/app/model/IContact';
import { IGroup } from 'src/app/model/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public loading:boolean = false;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.contactService.getAllGroups().subscribe((data: IGroup[]) => {
      this.groups = data;
    }, (error)=> {
      this.errorMessage = error;
    })
  }

  formSubmit(){
    //console.log(this.contact);
    this.contactService.createContact(this.contact).subscribe((data:IContact) => {
      //console.log(data);
      this.router.navigate(['/']).then();
    }, (error) => {
      this.errorMessage = error;
      //console.log(error);
      //this.router.navigate(['/contacts/add']).then();
    })
  }

}
