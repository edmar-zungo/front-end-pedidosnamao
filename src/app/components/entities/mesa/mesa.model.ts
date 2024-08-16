import { Estado } from "../enums/estado.enum";

export interface MesaModel {
     id?: string | null;
     numero: string;
     sequencia: number | null;
     quantidadeLugares: number | null;
     estadoMesa: Estado | null;
     descricao: string | null;
}
