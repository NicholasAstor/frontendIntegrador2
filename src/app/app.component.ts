import { Component } from '@angular/core';
import {NotebookFormComponent} from './notebook/notebook-form/notebook-form.component';

@Component({
  selector: 'app-root',
  imports: [
    NotebookFormComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

}
