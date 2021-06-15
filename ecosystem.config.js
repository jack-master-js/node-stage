module.exports = {
    apps: [
        {
            name: 'node-stage',
            script: 'index.js',
            watch: '.',
            ignore_watch: ['node_modules', 'logs', 'test'],
            env: {
                NODE_ENV: 'dev',
            },
            env_prod: {
                NODE_ENV: 'prod',
            },
            env_uat: {
                NODE_ENV: 'uat',
            },
        },
    ],
}
