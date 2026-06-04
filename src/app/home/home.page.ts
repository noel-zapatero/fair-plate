import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { SplitService, Item } from '../services/split.service';

type SplitMode = 'even' | 'perplate';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: false,
})
export class HomePage {
    splitMode: SplitMode | null = null;

    // even split fields
    evenPeople: number | null = null;
    evenTotal: number | null = null;

    // per plate fields
    newPersonName = '';
    newItemDescription = '';
    newItemPrice: number | null = null;
    nextPersonId = 1;
    nextItemId = 1;

    constructor(public split: SplitService, private router: Router) {
        addIcons({ closeOutline });
    }

    get people() { return this.split.people; }
    get items() { return this.split.items; }
    get tipPercent() { return this.split.tipPercent; }
    set tipPercent(v: number) { this.split.tipPercent = v; }

    selectMode(mode: SplitMode) {
        this.splitMode = mode;
        this.split.reset();
        this.nextPersonId = 1;
        this.nextItemId = 1;
    }

    // --- even split logic ---

    getEvenShare(): number {
        if (!this.evenPeople || !this.evenTotal) return 0;
        if (this.evenPeople <= 0) return 0;
        return this.evenTotal / this.evenPeople;
    }

    getTipSuggestions(): { percent: number; tipTotal: number; tipEach: number }[] {
        if (!this.evenTotal || !this.evenPeople || this.evenPeople <= 0) return [];
        const percs = [5, 10, 15];
        return percs.map(p => {
            const tipTotal = this.evenTotal! * (p / 100);
            const tipEach = tipTotal / this.evenPeople!;
            return { percent: p, tipTotal, tipEach };
        });
    }

    canContinueEven(): boolean {
        return !!this.evenPeople && !!this.evenTotal
            && this.evenPeople > 0 && this.evenTotal > 0;
    }

    goToEvenSummary() {
        if (!this.canContinueEven()) return;
        this.split.evenMode = true;
        this.split.evenPeople = this.evenPeople!;
        this.split.evenTotal = this.evenTotal!;
        this.router.navigate(['/summary']);
    }

    // --- per plate logic ---

    addPerson() {
        const name = this.newPersonName.trim();
        if (!name) return;
        this.split.people.push({ id: this.nextPersonId++, name });
        this.newPersonName = '';
    }

    removePerson(id: number) {
        this.split.people = this.split.people.filter(p => p.id !== id);
    }

    addItem() {
        const description = this.newItemDescription.trim();
        const price = this.newItemPrice;
        if (!description || !price || price <= 0) return;

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

    // quedó del approach anterior, no se usa
    splitEvenly(): number {
        const totalPeople = this.people.length;
        if (totalPeople === 0) return 0;
        const tipAmount = this.getTotalBill() * (this.tipPercent / 100);
        return tipAmount / totalPeople;
    }

    getTipForPerson(personId: number): number {
        const totalBill = this.getTotalBill();
        if (totalBill === 0) return 0;
        const personSubtotal = this.getSubtotalForPerson(personId);
        const tipAmount = totalBill * (this.tipPercent / 100);
        return (personSubtotal / totalBill) * tipAmount;
    }

    getSubtotalForPerson(personId: number): number {
        let total = 0;
        for (let i = 0; i < this.split.items.length; i++) {
            const item = this.split.items[i];
            if (item.assignedTo.includes(personId)) {
                total += item.price / item.assignedTo.length;
            }
        }
        return total;
    }

    canContinuePerPlate(): boolean {
        return this.split.people.length > 0 && this.split.items.length > 0;
    }

    goToSummary() {
        this.split.evenMode = false;
        this.router.navigate(['/summary']);
    }
}
