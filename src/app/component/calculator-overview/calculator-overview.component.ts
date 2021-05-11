import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/service/calculator.service';
import { CalculationResult } from 'src/app/Model/CalculationResult';

@Component({
  selector: 'app-calculator-overview',
  templateUrl: './calculator-overview.component.html',
  styleUrls: ['./calculator-overview.component.sass']
})
export class CalculatorOverviewComponent implements OnInit {

  calculationResults = new Array<CalculationResult>();

  constructor(private calculatorService: CalculatorService) { }

  ngOnInit(): void {
    this.calculatorService.getAllCalculations().subscribe(calculationResults => this.calculationResults = calculationResults);
  }
}
