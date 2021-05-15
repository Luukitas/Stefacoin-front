export interface Aluno {
    email: string;
    nome: string;
    id?: number;
    senha?: string;
    formacao: string;
    idade: number;
    cursos?:any
}
