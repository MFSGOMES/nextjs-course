import Cliente from "@/core/Cliente";
import Entrada from "./Entrada";
import { useState } from "react";
import Botao from "./Botao";

interface FormularioProps {
    cliente: Cliente
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id
    const [nome, setNome] = useState(props.cliente?.name ?? '')
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0)

    return (
        <div>
            {id ? (
                <Entrada
                    texto="Código"
                    valor={id}
                    somenteLeitura
                    className="mb-4"
                />
            ) : false}
            <Entrada
                texto="Nome"
                valor={nome}
                valorMudou={setNome}
                className="mb-4"
            />
            <Entrada
                texto="Idade"
                tipo="number"
                valor={idade}
                valorMudou={setIdade}
            />
            <div className="flex justify-end mt-7">
                <Botao cor="blue" className="mr-2" >{id ? "Salvar" : "Alterar"}</Botao>
                <Botao>Cancelar</Botao>
            </div>
        </div>
    )
}