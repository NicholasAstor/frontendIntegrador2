export interface CreateNotebookDto {
  numeroPatrimonio: number;
  dataAquisicao: string;
  descricao: string;
}

export interface NotebookDto extends CreateNotebookDto {
  id: number;
}
