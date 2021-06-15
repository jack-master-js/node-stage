module.exports = {
    port: 3000,
    tcpPort: 3302,
    udpPort: 41234,
    rpcPort: 3001,

    redis: {
        port: 6379, // Redis port
        host: "127.0.0.1", // Redis host
        family: 4, // 4 (IPv4) or 6 (IPv6)
        password: "auth",
        db: 0,
    },

    mongo_db: {
        user: '',
        password: '',
        host: '',
        port: '',
        database: '',
    },

    mysql_db: {
        user: '',
        password: '',
        connectString: '',
    },

    oracle_db: {
        user: '',
        password: '',
        connectString: '',
    }
}