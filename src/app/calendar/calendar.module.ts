import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';



@NgModule({
  exports:[CalendarComponent],
  declarations: [CalendarComponent],
  imports: [
    CommonModule
  ]
})
export class CalendarModule { }
