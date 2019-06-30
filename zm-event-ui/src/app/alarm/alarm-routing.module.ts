import { NgModule } from '@angular/core';
import { FindComponent } from './find/find.component';
import { EventsComponent } from './events/events.component';
import { RootComponent } from './root/root.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'alarm',
		component: EventsComponent,
		children: [
			{ path: 'find', component: FindComponent },
			{ path: '', redirectTo: 'alarm', pathMatch: 'full' }
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlarmRoutingModule { }
