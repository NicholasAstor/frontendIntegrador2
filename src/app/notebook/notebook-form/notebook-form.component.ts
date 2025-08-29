import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NotebookService } from '../../services/notebook.service';
import { CreateNotebookDto } from '../../models/notebook.model';

@Component({
  selector: 'app-notebook-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notebook-form.component.html',
  styleUrl: './notebook-form.component.scss'
})
export class NotebookFormComponent {
  @Output() saved = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private service = inject(NotebookService);

  loading = false;

  form = this.fb.group({
    numeroPatrimonio: [0, [Validators.required, Validators.min(1)]],
    dataAquisicao: ['', Validators.required],
    descricao: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const payload: CreateNotebookDto = {
      numeroPatrimonio: this.form.value.numeroPatrimonio!,
      dataAquisicao: this.form.value.dataAquisicao!,
      descricao: this.form.value.descricao!,
    };

    this.service.cadastrarNotebook(payload).subscribe({
      next: () => {
        this.loading = false;
        this.form.reset({ numeroPatrimonio: 0, dataAquisicao: '', descricao: '' });
        this.saved.emit();
      },
      error: (e) => {
        this.loading = false;
        alert('Erro ao salvar: ' + (e?.message ?? 'desconhecido'));
      }
    });
  }
}
