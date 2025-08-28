export interface CreateNotebookDto {
  numeroPatrimonio: number;
  dataAquisicao: string; // ISO date (yyyy-MM-dd)
  descricao: string;
}

export interface NotebookDto extends CreateNotebookDto {
  id: number;
}
