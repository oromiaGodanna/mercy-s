import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { OrganizationsComponent } from './organizations.component';
import { OrganizationsDetailComponent } from './organizations-detail/organizations-detail.component';
import { OrganizationsFormComponent } from './organizations-form/organizations-form.component';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { DepartmentsModule } from '../departments/departments.module';


@NgModule({
    declarations: [
        OrganizationsComponent,
        OrganizationsDetailComponent,
        OrganizationsFormComponent,
        OrganizationsListComponent
    ],
    imports: [
        CommonModule,
        OrganizationsRoutingModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class OrganizationsModule {}