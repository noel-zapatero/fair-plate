import { Injectable } from '@angular/core';

export interface Person {
    id: number;
    name: string;
}

export interface Item {
    id: number;
    description: string;
    price: number;
    assignedTo: number[];
}

@Injectable({ providedIn: 'root' })
export class SplitService {
    people: Person[] = [];
    items: Item[] = [];

    tipPercent = 0;

    evenMode = false;
    evenPeople = 0;
    evenTotal = 0;

    reset() {
        this.people = [];
        this.items = [];
        this.tipPercent = 0;
        this.evenMode = false;
        this.evenPeople = 0;
        this.evenTotal = 0;
    }
}