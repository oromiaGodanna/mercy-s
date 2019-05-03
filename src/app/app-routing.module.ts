import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from "./organizations/organizations.component";
import { OrganizationsFormComponent } from './organizations/organizations-form/organizations-form.component';
import { OrganizationsDetailComponent } from './organizations/organizations-detail/organizations-detail.component';
import { AllDepartmentsComponent } from './departments/all-departments/all-departments.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { DepartmentsDetailComponent } from './departments/departments-detail/departments-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo:'/organizations', pathMatch: 'full'},
    { path: "organizations", component: OrganizationsComponent},
    { path: "org-form", component: OrganizationsFormComponent },
    { path: "org-form/:id", component: OrganizationsFormComponent},
    { path: "org-details/:id", component: OrganizationsDetailComponent}, 
    { path: "departments", component: AllDepartmentsComponent},
    { path: "departments/:org_id", component: DepartmentsComponent},
    { path: "dept-form", component: DepartmentsFormComponent},
    { path: "dept-form/:id", component: DepartmentsFormComponent},
    { path: "dept-details/:id", component: DepartmentsDetailComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }