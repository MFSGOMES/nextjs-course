import Botao from "@/components/Botao";
import Formulario from "@/components/Formulario";
import Layout from "@/components/Layout";
import Tabela from "@/components/Tabela";
import useCliente from "@/hooks/useCliente";

export default function Home() {

  const {
    cliente,
    clientes,
    tabelaVisivel, 
    excluirCliente,
    novoCliente,
    salvarCliente,
    selecionarCliente,
    exibirTabela
  } = useCliente()

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout title="Cadastro Simples">
        {tabelaVisivel ? (
          <>
            <div className="flex justify-end">
              <Botao cor="green" className="mb-4"
                onClick={novoCliente}>
                Novo Cliente
              </Botao>
            </div>
            <Tabela
              clientes={clientes}
              selecionarCliente={selecionarCliente}
              excluirCliente={excluirCliente}
            />
          </>
        ) : (
          <Formulario
            cliente={cliente}
            clienteMudou={salvarCliente}
            onCancelClick={() => exibirTabela} />
        )}

      </Layout>
    </div>
  )
}
