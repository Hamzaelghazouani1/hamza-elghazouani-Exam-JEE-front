import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client } from '../../core/models/client';
import { HttpService } from '../../core/services/http.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  http = inject(HttpService);
  newClient: Client = {
    nom: '',
    email: ''
  };

  editing: boolean = false;
  selectedClient: Client | null = null;

  ngOnInit() {
    this.http.get<Client[]>('clients').subscribe({
      next: (data) => {
        this.clients = data;
        console.log('Clients fetched successfully:', data);
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    })
  }

  onSubmit() {
    if (this.editing && this.selectedClient) {
      const index = this.clients.findIndex(c => c.id === this.selectedClient?.id);
      if (index !== -1) {
        this.clients[index] = { ...this.selectedClient, ...this.newClient };
      }
    } else {
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
