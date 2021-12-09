'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class ArticleController extends Controller {
    async index() {
        const ctx = this.ctx;
        const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
        ctx.body = await ctx.model.Article.findAll(query);
    }

    async show() {
        const ctx = this.ctx;
        ctx.body = await ctx.model.Article.findByPk(toInt(ctx.params.id));
    }

    async create() {
        const ctx = this.ctx;
        try {
            const { title, image, content, classify, summary, tag } = ctx.request.body;
            const id = ctx.helper.uuid();
            const create_date = (new Date()).getTime();
            const read_num = 0;
            await ctx.model.Article.create({ id, image, content, title, classify, summary, tag, read_num, create_date });
            ctx.status = 200;
            ctx.body = {
                code: 200,
                msg: '新增一条数据'
            };
        } catch (error) {
            console.log(error);
        }
    }

    async update() {
        const ctx = this.ctx;
        const id = toInt(ctx.params.id);
        const user = await ctx.model.Article.findByPk(id);
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
        const user = await ctx.model.Article.findByPk(id);
        if (!user) {
            ctx.status = 404;
            return;
        }

        await user.destroy();
        ctx.status = 200;
    }
}

module.exports = ArticleController;
