import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsFormComponent } from './departments-form/departments-form.component';
import { DepartmentsDetailComponent } from './departments-detail/departments-detail.component';

const departmentsRoutes: Routes = [
    { path: "departments", component: AllDepartmentsComponent },
    { path: "departments/:org_id", component: DepartmentsComponent },
    { path: "dept-form", component: DepartmentsFormComponent },
    { path: "dept-form/:id", component: DepartmentsFormComponent },
    { path: "dept-details/:id", component: DepartmentsDetailComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(departmentsRoutes)
         
    ],
    exports: [RouterModule]
})
export class DepartmentsRoutingModule {}