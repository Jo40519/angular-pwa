import { MarcaCarro } from "./marca-carro";

export class Seguro {
    id!: string;
    marcaCarro!: MarcaCarro;
    nomeProprietario!: string;
    sobrenomeProprietario!: string;
    modeloCarro!: string;
    placaCarro!: string;
    dataNascimentoProprietario!: string;
}