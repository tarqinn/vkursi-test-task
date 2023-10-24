import { FinanceYearStatisticModel } from './finance-year-statistic.model';

export interface FinanceIndicatorsModel {
  current_liabilities: FinanceYearStatisticModel[]; // Зобов’язання
  main_active: FinanceYearStatisticModel[]; // Активи
  net_income: FinanceYearStatisticModel[]; // Дохід (виручка)
  net_profit: FinanceYearStatisticModel[]; // Прибуток (збиток)
}
