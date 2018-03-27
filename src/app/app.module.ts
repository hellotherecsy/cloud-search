import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MyGridApplicationComponent } from './my-grid-application/my-grid-application.component';
import { AgGridModule } from "ag-grid-angular/main";
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
 
import {RestService} from './my-grid-application/rest.service'

@NgModule({
  declarations: [
    AppComponent,
    MyGridApplicationComponent 
  ],
  imports: [
    BrowserModule, 
    HttpModule  ,
    AgGridModule.withComponents(
      [MyGridApplicationComponent]
    )
  ],
  providers: [
    RestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
