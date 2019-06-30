export class Box {
	x: number;
	y: number;
	w: number;
	h: number;

	constructor(jsonBox : JsonBox) {
		Object.assign(this, jsonBox);
	}
}

export interface JsonBox {
	x: number;
	y: number;
	w: number;
	h: number;
}