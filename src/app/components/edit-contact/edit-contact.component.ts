import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IContact } from 'src/app/model/IContact';
import { IGroup } from 'src/app/model/IGroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  public loading:boolean = false;
  public contactId: string | null = null;
  public contact: IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private contactService: ContactService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.paramMap.subscribe((param) => {
      this.contactId = param.get('contactId');
    });

    if(this.contactId){
      this.contactService.getContact(this.contactId).subscribe((data: IContact) => {

        this.contact = data;
        
        this.contactService.getAllGroups().subscribe((gpData: IGroup[]) => {
          this.groups = gpData;
        });

        this.loading = false;

      }, (error) => {
        this.errorMessage;
        this.loading = false;
      })
    }
  }

  submitUpdate(){

    if(this.contactId){
        //console.log(this.contact);
        this.contactService.updateContact(this.contact, this.contactId).subscribe((data:IContact) => {
          //console.log(data);
          this.router.navigate(['/']).then();
        }, (error) => {
          this.errorMessage = error;
          //console.log(error);
          //this.router.navigate(['/contacts/add']).then();
        })
    }
      
  }

}
