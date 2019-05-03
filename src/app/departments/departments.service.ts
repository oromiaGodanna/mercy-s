import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { Department } from './departmnets.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
  departmentListChanged = new Subject<Department[]>();

  constructor() { }

  private departments: Department[] = [
    new Department("CEO", "First Level",        null, 1, 101),
    new Department("CFO", "Second Level",       101, 1, 102),
    new Department("CMO", "Second Level",       101, 1, 103),
    new Department("CTO", "Second  Level",      101, 1, 104),
    new Department("Management", "Third Level", 102, 1, 105),
    new Department("Financial", "Third Level",  103, 1, 106),
    new Department("Auditors", "Third  Level",  104, 1, 107),

    new Department("A", "First Level", null,  2, 201),
    new Department("B", "Second Level", 201,  2, 202),
    new Department("C", "Second Level", 201,  2, 203),
    new Department("D", "Third Level",  202,  2, 204),
    new Department("E", "Third Level",  203,  2, 205),
    new Department("F", "Forth Level",  204,  2, 206)
  ];

  getDepartments(){
    return this.departments.slice();
  }

  getDepartment(id: number){
    return this.departments.find(department => department.id == id);
  }

  getDepartmentByIndex(index: number){
    return this.departments[index];
  }

  addDepartment(newDepartment: Department){
    this.departments.push(newDepartment);
    this.departmentListChanged.next(this.departments.slice());
  }

  updateDepartment(id:number, newDepartment){
    var index = this.departments.indexOf(this.getDepartment(id));
    this.departments[index] = newDepartment;
    this.departmentListChanged.next(this.departments.slice());
  }

  deleteDepartment(id: number){
    var index = this.departments.indexOf(this.getDepartment(id));
    this.departments.splice(index, 1);
    this.deleteChildrens(id);
    this.departmentListChanged.next(this.departments.slice());
  }

  deleteAllOrganizationDepartments(org_id: number){
    var root = this.departments.find(dept => dept.organization_id == org_id && dept.parent_id == null);
    console.log(root);
    if(root){
      this.deleteDepartment(root.id);
    }
  }

  private deleteChildrens(dept_id: number){
    var childrens: number[] = [];
    this.departments.forEach(dept => {
      if(dept.parent_id != null){
        if (dept.parent_id == dept_id) {
          childrens.push(dept.id);
        }
      } 
      });

    if(childrens.length > 0){
      this.delete(childrens);
    }
  }

  private delete(childs: number[]){
    childs.forEach(id => {
      var index = this.departments.indexOf(this.getDepartment(id));
      this.departments.splice(index, 1);
      this.deleteChildrens(id);
    });
  }

}
