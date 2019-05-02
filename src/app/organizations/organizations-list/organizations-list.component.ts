import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { Organization } from '../organizations.model';
import { OrganizationsService } from '../organizations.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.css']
})
export class OrganizationsListComponent implements OnInit {

  organizations: Organization[];
  subscription: Subscription;

  constructor(private organizationService: OrganizationsService,
              private router: Router,
              private modalService: NzModalService,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.organizations = this.organizationService.getOrganizations();
   
    this.subscription = this.organizationService.organizationListChanged.subscribe(
      (organiztions: Organization[]) => {
        this.organizations = organiztions;
      }); 
  }

  onAddOrganization() {
    this.router.navigate(['org-form']);
  }

  onView(index: number) {
    var org = this.organizationService.getOrganizationByIndex(index);
    this.router.navigate(['org-details', org.id]);

  }
  onEdit(index: number) {
    var org = this.organizationService.getOrganizationByIndex(index);
    this.router.navigate(['org-form', org.id]);

  }
  onDelete(index: number) {
     var org = this.organizationService.getOrganizationByIndex(index);
    this.modalService.confirm({
      nzTitle: 'Are you sure You want to delete ' + org.name,
      nzContent: ' <p style="color: red;">Deleting this organiztion will result in the deletion of all departments under it!!!!</p>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.organizationService.deleteOrganization(org.id);
        this.notification.create(
          'success',
          'Organization successfully Deleted',
          'All information of this organiztion and as well as all deparartments under this organization were deleted.'
        );}
        ,
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
   
    
  }

}
