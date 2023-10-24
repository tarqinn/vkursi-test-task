import { FinanceDataService } from './services/finance-data.service';
import { Component } from '@angular/core';
import { FinanceIndicatorsModel } from './models/finance-indicators.model';
import { FinanceLocalDataService } from './services/finance-local-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'vkursi-test-task';
  typesOfFinData: (keyof FinanceIndicatorsModel)[] = [];
  selectedYear: string = '2020';
  isLoading: boolean = true;
  data!: FinanceIndicatorsModel;

  constructor(
    private financeDataService: FinanceDataService,
    private financeLocalDataService: FinanceLocalDataService
  ) {}

  ngOnInit() {
    this.typesOfFinData = this.financeLocalDataService.typesOfFinData;

    this.financeDataService
      .getFinancialData()
      .subscribe((res: FinanceIndicatorsModel) => {
        this.data = res;
        this.financeLocalDataService.typesOfFinData = Object.keys(
          this.data
        ) as (keyof FinanceIndicatorsModel)[];
        this.isLoading = false;
      });
  }
}
