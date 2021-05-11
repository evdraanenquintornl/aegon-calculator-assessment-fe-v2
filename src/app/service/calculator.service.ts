import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { CalculationResult } from 'src/app/Model/CalculationResult';
import { Calculation } from 'src/app/Model/Calculation';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private calculationResultList: CalculationResult[] = new Array<CalculationResult>();
  private calculationResultSubject = new BehaviorSubject(this.calculationResultList);

  private apiUrl: string = environment.server_api_url + '/api/calculations';

  constructor(private httpClient: HttpClient, private toastrService: ToastrService) {
    this.httpClient.get<CalculationResult[]>(this.apiUrl).subscribe(calculations => {
      this.calculationResultList = calculations;
      this.calculationResultSubject.next(this.calculationResultList);
    }, (error: HttpErrorResponse) => this.toastrService.error(error.message, error.statusText));
  }

  calculate(calculation: Calculation): void {
    this.httpClient.post<CalculationResult>(this.apiUrl, calculation).subscribe(value => {
      this.calculationResultList.push(value);
      this.calculationResultSubject.next(this.calculationResultList);
      return value.result;

    }, (error: HttpErrorResponse) => {
      this.sendErrorToToastr(error.error.message, error.error.error);
    });
  }

  getAllCalculations(): BehaviorSubject<CalculationResult[]> {
    return this.calculationResultSubject;
  }

  sendErrorToToastr(message: string, title: string): void {
    this.toastrService.error(message, title);
  }
}
