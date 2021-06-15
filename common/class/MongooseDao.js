class MongooseDao {
    constructor(Modal) {
        this.Modal = Modal
    }

    async create(row) {
        return this.Modal.create(row)
    }

    async createMany(rows) {
        return this.Modal.create(rows)
    }

    async updateById(id, row) {
        if (!id) throw Error('need id')
        row.updatedAt = Date.now()
        try {
            const res = await this.Modal.findByIdAndUpdate(id, row)
            return res
        } catch (error) {
            throw Error('no record')
        }
    }

    async updateMany(filter, rows) {
        return this.Modal.updateMany(filter, rows)
    }

    async page(
        page = 1,
        pageSize = 100,
        where = {},
        select = null,
        sort = '-createdAt'
    ) {
        const rows = await this.Modal.find()
            .where(where)
            .select(select)
            .sort(sort)
            .skip(page - 1)
            .limit(pageSize)
            .exec()
        const count = await this.Modal.countDocuments(where)
        return { count, rows }
    }

    async findById(id) {
        if (!id) throw Error('need id')
        try {
            const res = await this.Modal.findById(id)
            return res
        } catch (error) {
            throw Error('no record')
        }
    }

    async findOne(filter = {}) {
        return this.Modal.findOne(filter)
    }

    async findMany(filter = {}) {
        return this.Modal.find(filter)
    }

    async delById(id) {
        if (!id) throw Error('need id')
        try {
            const res = await this.Modal.findByIdAndRemove(id)
            return res
        } catch (error) {
            throw Error('no record')
        }
    }

    async delMany(filter) {
        return this.Modal.remove(filter)
    }
}

module.exports = MongooseDao
