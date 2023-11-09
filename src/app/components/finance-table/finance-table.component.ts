import { Component, Input, OnInit } from '@angular/core';
import { TableRowSelectEvent } from 'primeng/table';
import { FinanceDictionaryModel } from 'src/app/models/finance-dictionary.model';
import { FinanceIndicatorsModel } from 'src/app/models/finance-indicators.model';
import { FinanceYearStatisticModel } from 'src/app/models/finance-year-statistic.model';
import { FormedFinanceTableData } from 'src/app/models/formed-finance-table-data.model';
import { FinanceLocalDataService } from 'src/app/services/finance-local-data.service';

@Component({
  selector: 'app-finance-table',
  templateUrl: './finance-table.component.html',
  styleUrls: ['./finance-table.component.scss'],
})
export class FinanceTableComponent implements OnInit {
  @Input() data!: FinanceIndicatorsModel;

  typesDictionary: FinanceDictionaryModel = this.financeLocalDataService.typesDictionary;
  typesArray: (keyof FinanceIndicatorsModel)[] = Object.keys(this.typesDictionary) as (keyof FinanceIndicatorsModel)[];

  finDynamic!: FormedFinanceTableData[];

  constructor(private financeLocalDataService: FinanceLocalDataService) {}

  ngOnInit() {
    this.finDynamic = this.formTableData(this.data);
    this.financeLocalDataService.finDynamic = this.formTableData(this.data);
  }

  formTableData(data: FinanceIndicatorsModel): FormedFinanceTableData[] {
    let years: string[] = [];
    let formedData: FormedFinanceTableData[] = [];

    Object.keys(data).forEach((key: string) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        years = data[key as keyof typeof data].reduce(
          (acc: string[], el: FinanceYearStatisticModel): string[] => {
            return [...acc, el.year];
          },
          [] as string[]
        );
        years = [...years, ...years];
      }
    });
    years = [...new Set(years)];

    years.forEach((year, i) => {
      formedData = [
        ...formedData,
        {
          year,
          current_liabilities: data.current_liabilities.find(
            (arr: FinanceYearStatisticModel) => arr.year === year
          )?.sum || 0,
          current_liabilities_diff: i
            ? this.financeLocalDataService.calculatePercentageDifference(
              data.current_liabilities.find(
                (arr: FinanceYearStatisticModel) =>
                  Number(arr.year) === Number(year) - 1
              )?.sum,
              data.current_liabilities.find(
                (arr: FinanceYearStatisticModel) => arr.year === year
              )?.sum
            )
            : 0,
          main_active: data.main_active.find(
            (arr: FinanceYearStatisticModel) => arr.year === year
          )?.sum || 0,
          main_active_diff: i
            ? this.financeLocalDataService.calculatePercentageDifference(
              data.main_active.find(
                (arr: FinanceYearStatisticModel) =>
                  Number(arr.year) === Number(year) - 1
              )?.sum,
              data.main_active.find(
                (arr: FinanceYearStatisticModel) => arr.year === year
              )?.sum
            )
            : 0,
          net_income: data.net_income.find(
            (arr: FinanceYearStatisticModel) => arr.year === year
          )?.sum || 0,
          net_income_diff: i
            ? this.financeLocalDataService.calculatePercentageDifference(
              data.net_income.find(
                (arr: FinanceYearStatisticModel) =>
                  Number(arr.year) === Number(year) - 1
              )?.sum,
              data.net_income.find(
                (arr: FinanceYearStatisticModel) => arr.year === year
              )?.sum
            )
            : 0,
          net_profit: data.net_profit.find(
            (arr: FinanceYearStatisticModel) => arr.year === year
          )?.sum || 0,
          net_profit_diff: i
            ? this.financeLocalDataService.calculatePercentageDifference(
              data.net_profit.find(
                (arr: FinanceYearStatisticModel) =>
                  Number(arr.year) === Number(year) - 1
              )?.sum,
              data.net_profit.find(
                (arr: FinanceYearStatisticModel) => arr.year === year
              )?.sum
            )
            : 0,
        },
      ];
    });

    this.financeLocalDataService.setData(formedData[0]);

    return (formedData.reverse() as FormedFinanceTableData[]);
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.financeLocalDataService.setData(event.data);
  }
}
