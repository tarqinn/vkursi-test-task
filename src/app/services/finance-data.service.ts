import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FinanceIndicatorsModel } from '../models/finance-indicators.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceDataService {

  constructor(private http: HttpClient) { }

  getFinancialData(): Observable<FinanceIndicatorsModel> {
    return this.http.get('assets/financical_example.json') as Observable<FinanceIndicatorsModel>;
  }
}
