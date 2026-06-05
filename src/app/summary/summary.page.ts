import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { SplitService } from '../services/split.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.page.html',
    styleUrls: ['./summary.page.scss'],
    standalone: false,
})
export class SummaryPage {

    constructor(public split: SplitService,
                private router: Router) {
        addIcons({ arrowBackOutline });
    }

    // --- Even --- //
    getEvenShare(): number {
        if (this.split.evenPeople <= 0) return 0;
        return this.split.evenTotal / this.split.evenPeople;
    }

    getEvenRows(): { index: number; amount: number }[] {
        const rows = [];
        for (let i = 0; i < this.split.evenPeople; i++) {
            rows.push({ index: i + 1, amount: this.getEvenShare() });
        }
        return rows;
    }

    // --- Por plato --- //
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

    getTotalBill(): number {
        let total = 0;
        for (const item of this.split.items) {
            total += item.price;
        }
        return total;
    }

    getTipForPerson(personId: number): number {
        const totalBill = this.getTotalBill();
        if (totalBill === 0) return 0;
        const personSubtotal = this.getSubtotalForPerson(personId);
        const tipAmount = totalBill * (this.split.tipPercent / 100);
        return (personSubtotal / totalBill) * tipAmount;
    }

    getTotalForPerson(personId: number): number {
        return this.getSubtotalForPerson(personId) + this.getTipForPerson(personId);
    }

    getTotalWithTip(): number {
        return this.getTotalBill() * (1 + this.split.tipPercent / 100);
    }

    reset() {
        this.split.reset();
        this.router.navigate(['/home']);
    }
}
