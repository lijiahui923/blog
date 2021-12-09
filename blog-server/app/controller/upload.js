'use strict';

// 文件存储
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async uploadImg() {
    try {
        const stream = await this.ctx.getFileStream();
        const filename = Date.now() + encodeURIComponent(stream.filename);
        const target = path.join(this.config.baseDir, 'app/public/img', filename);
        const writeStream = fs.createWriteStream(target);
        await pump(stream, writeStream);
        this.ctx.body = {
            filename,
            url: `public/${filename}`,
            msg: '上传成功',
            code: 200
        }
    } catch (error) {
        this.ctx.body = {
            code: 500,
            msg: error
        }
    }
  }
}

module.exports = UploadController;
