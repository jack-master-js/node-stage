const logger = require('../utils/logger')

module.exports = (req, res, next) => {
    res.success = () => {
        res.send({
            success: true,
        })
        logger.info(
            `[http server] request ${req.url} ${JSON.stringify(
                req.body
            )} success`
        )
    }

    res.data = (data, total = null) => {
        res.send({
            success: true,
            data,
            total,
        })

        logger.info(
            `[http server] request ${req.url} ${JSON.stringify(
                req.body
            )} response data: ${JSON.stringify(data)}`
        )
    }

    res.error = ({ message }) => {
        res.send({
            success: false,
            message,
        })

        logger.error(
            `[http server] request ${req.url} ${JSON.stringify(
                req.body
            )} error: ${message}`
        )
    }

    res.filePath = () => {
        let file = req.file
        let files = req.files

        if (file) {
            let fileName = req.file.filename
            let filePath = `/uploads/${req.body.name}/${fileName}`
            let data = {
                file: fileName,
                path: filePath,
            }

            logger.info(
                `[http server] request ${
                    req.url
                } response data: ${JSON.stringify(data)}`
            )
            return res.send({
                success: true,
                data: data,
            })
        } else if (files && files.length > 0) {
            let fileList = []
            for (let file of files) {
                let fileName = file.filename
                let filePath = `/uploads/${req.body.name}/${fileName}`

                fileList.push({
                    file: fileName,
                    path: filePath,
                })
            }

            logger.info(
                `[http server] request ${
                    req.url
                } response data: ${JSON.stringify(fileList)}`
            )
            return res.send({
                success: true,
                data: fileList,
            })
        } else {
            throw Error('no file founded!')
        }
    }

    next()
}
