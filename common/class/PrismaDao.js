class PrismaDao {
    constructor(Modal) {
        this.Modal = Modal
    }

    async create(row, options = {}) {
        await this.Modal.create({ data: row, ...options })
    }

    async createMany(rows, options = {}) {
        await this.Modal.createMany({ data: rows, ...options })
    }

    async updateById(id, row) {
        if (!id) throw Error('need id')
        await this.Modal.update({
            where: { id },
            data: row,
        })
    }

    async updateMany(where, data) {
        this.Modal.updateMany({ where, data })
    }

    async page(pageIndex = 1, pageSize = 100, where = {}, select, orderBy) {
        const rows = await this.Modal.findMany({
            where,
            select,
            orderBy,
            skip: pageIndex - 1,
            take: pageSize,
        })
        const count = await this.Modal.count({ where })
        return { count, rows }
    }

    async findById(id) {
        if (!id) throw Error('need id')
        const res = await this.Modal.findUnique({
            where: {
                id,
            },
        })
        return res
    }

    async findOne(options = {}) {
        return this.Modal.findFirst(options)
    }

    async findMany(options = {}) {
        return this.Modal.findMany(options)
    }

    async delById(id) {
        if (!id) throw Error('need id')
        await this.Modal.delete({
            where: { id },
        })
    }

    async delMany(options = {}) {
        this.Modal.deleteMany(options)
    }
}

module.exports = PrismaDao
