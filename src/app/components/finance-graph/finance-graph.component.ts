import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions } from 'chart.js';
import { FinanceIndicatorsModel } from 'src/app/models/finance-indicators.model';
import { FinanceYearStatisticModel } from 'src/app/models/finance-year-statistic.model';
import { FinanceLocalDataService } from 'src/app/services/finance-local-data.service';

@Component({
  selector: 'app-finance-graph',
  templateUrl: './finance-graph.component.html',
  styleUrls: ['./finance-graph.component.scss'],
})
export class FinanceGraphComponent implements OnInit {
  @Input() dataset!: FinanceIndicatorsModel;

  data!: ChartData;
  options!: ChartOptions;
  documentStyle!: CSSStyleDeclaration;

  constructor(private financeLocalDataService: FinanceLocalDataService) {}

  ngOnInit() {
    this.documentStyle = getComputedStyle(document.documentElement);
    const textColor = this.documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = this.documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder =
      this.documentStyle.getPropertyValue('--surface-border');

    this.data = this.formChartDataObject(this.dataset);

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            color: textColor,
            boxWidth: 16,
            boxHeight: 16,
            useBorderRadius: true,
            borderRadius: 3,
            textAlign: 'center'
          },
        },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#000',
          bodyColor: '#000',
          titleAlign: 'center',
          bodyAlign: 'center',
          borderColor: '#000',
          borderWidth: 1,
          usePointStyle: true,
          cornerRadius: 0,
          padding: {
            top: 12,
            right: 14,
            bottom: 12,
            left: 14,
          },
          boxPadding: 11,
        },
      },
      elements: {
        line: {
          borderWidth: 0,
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: '500',
            },
          },
          grid: {
            color: textColor,
            display: false,
            drawTicks: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            display: true,
            drawTicks: false,
          },
        },
      },
    };
  }

  formChartDataObject(data: FinanceIndicatorsModel) {
    let labels: string[] = [];
    let datasets: ChartDataset[] = [];

    Object.keys(data).forEach((key: string) => {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const years: string[] = data[key as keyof typeof data].reduce(
          (acc: string[], el: FinanceYearStatisticModel) => {
            return [...acc, el.year];
          },
          [] as string[]
        );
        labels = [...labels, ...years];
      }
    });

    labels = [...new Set(labels)];

    Object.keys(this.financeLocalDataService.typesDictionary).forEach(
      (key: string) => {
        if (
          Object.prototype.hasOwnProperty.call(
            this.financeLocalDataService.typesDictionary,
            key
          )
        ) {
          datasets = [
            ...datasets,
            {
              label: this.financeLocalDataService.typesDictionary[key],
              backgroundColor: this.documentStyle.getPropertyValue(
                this.financeLocalDataService.colorDictionary[key]
              ),
              borderWidth: 0,
              borderRadius: 2,
              data: data[key as keyof typeof data].map(
                (el: FinanceYearStatisticModel) => el.sum
              ),
            },
          ];
        }
      }
    );



    return { labels, datasets };
  }

  onDataSelect(event: { element: { index:  number }; }): void {
    this.financeLocalDataService.setData(this.financeLocalDataService.finDynamic[this.financeLocalDataService.finDynamic.length - event.element.index - 1]);
  }
}
