import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardiandetailsPage } from './guardiandetails.page';

describe('GuardiandetailsPage', () => {
  let component: GuardiandetailsPage;
  let fixture: ComponentFixture<GuardiandetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuardiandetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuardiandetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
