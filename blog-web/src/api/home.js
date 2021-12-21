/*
 * @Description: 首页的相关接口
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-12-13 10:42:27
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-15 16:30:59
 */
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function queryById(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}