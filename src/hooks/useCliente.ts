import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";
import useTabelaOuForm from "./useTabelaOuForm";

export default function useCliente() {
  // const clientes = [
  //   new Cliente("Bianca", 34, '1'),
  //   new Cliente("José", 33, '2'),
  //   new Cliente("Maria", 40, '3'),
  //   new Cliente("Abigail", 1, '4'),
  // ]

  const { tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } =
    useTabelaOuForm();

  const repo: ClienteRepositorio = new ColecaoCliente();

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio());
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    getClientes();
  }, []);

  function getClientes() {
    repo.obterTodos().then(setClientes);
  }

  function selecionarCliente(cliente: Cliente) {
    setCliente(cliente);
    exibirFormulario();
  }

  function novoCliente() {
    setCliente(Cliente.vazio);
    exibirFormulario();
  }

  function excluirCliente(cliente: Cliente) {
    repo.excluir(cliente).then(getClientes);
  }

  function salvarCliente(cliente: Cliente) {
    repo.salvar(cliente).then(() => {
        exibirTabela()
        getClientes()
    });
  }

  return {
    cliente,
    clientes,
    tabelaVisivel,
    formularioVisivel,
    selecionarCliente,
    novoCliente,
    excluirCliente,
    salvarCliente,
    exibirTabela
  };
}
