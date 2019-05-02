import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Organization } from '../organizations.model';
import { OrganizationsService } from '../organizations.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-organizations-detail',
  templateUrl: './organizations-detail.component.html',
  styleUrls: ['./organizations-detail.component.css']
})
export class OrganizationsDetailComponent implements OnInit {
  organization: Organization;
  id: number;

  constructor(private organizationService: OrganizationsService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NzModalService,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.organization = this.organizationService.getOrganization(this.id);
      });
  }

  onEdit() {
    this.router.navigate(['org-form', this.id]);
  }

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Are you sure You want to delete ' + this.organization.name,
      nzContent: ' <p style="color: red;">Deleting this organiztion will result in the deletion of all departments under it!!!!</p>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.organizationService.deleteOrganization(this.organization.id);
        this.notification.create(
          'success',
          'Organization successfully Deleted',
          'All information of this organiztion and as well as all deparartments under this organization were deleted.'
        );
        this.router.navigate(['organizations']);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });

  }

  onViewDepartments() {
  }

}
