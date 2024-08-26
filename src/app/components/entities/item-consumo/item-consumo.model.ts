import { CardapioModel } from "../cardapio/cardapio.model";
import { Estado } from "../enums/estado.enum";
import { TipoBebida } from "../enums/tipo-bebida.enum";
import { TipoItemConsumo } from "../enums/tipo-item-consumo.enum";
import { TipoPrato } from "../enums/tipo-prato.enum";

export interface ItemConsumoModel {
     id?: string | null;
     imagem: string | null;
     imagemContentType: string | null;
     descricao: string | null;
     preco: number | null;
     estadoItemConsumo: Estado | null;
     dataCriacao: Date | null;
     cozinha: string | null;
     origem: string | null;
     dataActualizacao: Date | null;
     tipoItemConsumo: TipoItemConsumo | null;
     tipoPrato: TipoPrato | null;
     tipoBebida: TipoBebida | null;
     cardapio: Pick<CardapioModel, 'id' | 'tipoCardapio' > | null;
}
