import Cliente from "@/core/Cliente";
import ClienteRepositorio from "@/core/ClienteRepositorio";
import { firestore } from "../config";
import {
  SnapshotOptions,
  collection,
  QueryDocumentSnapshot,
  DocumentData,
  query,
  getDocs,
  deleteDoc,
  doc,
} from "@firebase/firestore";
import { DocumentReference, setDoc, updateDoc } from "firebase/firestore";

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

  async salvar(cliente: Cliente): Promise<void> {
    const clData = {
      nome: cliente.nome,
      idade: cliente.idade,
    };

    if (cliente?.id) {
      const clDoc = doc(firestore, `clientes/${cliente.id}`);
      return await updateDoc(clDoc, clData);
    } else {
      const timestamp: string = Date.now().toString();
      const clDoc = doc(firestore, `clientes/${timestamp}`);
      return await setDoc(clDoc, clData);
    }
  }

  async excluir(cliente: Cliente): Promise<void> {
    const _cl = doc(firestore, `clientes/${cliente.id}`);
    return await deleteDoc(_cl);
  }

  async obterTodos(): Promise<Cliente[]> {
    const todosQuery = query(clientesCollection);
    const querySnapshot = await getDocs(todosQuery);
    const clientes: Cliente[] = [];

    if (!querySnapshot.empty) {
      querySnapshot.docs.forEach((doc: DocumentData) => {
        const cl = doc.data();
        if (clientes.filter((c) => c.nome === cl.nome).length == 0) {
          clientes.push(new Cliente(cl.nome, cl.idade, doc.id));
        }
      });

      return clientes;
    }

    return [];
  }
}
