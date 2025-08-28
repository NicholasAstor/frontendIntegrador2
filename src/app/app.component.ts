import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponente } from "./calendario/calendario.component";

@Component({
  selector: 'app-root',
  imports: [CalendarioComponente],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  
}
