import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotebookFormComponent } from './notebook/notebook-form/notebook-form.component';
import { RecursoService } from './services/recurso-service';
import { RecursoDto } from './models/recurso-model';
import { AlocacaoComponent } from './alocacao-component/alocacao-component.component';
import {
  Funcionario,
  FuncionarioService,
} from './services/funcionario.service';

declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    NotebookFormComponent,
    AlocacaoComponent,
  ],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  private recursoSrv = inject(RecursoService);
  private funcionarioSrv = inject(FuncionarioService);

  recursos: RecursoDto[] = [];
  funcionarios: Funcionario[] = [];
  loading = false;
  error: string | null = null;

  filtroDataInicio: string | null = null;
  filtroDataFim: string | null = null;

  viewMode: 'todos' | 'reservados' | 'disponiveis' = 'todos';
  tipoFiltro: 'todos' | 'notebook' | 'sala' | 'laboratório' = 'todos';

  ngOnInit() {
    this.fetch();
    this.fetchFuncionarios();
  }

  fetchFuncionarios() {
    this.funcionarioSrv.getFuncionarios().subscribe({
      next: (res) => (this.funcionarios = res ?? []),
      error: (e) => {
        console.error('Erro ao carregar funcionários', e);
        this.error = 'Erro ao carregar funcionários';
      },
    });
  }

  fetch() {
    this.loading = true;
    this.error = null;

    this.recursoSrv.list(this.filtroDataInicio, this.filtroDataFim).subscribe({
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

  get recursosFiltrados(): RecursoDto[] {
    let list = this.recursos;

    if (this.viewMode === 'reservados')
      list = list.filter((r) => !r.disponivel);
    if (this.viewMode === 'disponiveis')
      list = list.filter((r) => r.disponivel);

    const tf = this.tipoFiltro;
    if (tf !== 'todos') {
      list = list.filter((r) => {
        const t = r.tipo.toLowerCase();
        if (tf === 'notebook') return t === 'notebook';
        if (tf === 'sala') return t === 'sala';
        if (tf === 'laboratório') return t === 'laboratório';
        return true;
      });
    }

    return list;
  }

  onSaved() {
    const ok = confirm(`Deseja adicionar o notebook?`);
    if (!ok) return;

    const el = document.getElementById('notebookModal');
    if (el) {
      const inst = bootstrap.Modal.getInstance(el) ?? new bootstrap.Modal(el);
      inst.hide();
    }
    this.fetch();
  }

  deletingId: number | null = null;

  onEdit(r: RecursoDto) {
    console.log('Editar recurso', r);
    alert(`Editar ${r.tipo} #${r.id} — pendente.`);
  }

  onDelete(r: RecursoDto) {
    if ((r.tipo || '').toLowerCase() !== 'notebook') return;

    const ok = confirm(`Excluir Notebook "${r.nomeOuDescricao}" (ID ${r.id})?`);
    if (!ok) return;

    this.deletingId = r.id;
    this.recursoSrv.deleteNotebook(r.id).subscribe({
      next: () => {
        this.deletingId = null;
        this.fetch();
      },
      error: (e) => {
        this.deletingId = null;
        alert('Erro ao excluir: ' + (e?.message ?? 'desconhecido'));
      },
    });
  }
}
