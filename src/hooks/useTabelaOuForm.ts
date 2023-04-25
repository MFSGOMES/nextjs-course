import { useState } from "react";

export default function useTabelaOuForm(){
  const [visible, setVisible] = useState<"form" | "table">("table");

  const exibirTabela = () => setVisible("table")
  const exibirFormulario = () => setVisible("form")

  return {
    tabelaVisivel: visible === 'table',
    formularioVisivel: visible === 'form',
    exibirTabela,
    exibirFormulario,
  }
}