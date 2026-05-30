import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

interface Person {
    id: number;
    name: string;
}

interface Item {
    id: number;
    description: string;
    price: number;
    assignedTo: number[];
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: false,
})
export class HomePage {
    people: Person[] = [];
    items: Item[] = [];

    newPersonName = '';
    newItemDescription = '';
    newItemPrice: number | null = null;

    nextPersonId = 1;
    nextItemId = 1;

    constructor() {
        addIcons({ closeOutline });
    }

    addPerson() {
        const name = this.newPersonName.trim();
        if(!name){
            return
        };
        this.people.push({ id: this.nextPersonId++, name });
        this.newPersonName = '';
    }

    removePerson(id: number) {
        this.people = this.people.filter(p => p.id !== id);
    }

    addItem() {
        const description = this.newItemDescription.trim();
        const price = this.newItemPrice;
        if (!description || !price || price <= 0){
            return;
        }

        this.items.push({
            id: this.nextItemId++,
            description,
            price,
            assignedTo: []
        });

        this.newItemDescription = '';
        this.newItemPrice = null;
    }

    removeItem(id: number) {
        this.items = this.items.filter(i => i.id !== id);
    }

    toggleAssignment(item: Item, personId: number) {
        const idx = item.assignedTo.indexOf(personId);
        if (idx === -1) {
            item.assignedTo.push(personId);
        } else {
            item.assignedTo.splice(idx, 1);
        }
    }

    isAssigned(item: Item, personId: number): boolean {
        return item.assignedTo.includes(personId);
    }

    getItemLabel(item: Item): string {
        return `${item.description} — $${item.price}`;
    }

    getSubtotalForPerson(personId: number): number {
        let total = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            // bug: suma el precio completo en vez del share
            if (item.assignedTo.includes(personId)) {
                total += item.price;
            }
        }
        return total;
    }
}
