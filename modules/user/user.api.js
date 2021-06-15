const request = require('../../common/utils/fetcher')

exports.getUserInfo = (params) => {
    return request('http://localhost:3000/api/userInfo', params)
}
