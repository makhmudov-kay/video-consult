/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SvgCardTickComponent } from './svg-card-tick.component';

describe('SvgCardTickComponent', () => {
  let component: SvgCardTickComponent;
  let fixture: ComponentFixture<SvgCardTickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCardTickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCardTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
