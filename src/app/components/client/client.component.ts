import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../core/models/client';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  newClient: Client = {
    nom: '',
    email: ''
  };
  editing: boolean = false;
  selectedClient: Client | null = null;

  ngOnInit() {
    // TODO: Load clients from service
  }

  onSubmit() {
    if (this.editing && this.selectedClient) {
      // Update existing client
      const index = this.clients.findIndex(c => c.id === this.selectedClient?.id);
      if (index !== -1) {
        this.clients[index] = { ...this.selectedClient, ...this.newClient };
      }
    } else {
      // Add new client
      this.clients.push({ ...this.newClient, id: Date.now() });
    }
    this.resetForm();
  }

  editClient(client: Client) {
    this.editing = true;
    this.selectedClient = client;
    this.newClient = { ...client };
  }

  deleteClient(id: number | undefined) {
    if (id) {
      this.clients = this.clients.filter(c => c.id !== id);
    }
  }

  resetForm() {
    this.editing = false;
    this.selectedClient = null;
    this.newClient = {
      nom: '',
      email: ''
    };
  }
}
