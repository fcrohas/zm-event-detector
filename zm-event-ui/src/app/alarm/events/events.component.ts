import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../../core/services/event-service.service';
import { Event } from '../../model/event';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.sass']
})
export class EventsComponent implements OnInit {

  constructor(public eventService: EventServiceService) { }

  ngOnInit() { 
  }

}
