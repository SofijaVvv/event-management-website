import schemaInspector from "knex-schema-inspector";
import database from "../repository /db.js";
import fs from 'fs';

const inspector = schemaInspector(database);



export async function columnInfo(tableName: string, definitions: boolean = false) {
    const columns = await inspector.columnInfo(tableName);
    let interface_definition = 'export interface ' + tableName + ' {\n'
    let tekst = '.createTable(\'' + tableName + '\', table => {\n'
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].name == 'id') {
            tekst += "    table.increments('id').primary();\n"
            interface_definition += "    id: number;\n"
        }
        else {
            if (columns[i].data_type == 'int' || columns[i].data_type == 'int unsigned') {
                tekst += "    table.integer('" + columns[i].name + "')"
                if (columns[i].foreign_key_column) {
                    tekst += ".unsigned().references('" + columns[i].foreign_key_table + "."
                        + columns[i].foreign_key_column + "');\n"
                }
                interface_definition += "    " + columns[i].name + ": number;\n"
            }
            else if (columns[i].data_type == 'varchar') {
                tekst += "    table.string('" + columns[i].name + "'," +  columns[i].max_length + ")"
                interface_definition += "    " + columns[i].name + ": string;\n"
            }
            else if (columns[i].data_type == 'text') {
                tekst += "    table.text('" + columns[i].name + "')"
                interface_definition += "    " + columns[i].name + ": string;\n"
            }
            else if (columns[i].data_type == 'date') {
                tekst += "    table.date('" + columns[i].name + "')"
                interface_definition += "    " + columns[i].name + ": string;\n"
            }
            else if (columns[i].data_type == 'datetime') {
                tekst += "    table.datetime('" + columns[i].name + "')"
                interface_definition += "    " + columns[i].name + ": string;\n"
            }
            else if (columns[i].data_type == 'decimal') {
                tekst += "    table.decimal('" + columns[i].name + "')"
                interface_definition += "    " + columns[i].name + ": number;\n"
            }
            else if (columns[i].data_type == 'boolean') {
                tekst += "    table.boolean('" + columns[i].name + "')"
                interface_definition += "    " + columns[i].name + ": boolean;\n"
            }
            else if (columns[i].data_type == 'json') {
                tekst += "    table.json('" + columns[i].name + "')"
                interface_definition += "    " + columns[i].name + ": any;\n"
            }
            if (columns[i].is_nullable == false) {
                tekst += ".notNullable();\n"
            } else {
                if (tekst.charAt(tekst.length - 1) != '\n') {
                    tekst += ";\n"
                }
            }


        }

    }
    tekst += "})\n"
    interface_definition += "}\n"
    if (definitions) {
        return interface_definition
    }
    return tekst
}

export async function getAllTableDefinitions(only_interface: boolean = false){
    const tables = await inspector.tables();
    let tekst = ''
    for (let i = 0; i < tables.length; i++) {
        tekst += await columnInfo(tables[i], only_interface)
    }
    return tekst
}



export async function listTables() {
    return await inspector.tableInfo()
}


export async function dropTableText(){
    const tables = await inspector.tables();
    let tekst = ''
    for (let i = 0; i < tables.length; i++) {
        tekst += ".dropTable('" + tables[i] + "')\n"
    }
    return tekst
}

// write data to file

async function writeToFile(fileName: string, data: string
) {
    fs.writeFile(fileName, data, function (err) {
        if (err) return console.log(err);
        console.log('Data written to file');
    });
}


getAllTableDefinitions(false).then(rezultat => {
   void writeToFile('database_definition.sql', rezultat);
});
getAllTableDefinitions(true).then(rezultat => {
    void writeToFile('interface_definition.sql', rezultat);
});
