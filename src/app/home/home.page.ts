import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';

interface Person {
    id: number;
    name: string;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: false,
})
export class HomePage {
    people: Person[] = [];
    newPersonName = '';
    nextPersonId = 1;

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
}
