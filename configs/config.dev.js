module.exports = {
    port: 3000,
    tcpPort: 3302,
    udpPort: 41234,
    rpcPort: 3001,

    redis: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: 'auth',
        db: 0,
    },

    mongo_db: {
        user: 'dev',
        password: '123456',
        host: '192.168.72.128',
        port: '27017',
        database: 'dev',
    },

    mysql_db: {
        user: 'root',
        password: '123456',
        host: '192.168.72.128',
        port: '3306',
        database: 'dev',
    },

    oracle_db: {
        user: '',
        password: '',
        connectString: '',
    },
}
