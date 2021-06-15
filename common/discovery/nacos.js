const NacosNamingClient = require('nacos').NacosNamingClient
const NacosConfigClient = require('nacos').NacosConfigClient
const logger = require('../utils/logger')

exports.client = new NacosNamingClient({
    logger,
    serverList: '192.168.72.128:8848',
    namespace: 'public',
})

exports.configClient = new NacosConfigClient({
    serverAddr: '192.168.72.128:8848',
})

// await client.ready();

// registry instance
// await client.registerInstance(serviceName, {
//   ip: '47.119.171.85',
//   port: 3001,
// });

// subscribe instance
// client.subscribe(serviceName, hosts => {
//   console.log(hosts);
// });

// deregister instance
// await client.deregisterInstance(serviceName, {
//   ip: '1.1.1.1',
//   port: 8080,
// });

// get config once
// const content = await configClient.getConfig("test", "DEFAULT_GROUP");

// listen data changed
// configClient.subscribe(
//   {
//     dataId: "test",
//     group: "DEFAULT_GROUP",
//   },
//   (content) => {
//     console.log(content);
//   }
// );

// publish config
// const content = await configClient.publishSingle(
//   "test",
//   "DEFAULT_GROUP",
//   "测试2"
// );
// console.log("getConfig = ", content);

// remove config
// await configClient.remove("test", "DEFAULT_GROUP");
