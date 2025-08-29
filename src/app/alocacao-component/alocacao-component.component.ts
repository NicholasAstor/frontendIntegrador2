import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alocacao-component.component.html',
  styleUrls: ['./alocacao-component.component.scss'],
})
export class AlocacaoComponent {
  formData = {
    data: '',
    notebook: '',
    tipo: '',
  };

  enviarFormulario() {
    console.log('Dados enviados:', this.formData);
    alert(`Reserva feita:
      Data: ${this.formData.data}
      Notebook: ${this.formData.notebook}
      Tipo: ${this.formData.tipo}`);
  }
}
