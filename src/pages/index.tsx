import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import Cliente from "@/core/Cliente";

export default function Home() {
  const clientes = [
    new Cliente("Bianca", 34, '1'),
    new Cliente("José", 33, '2'),
    new Cliente("Maria", 40, '3'),
    new Cliente("Abgail", 1, '4'),
  ]

  function clienteSelecionado(cliente: Cliente) {
    console.log(`Editar... ${cliente.name}`);
  }

  function clienteExcluido(cliente: Cliente) {
    console.log(`Excluir... ${cliente.name}`);
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Cadastro Simples">
        <div className="flex justify-end">
          <Botao cor="green" className="mb-4">Novo Cliente</Botao>
        </div>
        {/* <Tabela
          clientes={clientes}
          clienteSelecionado={clienteSelecionado}
          clienteExcluido={clienteExcluido}
        /> */}

        <Formulario cliente={clientes[0]} />
      </Layout>
    </div>
  )
}
