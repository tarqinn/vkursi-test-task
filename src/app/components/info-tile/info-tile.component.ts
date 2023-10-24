import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { FinanceDictionaryModel } from 'src/app/models/finance-dictionary.model';
import { FinanceIndicatorsModel } from 'src/app/models/finance-indicators.model';
import { FormedFinanceTableData } from 'src/app/models/formed-finance-table-data.model';
import { FinanceLocalDataService } from 'src/app/services/finance-local-data.service';

type OmittedFormedFinanceTableData = keyof Omit<FormedFinanceTableData, 'year'>;
type ArrowDirection = 'pi-arrow-up' | 'pi-arrow-down' | 'pi-arrows-v';

@Component({
  selector: 'app-info-tile',
  templateUrl: './info-tile.component.html',
  styleUrls: ['./info-tile.component.scss'],
})
export class InfoTileComponent {
  year: string = '2020';
  @Input() typeOfFinIndicator: string = '';
  @Input() currency: string = 'грн.';
  sum: number = 0;
  prevSum: number = 0;
  indicationColor: string = '';
  typeOfArrow: ArrowDirection = 'pi-arrows-v';

  thisYearLastYearDiff: number = 0;
  typesDictionary!: FinanceDictionaryModel;
  dataSubscription!: Subscription;
  data!: FormedFinanceTableData;
  rawData!: FinanceIndicatorsModel;

  constructor(
    public financeLocalDataService: FinanceLocalDataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.typesDictionary = this.financeLocalDataService.typesDictionary;
    this.dataSubscription =
      this.financeLocalDataService.selectedData$.subscribe(
        (res: FormedFinanceTableData | null) => {
          if (res) {
            this.data = res;
            this.indicationColor = this.isIndicationGreen();
            this.typeOfArrow = this.arrowDirection();
            this.sum =
              this.data[
                this.typeOfFinIndicator as OmittedFormedFinanceTableData
              ];
            this.thisYearLastYearDiff =
              this.data[
                (this.typeOfFinIndicator +
                  '_diff') as OmittedFormedFinanceTableData
              ];
            this.cd.detectChanges();
          }
        }
      );
  }

  isIndicationGreen(): string {
    if (
      (this.data[
        (this.typeOfFinIndicator + '_diff') as OmittedFormedFinanceTableData
      ] > 0 &&
        this.typeOfFinIndicator !== 'current_liabilities') ||
      (this.data[
        (this.typeOfFinIndicator + '_diff') as OmittedFormedFinanceTableData
      ] < 0 &&
        this.typeOfFinIndicator === 'current_liabilities')
    ) {
      return 'text-green-600';
    } else if (
      (this.data[
        (this.typeOfFinIndicator + '_diff') as OmittedFormedFinanceTableData
      ] < 0 &&
        this.typeOfFinIndicator !== 'current_liabilities') ||
      (this.data[
        (this.typeOfFinIndicator + '_diff') as OmittedFormedFinanceTableData
      ] > 0 &&
        this.typeOfFinIndicator === 'current_liabilities')
    ) {
      return 'text-red-600';
    } else {
      return '';
    }
  }

  arrowDirection(): ArrowDirection {
    if (
      this.data[
        (this.typeOfFinIndicator + '_diff') as OmittedFormedFinanceTableData
      ] > 0
    ) {
      return 'pi-arrow-up';
    } else if (
      this.data[
        (this.typeOfFinIndicator + '_diff') as OmittedFormedFinanceTableData
      ] < 0
    ) {
      return 'pi-arrow-down';
    } else {
      return 'pi-arrows-v';
    }
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
