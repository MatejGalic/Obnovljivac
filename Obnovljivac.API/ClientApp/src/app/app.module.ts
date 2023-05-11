import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { WindCalculatorComponent } from './components/wind-calculator/wind-calculator.component';
import { SharedModule } from './core/modules/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    WindCalculatorComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent, pathMatch: 'full' },
        { path: 'calculator', component: WindCalculatorComponent },
      ],
      { scrollOffset: [-90, -150] }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
