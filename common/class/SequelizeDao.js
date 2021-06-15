class SequelizeDao {
    constructor(Modal) {
        this.Modal = Modal
    }

    async create(row, options = {}) {
        await this.Modal.create(row, options)
    }

    async createMany(rows, options = {}) {
        await this.Modal.bulkCreate(rows, options)
    }

    async updateById(id, row) {
        if (!id) throw Error('need id')
        const res = await this.Modal.update(row, {
            where: {
                id,
            },
        })
        if (res[0] === 0) throw Error('no record')
    }

    async updateMany(options, rows) {
        this.Modal.update(rows, options)
    }

    async page(
        page = 1,
        pageSize = 100,
        where = {},
        attributes = {},
        order = [['createdAt', 'DESC']]
    ) {
        let filter = {
            where,
            attributes,
            order,
            offset: page - 1,
            limit: pageSize,
        }
        const { count, rows } = await this.Modal.findAndCountAll(filter)
        return { count, rows }
    }

    async findById(id) {
        if (!id) throw Error('need id')
        const res = await this.Modal.findByPk(id)
        if (res === null) throw Error('no record')
        return res.dataValues
    }

    async findOne(where = {}) {
        let filter = {
            where,
        }
        return this.Modal.findOne(filter)
    }

    async findMany(filter = {}) {
        return this.Modal.findAll(filter)
    }

    async delById(id) {
        if (!id) throw Error('need id')
        const res = await this.Modal.destroy({
            where: {
                id,
            },
        })
        if (res === 0) throw Error('no record')
    }

    async delMany(options) {
        this.Modal.destroy(options)
    }
}

module.exports = SequelizeDao
