import schemaInspector from "knex-schema-inspector";
import database from "../repository /db.js";


const inspector = schemaInspector(database);

export async function listTables() {
    return await inspector.tableInfo()
}

export async function columnInfo(tableName: string) {
    const columns = await inspector.columnInfo(tableName);

    let tekst = '.createTable(\'' + tableName + '\', table => {\n'
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].name == 'id') {
            tekst += "    table.increments('id').primary();\n"
        }
        else {
            if (columns[i].data_type == 'int') {
                tekst += "    table.integer('" + columns[i].name + "')"
            }
            else if (columns[i].data_type == 'varchar') {
                tekst += "   table.string('" + columns[i].name + "'," +  columns[i].max_length + ")"
            }
            else if (columns[i].data_type == 'text') {
                tekst += "   table.text('" + columns[i].name + "')"
            }
            else if (columns[i].data_type == 'date') {
                tekst += "    table.date('" + columns[i].name + "')"
            }
            else if (columns[i].data_type == 'datetime') {
                tekst += "    table.datetime('" + columns[i].name + "')"
            }
            else if (columns[i].data_type == 'decimal') {
                tekst += "    table.decimal('" + columns[i].name + "')"
            }
            else if (columns[i].data_type == 'boolean') {
                tekst += "    table.boolean('" + columns[i].name + "')"
            }
            else if (columns[i].data_type == 'json') {
                tekst += "    table.json('" + columns[i].name + "')"
            }
            if (columns[i].is_nullable == false) {
                tekst += ".notNullable();\n"
            } else {
                tekst += ";\n"
            }
        }
        if (columns[i].foreign_key_column) {
            tekst += "    .unsigned().references('" + columns[i].foreign_key_table + "." + columns[i].foreign_key_column + "');\n"
        }
    }
    tekst += "})\n"
    return tekst
}

export async function getAllTableDefinitions(){
    const tables = await inspector.tables();
    let tekst = ''
    for (let i = 0; i < tables.length; i++) {
        tekst += await columnInfo(tables[i])
    }
    return tekst
}

export async function dropTableText(){
    const tables = await inspector.tables();
    let tekst = ''
    for (let i = 0; i < tables.length; i++) {
        tekst += ".dropTable('" + tables[i] + "')\n"
    }
    return tekst
}

columnInfo('events').then(rezultat => {
    console.log(rezultat)

});

