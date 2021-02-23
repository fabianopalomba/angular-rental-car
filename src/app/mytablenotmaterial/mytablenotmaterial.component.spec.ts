import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytablenotmaterialComponent } from './mytablenotmaterial.component';

describe('MytablenotmaterialComponent', () => {
  let component: MytablenotmaterialComponent;
  let fixture: ComponentFixture<MytablenotmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytablenotmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MytablenotmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
