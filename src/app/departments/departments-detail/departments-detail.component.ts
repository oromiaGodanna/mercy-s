import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Department } from '../departmnets.model';
import { DepartmentsService } from '../departments.service';
import { OrganizationsService } from 'src/app/organizations/organizations.service';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.department = this.departmentService.getDepartment(this.id);
        this.initializeData() 
      });
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
