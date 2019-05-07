import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router, ChildrenOutletContexts } from '@angular/router';
import { Department } from '../departmnets.model';
import { DepartmentsService } from '../departments.service';
import { OrganizationsService } from 'src/app/organizations/organizations.service';
import { Organization } from 'src/app/organizations/organizations.model';
import { Subscription } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-departments-form',
  templateUrl: './departments-form.component.html',
  styleUrls: ['./departments-form.component.css']
})
export class DepartmentsFormComponent implements OnInit {

  departmentForm: FormGroup;
  editMode = false;
  id: number;
  name: string;
  organizations: Organization[];
  departments: Department[];
  subscription: Subscription;
  departmnetOptions: Department[];
  selectedValue: number;

  constructor(private departmentService: DepartmentsService,
    private organizationService: OrganizationsService,
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
    if (this.editMode) {
      this.setDepartmnetOptions();
      this.filterDepartmentOptions();
    }
  }

  onBack(){
    this.router.navigate(['departments']);
  }

  onSubmit() {
    var parent_id = this.departmentForm.value['parentDept'];
    if (parent_id == "0") {
      parent_id = null;
    }
    const newDepartment = new Department(
      this.departmentForm.value['deptName'],
      this.departmentForm.value['deptDesc'],
      parent_id,
      this.selectedValue
    );

    if (this.editMode) {
      newDepartment.id = this.id;
      this.departmentService.updateDepartment(this.id, newDepartment);
      this.notification.create(
        'success',
        'Department successfully Updated',
        'Department Updated with the new Information provided'
      );
    } else {
      this.departmentService.addDepartment(newDepartment);
      this.notification.create(
        'success',
        'Department successfully Added',
        'New Department Added.'
      );
    }
    this.router.navigate(['departments', this.selectedValue]);
  }

  onClear() {
    this.departmentForm.reset();
  }
  onCancel() {
    this.router.navigate(['departments']);
  }

  getDepartmentsName() {
    var names = [];
    this.departments.forEach(dept => {
      names.push(dept.name);
    });
    return names;
  }

  organizationSelected(selectedValue) {
    this.selectedValue = selectedValue;
    this.setDepartmnetOptions();
  }

  private initForm() {
    let deptName = '';
    let deptDesc = '';
    let parentDept: number;
    let deptOrg: number;

    if (this.editMode) {
      const department = this.departmentService.getDepartment(this.id);
      this.name = department.name;
      deptName = department.name;
      deptDesc = department.description;
      if (department.parent_id == null) {
        parentDept = 0;
      } else {
        parentDept = this.departmentService.getDepartment(department.parent_id).id;
      }
      deptOrg = this.organizationService.getOrganization(department.organization_id).id;
      this.selectedValue = deptOrg;
    }

    this.departmentForm = new FormGroup(
      {
        'deptName': new FormControl(deptName, Validators.required),
        "deptDesc": new FormControl(deptDesc, Validators.required),
        "parentDept": new FormControl(parentDept, Validators.required),
        "deptOrg": new FormControl({ value: deptOrg, disabled: this.editMode }, Validators.required),
      });
  }


  private setDepartmnetOptions() {
    var options = [];
    this.departments.forEach(dept => {
      //filter out departments in the same organization
      if (dept.organization_id == this.selectedValue) {
        options.push(dept);
      }
    });
    this.departmnetOptions = options;
  }

  filterDepartmentOptions(){
    var index = this.departmnetOptions.indexOf(this.departmentService.getDepartment(this.id));
    this.departmnetOptions.splice(index, 1)
    this.deleteChildren(this.id);
  }

  private deleteChildren(id: number){
    var children: number[] = [];
    this.departmnetOptions.forEach(dept => {
      if(dept.parent_id == id){
        children.push(dept.id);
      }
    });
    if(children.length > 0){
      this.delete(children);
    }
  }

  delete(childs: number[]){
    childs.forEach(id => {
      var index = this.departmnetOptions.indexOf(this.departmentService.getDepartment(id));
      this.departmnetOptions.splice(index, 1);
      this.deleteChildren(id);
    })
  }
}