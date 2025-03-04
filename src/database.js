import fs from 'node:fs/promises'
import { json } from 'node:stream/consumers'

const databasePath = new URL('../db.json', import.meta.url)

console.log(databasePath)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(() => {
            this.#persist()
        })  
    }

    #persist() {
        fs.writeFile( 'db.json', json.stringify(this.#database))
    }

    select(table) {
        const data = this.database[table] ?? []

        return data
    }

    insert (table, data) {
        if (Array.isArray(this.database[table])) {
            this.database[table].push(data)
        } else {
            this.database[table] = [data]
        }
        
        return data
    }

    delete(table, id) {
        const rowIndex = this.database[table].findIndex(row => row.id === id)

        if (rowIndex === -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    Update(table, id, data) {
        const rowIndex = this.database[table].findIndex(row => row.id === id)

        if (rowIndex === -1) {
            this.#database[table] = {id, ...data}
            this.#persist()
        }
    }
}