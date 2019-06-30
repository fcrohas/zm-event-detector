import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonEvent, Event } from '../../model/event';
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

	private searchUrl = 'http://localhost:3000/store/find';
	private lastUrl = 'http://localhost:3000/store/last';
	private lastEvent$: Observable<Event[]>;

	constructor(private http: HttpClient) { 
		this.load();
	}

	load() {
		this.lastEvent$ = interval(5000).pipe(
				map(i => i + 1),
				startWith(0),
				switchMap( (index) => { return this.http.post<JsonEvent[]>(this.lastUrl, {}); }),
				map(jsonArray => jsonArray.map(json => new Event(json))),
				shareReplay(1)
			);
	}

	findEvent(search: any): Observable<Event[]> {
		return this.http.post<JsonEvent[]>(this.searchUrl, search)
			.pipe(
				map(jsonArray => jsonArray.map(json => new Event(json))),
				shareReplay(1)
		);
	}

	lastEvent(): Observable<Event[]> {
		return this.lastEvent$;
	}

}
