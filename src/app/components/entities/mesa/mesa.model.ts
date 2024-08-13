import { Estado } from "../enums/estado.enum";

export interface MesaModel {
     id?: string | null;
     numero: string;
     sequencia: number;
     quantidadeLugares: number;
     estadoMesa: Estado | null;
     descricao: string;
}
