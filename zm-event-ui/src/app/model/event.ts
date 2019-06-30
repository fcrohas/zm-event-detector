import { Box } from './box';

export class Event {
	_id?: string;
	name: string;
	prob: number;
	box: Box;
	eventId: number;
	frameId: number;
	img: string;

	constructor(jsonEvent: JsonEvent) {
		Object.assign(this, jsonEvent);
	}	
}

export interface JsonEvent {
  _id?: string;
  name: string;
  prob: number;
  box: Box;
  eventId: number;
  frameId: number;
  img: string;
}
