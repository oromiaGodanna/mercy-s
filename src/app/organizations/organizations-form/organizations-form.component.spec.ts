import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsFormComponent } from './organizations-form.component';

describe('OrganizationsFormComponent', () => {
  let component: OrganizationsFormComponent;
  let fixture: ComponentFixture<OrganizationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
