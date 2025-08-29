export interface RecursoDto {
  id: number;
  tipo: string;
  nomeOuDescricao: string;
  disponivel: boolean;
  dataReserva?: string | null;
}
