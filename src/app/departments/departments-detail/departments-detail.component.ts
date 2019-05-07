import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Department } from '../departmnets.model';
import { DepartmentsService } from '../departments.service';
import { OrganizationsService } from 'src/app/organizations/organizations.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-departments-detail',
  templateUrl: './departments-detail.component.html',
  styleUrls: ['./departments-detail.component.css']
})
export class DepartmentsDetailComponent implements OnInit {

  id:number;
  department: Department;
  constructor(private departmentService: DepartmentsService,
              private organizationService: OrganizationsService,
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NzModalService,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.department = this.departmentService.getDepartment(this.id);
        this.initializeData() 
      });
  }

  onBack(){
    this.router.navigate(['departments', this.department.organization_id]);
  }

  onEdit() {
   this.router.navigate(['dept-form', this.id]);
  }

  onDelete() {
    this.modalService.confirm({
      nzTitle: 'Are you sure You want to delete ' + this.department.name + " Department",
      nzContent: ' <p style="color: red;">Deleting this Department will result in the deletion of all departments under its supervision!!!!</p>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.departmentService.deleteDepartment(this.id);
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
    this.router.navigate(['departments', this.department.organization_id]);
  }
  
  private initializeData() {
    this.department.organizationName = this.organizationService.getOrganization(this.department.organization_id).name;
      if (this.department.parent_id != null) {
        this.department.parentName = this.departmentService.getDepartment(this.department.parent_id).name;
      } else {
        this.department.parentName = "None";
      }
  }
  
}
