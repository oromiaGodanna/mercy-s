import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Department } from '../departmnets.model';
import { DepartmentsService } from '../departments.service';
import { OrganizationsService } from 'src/app/organizations/organizations.service';
import { Organization } from 'src/app/organizations/organizations.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-departments-form',
  templateUrl: './departments-form.component.html',
  styleUrls: ['./departments-form.component.css']
})
export class DepartmentsFormComponent implements OnInit {

  departmentForm: FormGroup;
  editMode = false;
  id: number;
  organizations: Organization[];
  departments: Department[];
  subscription: Subscription;


  constructor(private departmentService: DepartmentsService,
              private organizationService: OrganizationsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      });

      this.organizations = this.organizationService.getOrganizations();
      this.departments = this.departmentService.getDepartments();
      this.subscription = this.departmentService.departmentListChanged.subscribe(
        (departments: Department[]) => {
          this.departments = departments;
        });

      this.subscription = this.organizationService.organizationListChanged.subscribe(
      (organizations: Organization[]) => {
        this.organizations = organizations;
      });
  }

  onSubmit() {
    var org_id = this.departmentForm.value['deptOrg'];
    var parent_id = this.departmentForm.value['parentDept'];
    if(parent_id == "null") {
      parent_id = null;
    }

    
    const newDepartment = new Department(
      this.departmentForm.value['deptName'],
      this.departmentForm.value['deptDesc'],
      parent_id,
      org_id
    
    );
    console.log(newDepartment);
    if (this.editMode) {
      this.departmentService.updateDepartment(this.id, newDepartment);
    } else {
      this.departmentService.addDepartment(newDepartment);
    }
    this.router.navigate(['departments', org_id ]);
  }

  onClear() {
    this.departmentForm.reset();
  }
  onCancel() {
    this.router.navigate(['departments', this.id]);
  }
 
  getDepartmentsName(){
    var names = [];
    this.departments.forEach(dept => {
      names.push(dept.name);
    });
   return names;
  }

 

  private initForm() {
    let deptName = '';
    let deptDesc = '';
    let parentDept ;
    let deptOrg ;

    if (this.editMode) {
      const department = this.departmentService.getDepartment(this.id);
      deptName = department.name;
      deptDesc = department.description;
      if(department.parent_id == null){
        parentDept = "None";
      }else{
        parentDept = this.departmentService.getDepartment(department.parent_id).id;
      }
        deptOrg = this.organizationService.getOrganization(department.organization_id).id;
    }

    this.departmentForm = new FormGroup(
      {
        'deptName': new FormControl(deptName, Validators.required),
        "deptDesc": new FormControl(deptDesc, Validators.required),
        "parentDept": new FormControl(parentDept, Validators.required),
        "deptOrg": new FormControl(deptOrg, Validators.required),
      });
  }

}
