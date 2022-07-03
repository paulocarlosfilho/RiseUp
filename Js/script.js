const { Client } = require('pg');
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "RiseUp"
})


async function execute(){
    try {  
    await client.connect()
    const result = await client.query("select * from voos order by id_voos")
    console.table(result.rows)    
    } catch (ex) {
        console.log("Alguma coisa aconteceu de errado. ${ex}}")
    } finally {
        Client.end()
    }
};

execute();

function fetchApiData(){
    fetch('https://app-riseup-teste1.herokuapp.com/voos')
    .then(response => response.json())
    .then(data => {
        const list = document.querySelector('#fill_list');

        data.map((item) => {
            const li = document.createElement('li');

            li.setAttribute('id', item.id);
            li.innerHTML = item.origem, item.destino, item.duracao, item.compainha, item.beneficios, item.apartirde;
            list.appendChild(li);

        })
    })
}

//module.exports = {client}
//module.exports = {execute}
module.exports = {fetchApiData}