import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../core/services/event-service.service';
import { Event } from '../../model/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.sass']
})
export class FindComponent implements OnInit {

  result$: Observable<Event[]>;

  constructor(private eventService: EventServiceService) { }

  ngOnInit() {
  }

  findEvents() {
  	this.result$ = this.eventService.findEvent({ query: {},start:0, count:10});
  }

}
