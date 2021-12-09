/*
 * @Description: 文章相关的接口
 * @Version: 1.0
 * @Autor: lijiahui
 * @Date: 2021-11-15 09:58:35
 * @LastEditors: lijiahui
 * @LastEditTime: 2021-12-09 16:05:20
 */
import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}
