'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: STRING, primaryKey: true }, // 主键
    title: TEXT, // 标题
    image: STRING, // 封面
    content: TEXT, // 内容
    classify: STRING(64), // 分类
    read_num: INTEGER, // 阅读数量
    summary: TEXT, // 简介
    tag: STRING(64), // 标签
    create_date: STRING // 发布时间
  }, {
    timestamps: false,
    freezeTableName: true
  });

  return Article;
};