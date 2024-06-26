import database from "../repository /db.js";
import {IClient} from "../interfaces/client.js";


export async function getClient(client_id: number = 0) {
    let query = database('client as c')
        .join('type_of_client as toc', 'c.type_of_client', '=', 'toc.id')
        .select(
            'c.id',
            'c.name',
            'c.address',
            'c.city',
            'c.phone',
            'c.pdvnumber',
            'c.pib',
            'c.email',
           ' c.bank_account',
            'c.note',
            'c.type_of_client',
            'toc.name as type_of_client_name'
        ).orderBy([{ column: "name", order: "asc" }])

    if (client_id) {
        query = query.where('c.id', client_id);
    }

    return query.then(rows => {
        const result: IClient[] = [];
        for (let i = 0; i < rows.length; i++) {
            const client: IClient = {
                id: rows[i].id,
                name: rows[i].name,
                address: rows[i].address,
                city: rows[i].city,
                pdvnumber: rows[i].pdvnumber,
                pib: rows[i].pib,
                bank_account: rows[i].bank_account,
                note: rows[i].note,
                phone: rows[i].phone,
                email: rows[i].email,
                type_of_client: {
                    id: rows[i].type_of_client,
                    name: rows[i].type_of_client_name
                }
            }
            result.push(client);
        }
        return result;
    });
}


export async function addClient(newClient: IClient) {
    const dataForInsert = {
        id: newClient.id,
        name: newClient.name,
        address: newClient.address,
        city: newClient.city,
        phone: newClient.phone,
        pdvnumber: newClient.pdvnumber,
        pib: newClient.pib,
        email: newClient.email,
        type_of_client: newClient.type_of_client.id,
        bank_account: newClient.bank_account,
        note: newClient.note
    }
    if (newClient.id) {
       await database('client')
            .where('id', newClient.id)
            .update(dataForInsert);
       return  ({error: false, message: dataForInsert})
    } else {
        const insertedIds = await database("client")
            .insert(dataForInsert);
       dataForInsert.id = insertedIds[0];
        return ({error: false, message: dataForInsert})
    }

}












