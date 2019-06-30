import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindComponent } from './find/find.component';
import { EventsComponent } from './events/events.component';

import { AlarmRoutingModule } from './alarm-routing.module';
import { RootComponent } from './root/root.component';

@NgModule({
  declarations: [FindComponent, EventsComponent, RootComponent],
  imports: [
    CommonModule,
    AlarmRoutingModule
  ]
})
export class AlarmModule { }
