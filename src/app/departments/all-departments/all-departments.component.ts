import { Component, OnInit } from '@angular/core';
import { Department } from '../departmnets.model';
import { DepartmentsService } from '../departments.service';
import { Subscription } from 'rxjs';
import { OrganizationsService } from 'src/app/organizations/organizations.service';
import { Router } from '@angular/router';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-all-departments',
  templateUrl: './all-departments.component.html',
  styleUrls: ['./all-departments.component.css']
})
export class AllDepartmentsComponent implements OnInit {
 
  departments: Department[] = [];
  subscription: Subscription;

  constructor(private departmentService: DepartmentsService, 
              private organizationService: OrganizationsService,
              private router: Router,
              private modalService: NzModalService,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.departments = this.departmentService.getDepartments();
    this.initializeData();

    this.subscription = this.departmentService.departmentListChanged.subscribe(
    (departments: Department[]) => {
      this.departments = departments;
      this.initializeData();
    });

    console.log(this.departments);
  }

  onView(index: number) {
    var dept = this.departmentService.getDepartmentByIndex(index);
    this.router.navigate(['dept-details', dept.id]);

  }
  onEdit(index: number) {
    var dept = this.departmentService.getDepartmentByIndex(index);
    this.router.navigate(['dept-form', dept.id]);

  }
  onDelete(index: number) {
    var dept = this.departmentService.getDepartmentByIndex(index);
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

  private initializeData() {
    this.departments.forEach(dept => {
      dept.organizationName = this.organizationService.getOrganization(dept.organization_id).name;
      if (dept.parent_id != null) {
        dept.parentName = this.departmentService.getDepartment(dept.parent_id).name;
      } else {
        dept.parentName = "None";
      }
    });
  }


}
