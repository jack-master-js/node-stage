const Oracledb = require('oracledb')
const logger = require('../utils/logger')
const {oracle_db} = require('../../config')

class Oracle {
    constructor(){
        this.pool = null
    }

    async createPoll() {
        Oracledb.autoCommit = true
        Oracledb.outFormat = Oracledb.OBJECT

        const pool = await Oracledb.createPool({
            user: oracle_db.user,
            password: oracle_db.password,
            connectString: oracle_db.connectString,
            poolMin: 1,
            poolMax: 20,
        })

        setInterval(()=>{
            logger.info(`[ORACLE STATUS] default connection busy: ${pool.connectionsInUse}, connection open: ${pool.connectionsOpen}`);
        }, 15000)

        return pool
    }
    
    async getConnection() {
        if(!this.pool) this.pool = await this.createPoll()
        return this.pool.getConnection()
    }

    //单句执行
    async execute(sql, param = {}, option = {}) {
        let conn = await this.getConnection()
        try {
            let result = await conn.execute(sql, param, option)
            await conn.close()
            return result
        }catch(e) {
            logger.error(`[SQL ERROR] ${e.message}`);
            await conn.close()
            throw e
        }
    }
    //一般用于同时插入或修改多条数据，可执行存储过程，不能执行多条查询语句
    async executeMany(sql, params = [], option = {}) {
        let conn = await this.getConnection()
        try {
            let result = await conn.executeMany(sql, params, option) 
            await conn.close()
            return result
        }catch(e) {
            logger.error(`[SQL ERROR] ${e.message}`);
            await conn.close()
            throw e
        }
    }
    //可执行多条查询语句
    async atomic(tasks) {
        let conn = await this.getConnection()
        try {
            let results = []

            for (let task of tasks) {
                let {sql, param, option} = task
                option = option || {}
                option.autoCommit = false
                let result = await conn.execute(sql, param, option)
                results.push(result)
            }
            await conn.commit()
            await conn.close()
            return results
        }catch(e) {
            logger.error(`[SQL ERROR] ${e.message}`);
            await conn.rollback()
            await conn.close()
            throw e
        }
    }
}

module.exports = new Oracle()