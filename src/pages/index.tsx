import ColecaoCliente from "@/backend/db/ColecaoCliente";
import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { useEffect, useState } from "react";

export default function Home() {
  // const clientes = [
  //   new Cliente("Bianca", 34, '1'),
  //   new Cliente("José", 33, '2'),
  //   new Cliente("Maria", 40, '3'),
  //   new Cliente("Abigail", 1, '4'),
  // ]

  const repo: ClienteRepositorio = new ColecaoCliente()

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [visible, setVisible] = useState<'form' | 'table'>('table')

  useEffect(()=>{
    // repo.obterTodos().then(setClientes)
    repo.obterTodos()
  }, [])

  function clienteSelecionado(cliente: Cliente) {
    // console.log(cliente)
    setCliente(cliente)
    setVisible('form')
    // console.log(cliente)
    // console.log(`Editar... ${cliente.nome}`);
  }

  function novoCliente() {
    setCliente(Cliente.vazio)
    setVisible('form')
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.nome}`);
  }

  function salvarCliente(cliente: Cliente) {
    console.log(`Salvar... ${cliente.nome}`);
    setVisible('table')
  }


  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Cadastro Simples">
        {visible === 'table' ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4"
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              clienteSelecionado={clienteSelecionado}
              clienteExcluido={clienteExcluido}
            />
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            onCancelClick={() => setVisible('table')} />
        )}

      </Layout>
    </div>
  )
}
