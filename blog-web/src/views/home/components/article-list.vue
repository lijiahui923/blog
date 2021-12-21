<template>
	<div id="articleList">
		<div class="column">
			<div class="card carss" v-for="(item,index) in articleData" :key="item.id" ref='articleList'>
					<div class="card-image">
						<router-link class="image" :to="{name: 'Detail', params: {id: item.id}}">
							<img class="thumbnail" width="100%" :src="item.image" :alt="item.title">
						</router-link>
					</div>
					<article class="card-content" role="article">
						<div class="article-meta">
							<div class="level-left">{{item.create_date}}</div>
						</div>
						<h1 class="title">
							<router-link class="link-muted" :to="{name: 'Detail', params: {id: item.id}}">
								{{item.title}}
							</router-link>
						</h1>
						<div class="content">
							<p class="pre" v-if="index == 0">{{item.summary}}</p>
							<p v-else>{{item.summary}}</p>
						</div>
						<router-link class="article-more" :to="{name: 'Detail', params: {id: item.id}}">
							阅读更多
						</router-link>
					</article>
			</div>
		</div>
	</div>
</template>

<script>
import { fetchList } from '@/api/home'
	export default {
		name: "article-list",
    data() {
      return {
        articleData: []
      }
    },
		async created() {
      await this.getArticleList()
      // await this.setImageAttr()
		},
    mounted() {
      // window.addEventListener('scroll', this.setImageAttr)
    },
		methods: {
      formatDate(time) {
          let date = new Date(time);
          return date.toJSON().substr(0, 19).replace('T', ' ').replace(/-/g, '-');
      },
      async getArticleList() {
        const { data } = await fetchList()
        this.articleData = data.rows.map(item => {
          if (item.create_date) {
            item.create_date = this.formatDate(Number(item.create_date))
          } else {
            item.create_date = ''
          }
          return item
        })
      },
			// setImageAttr(){
			// 	this.$refs.articleList.forEach(el => {
			// 		if (!el.getAttribute('class').includes('carss')) {
			// 			el.classList.add('carss')
			// 			let img = el.childNodes[0].children[0].children[0];
      //       console.log(img.src)
			// 			// img.src = img.dataset.src;
			// 			img.setAttribute('lazy', 'loaded');
			// 		}
			// 	})
			// },
			// 滑动出现底部按钮
			handleScroll(ele) {
				if (this.isElementNotInViewport(ele)) {
					return false;
				} else {
					return true;
				}
			}
		},
    destroyed() {
      // 在组件生命周期结束的时候销毁。
      // window.removeEventListener('scroll', this.setImageAttr);
    }
	}
</script>

<style scoped>
	.column {
		width: 100%;
		/* margin: 10%; */
	}

	.card {
		border-radius: var(--radius);
		overflow: hidden;
		opacity: 0;
		transform: scale(0.6);
		width: 100%;
		margin-top: calc(var(--margin) / 2);
		box-shadow: var(--shadow);
		transition: opacity 250ms 250ms ease, transform 300ms 250ms ease;
	}

	.carss {
		opacity: 1;
		transform: scale(1);
		transition: opacity 0.3s ease-out 0s, transform 0.3s ease-out 0s;
		transform-origin: center top;
	}

	.thumbnail {
		vertical-align: middle;
		/* background-image: url('../../../assets/images/loading.svg');
		background-repeat: no-repeat;
		background-position: center; */
		height: 320px;
		object-fit: cover;
	}
	img.thumbnail[lazy=loading] {
	    opacity: 0;
	}
    img.thumbnail[lazy=loaded]{
		opacity: 1;
    background-image: none;
		transition: opacity .4s ease-in 0s;
	}
	.card:first-child {
		margin-top: 0;
	}

	.card-content {
		padding: 21px;
		box-sizing: border-box;
		background-color: var(--bgcolor);
		border-radius: 0;
	}

	.level-left {
		color: #7a7a7a;
		font-size: 12px;
		margin-bottom: 12px;
		word-break: break-all;
	}

	.level-item {
		margin-right: 10.5px;
	}

	.link-muted {
		font-size: 28px;
		font-weight: 400;
		text-decoration: none;
		color: #000000;
	}

	.title {
		margin-bottom: 21px;
	}

	.link-muted:hover {
		color: #6C5CE7;
	}

	.content {
		margin-bottom: 21px;
	}

	.content>.pre {
		display: -webkit-box;
		padding: 16.3px 19.6px;
		background-color: #f5f5f5;
		color: #4a4a4a;
		width: 100%;
		overflow-y: auto;
		max-height: 80px;
	    box-sizing: border-box;
	}
	.content>p {
		margin-bottom: 21px;
		color: #4a4a4a;
		font-size: 15.4px;
		line-height: 1.5;
	}

	.article-more {
		display: inline-flex;
		align-items: center;
		color: #4a4a4a;
		font-size: 12px;
		font-weight: 400;
		padding: 3.4625px 11.9px;
		box-sizing: border-box;
		line-height: 18px;
		background-color: #f5f5f5;
		text-decoration: none;
		line-height: initial;
	}

	.article-more:hover {
		background-color: #EEEEEE;
	}

	.pagination {
		margin: 21px auto;
	}

	.pagination,
	.pagination-list {
		display: flex;
		align-items: center;
	}

	.pagination-next {
		order: 3;
	}

	.pagination-list {
		order: 2;
		justify-content: center;
		flex-wrap: wrap;
		flex-grow: 1;
		flex-shrink: 1;
	}

	.pagination-previous {
		order: 1;
	}

	.pagination-link,
	.pagination-next,
	.pagination-previous {
		padding: 6px 10.5px;
		box-sizing: border-box;
		margin: 3.5px;
		background-color: #fff;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 0 1px rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		line-height: 21px;
		font-size: 14px;
		font-weight: 400;
		text-align: center;
	}

	.pagination a {
		color: #363636;
		text-decoration: none;
	}

	.is-current {
		color: #fff !important;
		background: #6C5CE7;
	}
@media screen and (max-width: 1200px) {
	.thumbnail{
		height: 280px;
	}
}
	@media screen and (max-width: 768px) {
		.pagination {
			flex-wrap: wrap;
			margin: 6.5px;
		}

		.pagination-list {
			width: 100%;
			order: 1;
			line-height: 2.5;
		}

		.pagination-previous {
			order: 2;
		}

		.pagination-previous,
		.pagination-next {
			flex: 1;
			text-align: center;
			/* margin-top: 21px; */
		}

		.card {
			margin: 10px 0;
		}
	}
</style>
