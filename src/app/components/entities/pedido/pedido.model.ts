import { Estado } from "../enums/estado.enum";
import { MesaModel } from "../mesa/mesa.model";

export interface PedidoModel {
    id?: string | null;
    dataCriacao: Date | null;
    sequencia: number | null;
    numero: string | null;
    dataActualizacao: Date | null;
    mesa: Pick<MesaModel, 'id' | 'descricao' | 'estadoMesa'> | null;
    estadoPedido: Estado | null;
    descricao: string | null;
    deliver: boolean | null;
    enderecoEntregaDetalhado: string | null;
    tempoEntrega: number | null;
    descricaoEntrega: string | null;
    valorEntrega: number | null;
    totalPagar: number | null;
    totalPago: number | null;
    totalTroco: number | null;
}
