import { PedidoModel } from "./pedido.model";

export interface PedidoPageModel {
    pedidoDTOList: PedidoModel[];
    totalPages: number;
    totalItens: number;
}
