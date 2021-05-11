import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/material-module';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, HttpClientModule, ToastrModule.forRoot(), MaterialModule],
      declarations: [CalculatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.calculatorForm.valid).toBeFalsy();
  });

  it('prefix field validity', () => {
    const prefix = component.calculatorForm.controls['prefix'];
    expect(prefix.valid).toBeFalsy();

    prefix.setValue('');
    expect(prefix.hasError('required')).toBeTruthy();

    prefix.setValue('1');
    expect(prefix.valid).toBeTruthy();

    prefix.setValue('a');
    expect(prefix.valid).toBeFalsy();
  });

  it('suffix field validity', () => {
    const suffix = component.calculatorForm.controls['suffix'];
    expect(suffix.valid).toBeFalsy();

    suffix.setValue('');
    expect(suffix.hasError('required')).toBeTruthy();

    suffix.setValue('1');
    expect(suffix.valid).toBeTruthy();

    suffix.setValue('a');
    expect(suffix.valid).toBeFalsy();
  });

  it('operator field validity', () => {
    const operator = component.calculatorForm.controls['operator'];
    expect(operator.valid).toBeFalsy();

    operator.setValue('');
    expect(operator.hasError('required')).toBeTruthy();
  });

  it('should not make request when form is invalid', waitForAsync(() => {
    spyOn(component, 'onSubmit');
    spyOn(component, 'onReset');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.onReset).toHaveBeenCalledTimes(0);
    });
  }));

  it('should make request when form is valid', waitForAsync(() => {
    spyOn(component, 'onSubmit');
    spyOn(component, 'onReset');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.onReset).toHaveBeenCalledTimes(0);
    });
  }));

  it('should make not make request when divide by Zero', waitForAsync(() => {
    spyOn(component, 'onSubmit');
    spyOn(component, 'onReset');

    const prefix = component.calculatorForm.controls['prefix'];
    const operator = component.calculatorForm.controls['operator'];
    const suffix = component.calculatorForm.controls['suffix'];
    prefix.setValue(10);
    operator.setValue('/');
    suffix.setValue(0);


    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    fixture.whenStable().then(() => {
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.onReset).toHaveBeenCalledTimes(0);
    });
  }));

});
