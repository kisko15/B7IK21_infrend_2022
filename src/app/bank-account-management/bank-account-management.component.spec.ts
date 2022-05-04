import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountManagementComponent } from './bank-account-management.component';

describe('BankAccountManagementComponent', () => {
  let component: BankAccountManagementComponent;
  let fixture: ComponentFixture<BankAccountManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankAccountManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
