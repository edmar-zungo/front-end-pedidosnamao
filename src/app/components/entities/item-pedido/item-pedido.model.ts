import { ItemConsumoModel } from "../item-consumo/item-consumo.model"
import { PedidoModel } from "../pedido/pedido.model";

export interface ItemPedidoModel {
    id?: string | null;
    itemConsumo: Pick<ItemConsumoModel, 'id'| 'descricao' | 'tipoItemConsumo'> | null;
    quantidadeItemConsumo: number | null;
    precoItemConsumo: number | null;
    desconto: number | null;
    descricao: string | null;
    pedido: Pick<PedidoModel, 'id' | 'descricao' | 'estadoPedido'> | null;
}
