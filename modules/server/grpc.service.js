exports.sayHello = (call, callback) => {
    // call 是 gRPC 给封装好的对象
    // callback 是client要执行的回调
    // request对象中,只有message中定义的字段
    console.log(call.request)
    // callback 第一个参数,如果报错可以传入 error
    let err = null
    callback(err, { message: 'Hello ' + call.request.name })
}
