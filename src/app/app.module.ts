import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, HttpClient, HttpClientXsrfModule, HttpXhrBackend } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { ToastrModule } from 'ngx-toastr';
import { StatisticsComponent } from './component/statistics/statistics.component';
import { HomeComponent } from './component/home/home.component';






@NgModule({
  declarations: [
    AppComponent,
    StatisticsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,

    ToastrModule.forRoot(),
  ],
  providers: [
    provideClientHydration(),
    {provide: HttpClient,
      useClass: HttpClient,
      deps: [HttpXhrBackend, HttpClientModule],},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
