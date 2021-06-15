const uploader = require('../../common/utils/uploader')
const uploadFile = uploader.single('file')

class ServerService {
    home(req, res, next) {
        try {
            res.render('welcome')
        } catch (error) {
            next(error)
        }
    }

    upload(req, res, next) {
        try {
            if (!req.body.name) throw Error('need name field.')
            uploadFile(req, res, (err) => {
                if (err) next(err)
                res.filePath()
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ServerService()
