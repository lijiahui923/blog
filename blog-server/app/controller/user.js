'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class UserController extends Controller {
    async index() {
        const ctx = this.ctx;
        const { pageNum, pageSize } = ctx.query;
        // 分页
        const query = {
            offset: toInt(pageNum) * toInt(pageSize) - toInt(pageSize),
            limit: toInt(pageSize)
        };
        const { rows } = await ctx.model.User.findAndCountAll({ ...query, raw: true });
        ctx.body = {
            data: rows,
            length: rows.length,
            code: 200
        }
    }

    async show() {
        const ctx = this.ctx;
        ctx.body = await ctx.model.User.findByPk(toInt(ctx.params.id));
    }

    async create() {
        const ctx = this.ctx;
        console.log(ctx.request.body);
        console.log(ctx.helper.uuid());
        const { name, age } = ctx.request.body;
        const user = await ctx.model.User.create({ name, age });
        ctx.status = 200;
        ctx.body = user;
    }

    async update() {
        const ctx = this.ctx;
        const id = toInt(ctx.params.id);
        const user = await ctx.model.User.findByPk(id);
        if (!user) {
            ctx.status = 404;
            return;
        }

        const { name, age } = ctx.request.body;
        await user.update({ name, age });
        ctx.body = user;
    }

    async destroy() {
        const ctx = this.ctx;
        const id = toInt(ctx.params.id);
        const user = await ctx.model.User.findByPk(id);
        if (!user) {
            ctx.status = 404;
            return;
        }

        await user.destroy();
        ctx.status = 200;
    }
}

module.exports = UserController;
