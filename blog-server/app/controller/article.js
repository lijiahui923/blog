/*
 * @Description: 
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-07 16:48:34
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-22 15:21:42
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
        const Op = this.ctx.model.Sequelize.Op;
        const { pageNum = 1, pageSize = 10, search } = ctx.query;
        console.log(pageNum, pageSize)
        // 分页
        const query = {
            offset: toInt(pageNum) * toInt(pageSize) - toInt(pageSize),
            limit: toInt(pageSize)
        };
        let where = {}
        if (search) {
          where = {
            [Op.or]: [{ title: { [Op.like]: '%' + search + '%' } }, //like和or连用
                    { content: { [Op.like]: '%' + search + '%' } },
                    { summary: { [Op.like]: '%' + search + '%' } },
                ]
          }
        }
        const data = await ctx.model.Article.findAndCountAll({ where, ...query, raw: true });
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
