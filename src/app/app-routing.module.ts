import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from "./organizations/organizations.component";
import { OrganizationsFormComponent } from './organizations/organizations-form/organizations-form.component';
import { OrganizationsDetailComponent } from './organizations/organizations-detail/organizations-detail.component';

const appRoutes: Routes = [
    { path: '', redirectTo:'/organizations', pathMatch: 'full'},
    { path: "organizations", component: OrganizationsComponent},
    { path: "org-form", component: OrganizationsFormComponent },
    { path: "org-form/:id", component: OrganizationsFormComponent},
    { path: "org-details/:id", component: OrganizationsDetailComponent}, 
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }