import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { OrganizationsService } from '../organizations.service';
import { Organization } from '../organizations.model';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-organizations-form',
  templateUrl: './organizations-form.component.html',
  styleUrls: ['./organizations-form.component.css']
})
export class OrganizationsFormComponent implements OnInit {
  
  editMode = false;
  id: number;
  organization: Organization;
  organizationForm: FormGroup;

  constructor(private organizationService: OrganizationsService,
              private route: ActivatedRoute,
              private router: Router,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });
  }

  onSubmit() {
    const newOrganization = new Organization(
      this.organizationForm.value['orgName'],
      this.organizationForm.value['orgDesc'],
    );
    if (this.editMode) {
      this.organizationService.updateOrganization(this.id, newOrganization);
      this.notification.create(
        'success',
        'Organization successfully Updated',
        'Organization Updated with the new Information provided'
      );

    }else {
      this.organizationService.addOrganization(newOrganization);
      this.notification.create(
        'success',
        'Organization successfully Added',
        'New organanization Added to the List of organizations'
      );
    }
    this.router.navigate(["organizations"]);
  }

  onClear() {
    this.organizationForm.reset();
  }
  onCancel() {
    
    this.router.navigate(["organizations"]);
  }

  private initForm() {
    let orgName = '';
    let orgDesc = '';

    if (this.editMode) {
     this.organization = this.organizationService.getOrganization(this.id);
      orgName = this.organization.name;
      orgDesc = this.organization.description;
    }

    this.organizationForm = new FormGroup({
      "orgName": new FormControl(orgName, Validators.required),
      "orgDesc": new FormControl(orgDesc, Validators.required)
    });
  }


}
