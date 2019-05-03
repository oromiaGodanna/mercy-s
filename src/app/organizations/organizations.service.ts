import { Injectable } from '@angular/core';
import { Organization } from './organizations.model';
import { Subject } from 'rxjs';
import { DepartmentsService } from '../departments/departments.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  organizationListChanged = new Subject<Organization[]>();

  private orgnizations: Organization[] = [
    new Organization("Organization1", "Organization 1", 1),
    new Organization("Organization2", "Organization 2", 2),
    new Organization("Organization3", "Organization 3", 3),
    new Organization("Organization4", "Organization 4", 4),
    new Organization("Organization5", "Organization 5", 5),
  ];

  constructor(private departmentService: DepartmentsService) { }


  getOrganizations(){
    return this.orgnizations.slice();
  }

  getOrganization(id: number){
    return this.orgnizations.find(organization => organization.id == id);
  }
  
  getOrganizationByIndex(index: number) {
    return this.orgnizations[index];
  }

  addOrganization(newOrganization: Organization){
    this.orgnizations.push(newOrganization);
    this.organizationListChanged.next(this.orgnizations.slice());
  }

  updateOrganization(id: number, newOrganization: Organization){
    var index = this.orgnizations.indexOf(this.getOrganization(id));
    this.orgnizations[index] = newOrganization;
    this.organizationListChanged.next(this.orgnizations.slice());
  }

  deleteOrganization(id: number){
    var index = this.orgnizations.indexOf(this.getOrganization(id));
    this.orgnizations.splice(index, 1);
    this.departmentService.deleteAllOrganizationDepartments(id);
    this.organizationListChanged.next(this.orgnizations.slice());
  }
}
