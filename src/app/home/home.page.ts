import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { SplitService, Item } from '../services/split.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: false,
})
export class HomePage {
    newPersonName = '';
    newItemDescription = '';
    newItemPrice: number | null = null;

    nextPersonId = 1;
    nextItemId = 1;

    get people() { return this.split.people; }
    get items() { return this.split.items; }
    get tipPercent() { return this.split.tipPercent; }
    set tipPercent(v: number) { this.split.tipPercent = v; }

    constructor(public split: SplitService,
                private router: Router) {
        addIcons({ closeOutline });
    }

    addPerson() {
        const name = this.newPersonName.trim();
        if (!name){
            return;
        }
        this.split.people.push({ id: this.nextPersonId++, name });
        this.newPersonName = '';
    }

    removePerson(id: number) {
        this.split.people = this.split.people.filter(p => p.id !== id);
    }

    addItem() {
        const description = this.newItemDescription.trim();
        const price = this.newItemPrice;
        if (!description || !price || price <= 0){
            return;
        }

        this.split.items.push({
            id: this.nextItemId++,
            description,
            price,
            assignedTo: []
        });

        this.newItemDescription = '';
        this.newItemPrice = null;
    }

    removeItem(id: number) {
        this.split.items = this.split.items.filter(i => i.id !== id);
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

    getTotalBill(): number {
        let total = 0;
        for (const item of this.split.items) {
            total += item.price;
        }
        return total;
    }

    canContinue(): boolean {
        return this.split.people.length > 0 && this.split.items.length > 0;
    }

    goToSummary() {
        this.router.navigate(['/summary']);
    }
}
