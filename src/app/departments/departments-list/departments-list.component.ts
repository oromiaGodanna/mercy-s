import { Component, OnInit } from '@angular/core';
import { Department } from '../departmnets.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DepartmentsService } from '../departments.service';
import { OrganizationsService } from 'src/app/organizations/organizations.service';
import { Organization } from 'src/app/organizations/organizations.model';
import { Subscription } from 'rxjs';
import { NzFormatEmitEvent, NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.css']
})
export class DepartmentsListComponent implements OnInit {
  switchMode = true;
  organization_id: number;
  organization: Organization;
  departments: Department[];
  organizationDepartments: Department[];
  subscription: Subscription;
  nodes;
  empty = false;
  
  constructor(private departmentService: DepartmentsService,
              private organizationService: OrganizationsService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NzModalService,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(
        (params: Params) => {
        this.organization_id = params['org_id'];
        this.organization = this.organizationService.getOrganization(this.organization_id);
        this.departments = this.departmentService.getDepartments();
        this.organizationDepartments = this.getOrganizatonDepartments(this.organization_id);   
        this.setNodes();
      });

    this.subscription = this.departmentService.departmentListChanged.subscribe(
      (departments: Department[]) => {
        this.departments = departments;
        this.organizationDepartments = this.getOrganizatonDepartments(this.organization_id);
        this.setNodes();
      });
      
}

 onAddDepartment() {
    this.router.navigate(['dept-form']);
  }

  onView(id: number) {
    this.router.navigate(['dept-details', id]);

  }
  onEdit(id: number) {
    this.router.navigate(['dept-form', id]);

  }

  onDelete(id: number) {
    var dept = this.departmentService.getDepartment(id);
    this.modalService.confirm({
      nzTitle: 'Are you sure You want to delete ' + dept.name + " Department",
      nzContent: ' <p style="color: red;">Deleting this Department will result in the deletion of all departments under its supervision!!!!</p>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.departmentService.deleteDepartment(dept.id);
        this.notification.create(
          'success',
          'Department successfully Deleted',
          'All information of this Departments and as well as all deparartments under the departments supervison were also deleted.'
        );
      }
      ,
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  
  nzClick($event: NzFormatEmitEvent) {
   console.log(event);
  }

 private getOrganizatonDepartments(org_id: number){
    var departments: Department[] = [];
    this.departments.forEach(dept => {
      if (dept.organization_id == org_id) {
        if(dept.parent_id == null){
          dept.parentName = "None";
        }else{
          dept.parentName = this.departmentService.getDepartment(dept.parent_id).name;
        }
        dept.organizationName = this.organization.name;
        departments.push(dept);
      }
    });
    return departments;
}

private setNodes(){
  this.nodes = [];
  if(this.organizationDepartments.length >= 1){
    this.organizationDepartments.forEach(root => {
      if(root.parent_id == null){
        this.map(root);
      }
    });
  }else {
    this.empty = true;
  }
}

  private getChildren(parent: number) {
    var children = [];
    this.organizationDepartments.forEach(dept => {
      if(dept.parent_id == parent ){
        children.push(
          {
            title: dept.name,
           
            expanded: true,
            children: this.getChildren(dept.id),
            isLeaf: (this.getChildren(dept.id).length < 1) ? true : false
          }
        );
      }
    });
    return children;

  }

  //maps each departemnts title, and childrens 
  private map(department: Department) {
    var childrens = this.getChildren(department.id);
    this.nodes.push(
      {
        title: department.name,
       
        expanded: true,
        children: childrens,
        isLeaf: (childrens.length < 1) ? true : false
      }
    );

  }
}
