import { Component } from '@angular/core';
import { IonicModule, AlertController, IonicSafeString } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartsService } from '../services/parts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HomePage {

  parts: any[] = [];

  constructor(private partsService: PartsService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loadParts();
  }

  loadParts() {
    this.partsService.getParts().subscribe(res => this.parts = res);
  }

  async openAddModal() {
    const alert = await this.alertCtrl.create({
      header: 'Add Part',
      inputs: [
        { name: 'name', placeholder: 'Name' },
        { name: 'type', placeholder: 'Type' },
        { name: 'quantity', placeholder: 'Quantity', type: 'number' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Add', handler: (data) => {
          this.partsService.addPart(data).subscribe(() => this.loadParts());
        }}
      ]
    });
    await alert.present();
  }

  async openEditModal(part: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Part',
      inputs: [
        { name: 'name', placeholder: 'Name', value: part.name },
        { name: 'type', placeholder: 'Type', value: part.type },
        { name: 'quantity', placeholder: 'Quantity', type: 'number', value: part.quantity }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Update', handler: (data) => {
          data.id = part.id;
          this.partsService.updatePart(data).subscribe(() => this.loadParts());
        }}
      ]
    });
    await alert.present();
  }

  deletePart(id: number) {
    this.partsService.deletePart(id).subscribe(() => this.loadParts());
  }
}