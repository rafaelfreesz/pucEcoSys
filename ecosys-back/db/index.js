const { Pool } = require('pg');
const {user, host, database, password, port} = require('../secrets/db_configurations')

const pool = new Pool({user, host, database, password, port});

const executarQuery = (sql, valores='') => {
    return new Promise((resolve,reject)=>{
        pool.query(sql,valores,(erro, resposta) => {
            if(erro) return reject(erro);
            return resolve(resposta.rows);
        })
    })
}

module.exports = {pool, executarQuery};