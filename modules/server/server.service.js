class ServerService {
    home(req, res, next) {
        try {
            res.render('pages/home', {
                layout: 'layouts/main',
                title: `Express`,
            })
        } catch (error) {
            next(error)
        }
    }

    upload(req, res, next) {
        try {
            res.filePath()
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ServerService()
