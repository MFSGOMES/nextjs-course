export default class Cliente {
    #id: string | null;
    #name: string;
    #idade: number;

    constructor(name: string, idade: number, id: string | null = null){
        this.#id = id
        this.#name = name
        this.#idade = idade
    }

    static vazio() {
        return new Cliente('', 0)
    }

    get id(){
        return this.#id
    }

    get name(){
        return this.#name
    }

    get idade(){
        return this.#idade
    }
}