/*
 * @Description: 
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-07 16:48:34
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-15 17:15:00
 */
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
        const { pageNum = 1, pageSize = 10 } = ctx.query;
        // 分页
        const query = {
            offset: toInt(pageNum) * toInt(pageSize) - toInt(pageSize),
            limit: toInt(pageSize)
        };
        const data = await ctx.model.Article.findAndCountAll({ ...query, raw: true });
				ctx.status = 200;
        ctx.body = {
            data: data,
						msg: '查询成功',
            code: 200
        }
    }

    async show() {
        const ctx = this.ctx;
				console.log(ctx.params.id);
				const data = await ctx.model.Article.findByPk(ctx.params.id);
        ctx.body = {
					data: data,
					msg: '查询成功',
					code: 200
			}
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
