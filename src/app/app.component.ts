import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotebookFormComponent } from './notebook/notebook-form/notebook-form.component';
import { RecursoService } from './services/recurso-service';
import { RecursoDto } from './models/recurso-model';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule, NotebookFormComponent],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private recursoSrv = inject(RecursoService);

  recursos: RecursoDto[] = [];
  loading = false;
  error: string | null = null;

  // filtro por data (yyyy-MM-dd)
  filtroData: string | null = null;

  // modo de visualização do front
  viewMode: 'todos' | 'reservados' | 'disponiveis' = 'todos';

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.error = null;
    this.recursoSrv.list(this.filtroData).subscribe({
      next: (res) => {
        this.recursos = res ?? [];
        this.loading = false;
      },
      error: (e) => {
        this.error = e?.message ?? 'Erro ao carregar recursos';
        this.loading = false;
      },
    });
  }

  // Getter que aplica o filtro no front
  get recursosFiltrados(): RecursoDto[] {
    if (this.viewMode === 'reservados') return this.recursos.filter(r => !r.disponivel);
    if (this.viewMode === 'disponiveis') return this.recursos.filter(r => r.disponivel);
    return this.recursos;
  }

  // Fecha modal e recarrega a tabela após salvar
  onSaved() {
    const el = document.getElementById('notebookModal');
    if (el) {
      const inst = bootstrap.Modal.getInstance(el) ?? new bootstrap.Modal(el);
      inst.hide();
    }
    this.fetch();
  }

  // estado para bloquear o ícone durante exclusão
  deletingId: number | null = null;

  onEdit(r: RecursoDto) {

    // Placeholder elegante por enquanto:
    console.log('Editar recurso', r);
    alert(`Editar ${r.tipo} #${r.id} — pendente.`);
  }

  onDelete(r: RecursoDto) {
    // aparece só para Notebook pelo *ngIf*, mas ainda valido o tipo por segurança
    if ((r.tipo || '').toLowerCase() !== 'notebook') return;

    const ok = confirm(`Excluir Notebook "${r.nomeOuDescricao}" (ID ${r.id})?`);
    if (!ok) return;

    this.deletingId = r.id;
    this.recursoSrv.deleteNotebook(r.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.fetch(); // recarrega a tabela
      },
      error: (e) => {
        this.deletingId = null;
        alert('Erro ao excluir: ' + (e?.message ?? 'desconhecido'));
      }
    });
  }

}
