import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { OrganizationsFormComponent } from './organizations-form/organizations-form.component';
import { OrganizationsDetailComponent } from './organizations-detail/organizations-detail.component';

const organizationsRoutes: Routes = [
    { path: "organizations", component: OrganizationsComponent },
    { path: "org-form", component: OrganizationsFormComponent },
    { path: "org-form/:id", component: OrganizationsFormComponent },
    { path: "org-details/:id", component: OrganizationsDetailComponent },
];
@NgModule({
    imports: [
        RouterModule.forChild(organizationsRoutes)
    ],
    exports: [RouterModule]
})
export class OrganizationsRoutingModule {}