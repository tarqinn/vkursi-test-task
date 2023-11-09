import { Injectable } from '@angular/core';
import { FinanceDictionaryModel } from '../models/finance-dictionary.model';
import { FinanceIndicatorsModel } from '../models/finance-indicators.model';
import { BehaviorSubject } from 'rxjs';
import { FormedFinanceTableData } from '../models/formed-finance-table-data.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceLocalDataService {

  typesOfFinData: (keyof FinanceIndicatorsModel)[];

  finDynamic!: FormedFinanceTableData[];

  private selectedDataSubject: BehaviorSubject<FormedFinanceTableData | null> = new BehaviorSubject<FormedFinanceTableData | null>(null);
  selectedData$ = this.selectedDataSubject.asObservable();

  typesDictionary: FinanceDictionaryModel = {
    main_active: 'Активи',
    current_liabilities: 'Зобов’язання',
    net_income: 'Дохід (виручка)',
    net_profit: 'Прибуток (збиток)'
  };

  colorDictionary: FinanceDictionaryModel = {
    main_active: '--green-600',
    current_liabilities: '--orange-300',
    net_income: '--blue-400',
    net_profit: '--cyan-300'
  };

  constructor() {
    this.typesOfFinData = Object.keys(this.typesDictionary) as (keyof FinanceIndicatorsModel)[];
  }

  calculatePercentageDifference(originalValue:number | undefined, newValue:number | undefined): number {
    let percentageDifference;
    if (typeof originalValue === 'number' && typeof newValue === 'number') {
      const difference = newValue - originalValue;
      percentageDifference = (difference / originalValue) * 100;
    } else {
      percentageDifference = 0;
    }
    return percentageDifference;
  }

  setData(data: FormedFinanceTableData | null) {
    this.selectedDataSubject.next(data);
  }
}
