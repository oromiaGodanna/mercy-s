import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentsComponent } from './departments.component';
import { DepartmentsDetailComponent } from './departments-detail/departments-detail.component';
import { DepartmentsFormComponent } from './departments-form/departments-form.component';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { AllDepartmentsComponent } from './all-departments/all-departments.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { OrganizationsModule } from '../organizations/organizations.module';

@NgModule({
    declarations: [
        DepartmentsComponent,
        DepartmentsDetailComponent,
        DepartmentsFormComponent,
        DepartmentsListComponent,
        AllDepartmentsComponent,
    ],
    imports: [
        CommonModule,
        DepartmentsRoutingModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  
})
export class DepartmentsModule {}