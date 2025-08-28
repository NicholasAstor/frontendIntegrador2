import { Component } from '@angular/core';
import { NotebookFormComponent } from './notebook/notebook-form/notebook-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NotebookFormComponent],
  template: `
    <div class="container py-4">
      <h3 class="mb-3">Notebooks</h3>
      <app-notebook-form></app-notebook-form>
    </div>
  `
})

export class AppComponent {
  title = 'frontend';

}
