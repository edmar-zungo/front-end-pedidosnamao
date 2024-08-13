import { TipoCardapio } from "../enums/tipo-cardapio.enum";

export interface CardapioModel {
     id?: string | null;
     descricao: string;
     tipoCardapio: TipoCardapio;
}
