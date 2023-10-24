import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartModule } from 'primeng/chart';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FinanceGraphComponent } from './components/finance-graph/finance-graph.component';
import { FinanceTableComponent } from './components/finance-table/finance-table.component';
import { InfoTileComponent } from './components/info-tile/info-tile.component';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { BlockUIModule } from 'primeng/blockui';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AppComponent,
    FinanceGraphComponent,
    FinanceTableComponent,
    InfoTileComponent,
    NumberFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    TabViewModule,
    TableModule,
    BlockUIModule,
    SkeletonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
