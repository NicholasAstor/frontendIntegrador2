import { Component, NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component ({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.scss'
})

export class CalendarioComponente {
  dataAtual = new Date();
  semanas: Date[][] = [];
  inicioMes: Date | null = null;
  finalMes: Date | null = null;

  constructor() {
    this.criarCalendario();
  }


  criarCalendario() {
    this.semanas = [];

    const ano = this.dataAtual.getFullYear();
    const mes = this.dataAtual.getMonth();

    const primeiroDiadoMes = new Date(ano, mes, 1);
    const ultimoDiadoMes = new Date(ano, mes + 1, 0);

    let primeiroDia = new Date(primeiroDiadoMes);
    primeiroDia.setDate(primeiroDia.getDate() - primeiroDia.getDate());

    let ultimoDia = new Date(ultimoDiadoMes);
    ultimoDia.setDate(ultimoDia.getDate() + (6 - ultimoDia.getDate()));


    let data = new Date(primeiroDiadoMes);

    while(data <= ultimoDia) {
      const semana: Date[] = [];
      for (let i = 0; i < 7; i++) {
        semana.push(new Date(data));
        data.setDate(data.getDate()+ 1);
      }

      this.semanas.push(semana);
    }
  }

  mesAnterior() {
    this.dataAtual = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth()- 1, 1);
    this.criarCalendario();
  }

  proximoMes() {
    this.dataAtual = new Date(this.dataAtual.getFullYear(), this.dataAtual.getMonth() + 1, 1)
  }


  selecionarData(dia: Date) {
    if (!this.inicioMes || (this.inicioMes && this.finalMes)) {
      this.inicioMes = dia;
      this.finalMes = null;
    } else if (this.inicioMes && !this.finalMes && dia > this.inicioMes) {
      this.finalMes = dia;
    } else {
      this.inicioMes = dia;
      this.finalMes = null;
    }
  }

  intervalo(dia: Date): boolean {
    if (this.inicioMes && this.finalMes) {
      return dia >= this.inicioMes && dia <= this.finalMes;
    }
    return false;
  }

  MesmoDia(dia1: Date | null, dia2: Date): boolean {
    return dia1?.toDateString() === dia2.toDateString();
  }

}