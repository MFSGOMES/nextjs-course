import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { firestore } from "../config";
import {
  SnapshotOptions,
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  where,
  limit,
  getDocs,
  doc,
} from "@firebase/firestore";

const clientesCollection = collection(firestore, "/clientes");

export default class ColecaoCliente implements ClienteRepositorio {
  #conversor = {
    toFirestore(cliente: Cliente) {
      return {
        id: cliente.id,
        nome: cliente.nome,
        idade: cliente.idade,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Cliente {
      const dados = snapshot.data(options);
      return new Cliente(dados.nome, dados.idade, snapshot.id);
    },
  };

  //   async salvar(cliente: Cliente): Promise<Cliente> {
  //     if (cliente?.id) {
  //         await this.#colecao().doc(cliente.id).set(cliente)
  //         return cliente
  //     }else{
  //         const docRef = await this.#colecao().add(cliente)
  //         const doc = await docRef.get()
  //         return doc.data
  //     }
  //   }

  //   async excluir(cliente: Cliente): Promise<void> {
  //     return  this.#colecao().doc(cliente.id).delete;
  //   }

  async obterTodos() {
    const todosQuery = query(
      clientesCollection,
      where("nome", "!=", null)
    );
    
    const querySnapshot = await getDocs(todosQuery);
    console.log(querySnapshot);

    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    console.log(result);
    querySnapshot.forEach((snapshot) => {
      console.log(snapshot);
      result.push(snapshot);
    });
  }

  //   #colecao() {
  //     return firestore.collection('clientes').withConverter(this.#conversor)
  //   }
}
