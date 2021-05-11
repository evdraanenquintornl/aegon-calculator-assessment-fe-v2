import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalculatorService } from 'src/app/service/calculator.service';
import { CalculationResult } from 'src/app/Model/CalculationResult';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.sass']
})
export class CalculatorComponent implements OnInit {

  calculatorForm: FormGroup;


  calculations = new Array<CalculationResult>();

  constructor(
    private formBuilder: FormBuilder,
    private calculatorService: CalculatorService,
    private toastrService: ToastrService) {

    this.calculatorForm = this.formBuilder.group({
      prefix: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      operator: ['', [Validators.required]],
      suffix: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });

  }

  ngOnInit(): void {
    this.calculatorService.getAllCalculations().subscribe(calculations => this.calculations = calculations);
  }

  get f(): FormGroup['controls'] { return this.calculatorForm.controls; }

  onSubmit(): void {
    if (this.divideByZeroGuard(this.calculatorForm)) {
      this.calculatorService.sendErrorToToastr('Unable to divide by Zero', 'Bad Request');
      return;
    }

    if (this.calculatorForm.valid) {
      this.calculatorService.calculate(this.calculatorForm.value);
      this.onReset();
    }
  }

  onReset(): void {
    this.calculatorForm.reset();
  }

  private divideByZeroGuard(formGroup: FormGroup): boolean {
    return (this.calculatorForm.get('operator')?.value === '/' &&
      (this.calculatorForm.get('prefix')?.value === 0 || this.calculatorForm.get('suffix')?.value === 0)) ? true : false;
  }

}
