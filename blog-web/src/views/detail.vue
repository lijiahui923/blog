<template>
	<div id="details">
		<Header @MaskShow="MaskShow" />
		<div id="web_bg" data-type="color"></div>
		<div class="post-bg">
			<img :src="currentArticle.image" width="100%" class="post-img">
			<div id="post-info">
				<div id="post-title">
					<!-- <div class="posttitle">{{Allarticles.title}}</div> -->
				</div>
				<div id="post-meta">
					<div class="meta-firstline">
						<time class="post-meta__date">
							<span class="post-meta__date-created" :title="currentArticle.create_date">
								发表于 {{currentArticle.create_date}}
							</span>
							<!-- <span class="post-meta__separator">|</span>
							<span class="post-meta__date-updated" title="更新于 2020-07-27 16:24:36">
								更新于 2020-07-27
							</span> -->
						</time>
						<span class="post-meta__categories">
							<span class="post-meta__separator">|</span>
							<!-- <a class="post-meta__categories" @click.prevent="$router.back(-1)">{{$route.params.parent}}</a> -->
						</span>
					</div>
					<!-- <div class="meta-secondline">
						<span class="post-meta-wordcount">
							<span>字数总计: </span>
							<span class="word-count">{{Allarticles.content | capitalize}}</span>
							<span class="post-meta__separator">|</span>
							<span>阅读时长: {{Allarticles.content | capitalize(500)}} 分钟</span>
							<span class="post-meta__separator">|</span>
							<span>阅读量: {{Allarticles.view || 0}}</span>
						</span>
					</div> -->
				</div>
			</div>
		</div>
		<main class="layout_post">
			<section class="content-inner">
				<article class="aside_left" v-if="winWidth>1200">
					<!-- <UserCard /> -->
					<!-- <div class="aside-margin">
						<Notice />
					</div> -->
          <nav class="article-catalog">
            <div class="catalog-title">目录</div>
            <div class="catalog-body">
                <ul class="catalog-list">
                  <li v-for="(item) in navList" :key="item.id" class="item d1">
                    <div class="a-container" :class="currentActive === item.id && 'active'" @click="handleActive(item.id)">
                      <a :href="`#${item.id}`" class="catalog-aTag" :title="item.title" >{{item.title}}</a>
                    </div>
                    <ul v-if="item.children.length > 0" class="sub-list">
                      <li v-for="(subItem) in item.children" :key="subItem.id" class="item d2">
                        <div class="a-container" :class="currentActive === subItem.id && 'active'" @click="handleActive(subItem.id)">
                          <a :href="`#${subItem.id}`" class="catalog-aTag" :title="subItem.title">{{subItem.title}}</a>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
            </div>
          </nav>
				</article>
				<article class="aside_center">
					<div ref="content" class="post-content" v-html="currentArticle.content"></div>
				</article>
			</section>
		</main>
		<Masking :show="MaskingShow" @MaskShow="MaskShow">
			<Mobile @MaskShow="MaskShow"/>
		</Masking>
		<!-- <Footer />
		<GoUp /> -->
	</div>
</template>

<script>
import { queryById } from '@/api/home'
	const Header = () => import('@/components/Header') //头部
	const UserCard = () => import('@/components/UserCard') //用户信息
	const Notice = () => import('@/components/Notice') // 公告
	const Masking = () => import('@/components/Masking') //蒙层
	const Mobile = () => import('@/components/Mobile') //移动端点击显示个人信息
	const Footer = () => import('@/components/Footer') //底部备案号
	const GoUp = () => import('@/components/GoUp') //返回顶部
import { toArrayTree } from 'xe-utils';
	export default {
		name: "detail",
		components: {
			Header,
			UserCard,
			Footer,
			Masking,
			Mobile,
			Notice,
			GoUp
		},
		props: ['winWidth', 'parent', 'id'],
		data() {
			return {
				MaskingShow: false,
        currentArticle: {},
        navList: [],
        currentActive: 'header-0'
			}
		},
    mounted() {
      setTimeout(() => {
        this.$nextTick(() => {
          let currentChildrenParentId = '';
          const tagList = [];
          this.$refs.content.childNodes.forEach((element, index) => {
            const titleTag = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']
            let  parentId = 'root';
            if (titleTag.includes(element.nodeName)) {
              console.log(element.nodeName, index);
              const id = `header-${index}`
              element.setAttribute('id', id)
              if (element.nodeName === 'H1') {
                parentId = 'root';
                currentChildrenParentId = id;
              } else {
                parentId = currentChildrenParentId;
              }
              tagList.push({
                parentId: parentId,
                id: id,
                title: element.innerHTML,
                nodeName: element.nodeName
              })
            }
          });
          this.navList = toArrayTree(tagList, { parentKey: 'parentId', key: 'id', children: 'children' })
        })
      }, 400);
    },
		created() {
      queryById(this.$route.params.id).then(({ data }) => {
        this.currentArticle = data;
      })
      
		},
		methods: {
			//头部点击侧边导航栏
			MaskShow() {
				this.MaskingShow = !this.MaskingShow
			},
      handleActive(id) {
        this.currentActive = id;
      }
		}
	}
</script>
<style>
	.post-content img {
		max-width: 100%;
		height: auto !important;
	}
	.post-content pre{
		white-space: pre-wrap;
		word-wrap: break-word;
	}
  .post-content pre>code {
    font-size: 12px;
    padding: 15px 12px;
    margin: 15px 0;
    word-break: normal;
    display: block;
    overflow-x: auto;
    color: #333;
    background: #f8f8f8;
    border-radius: 10px;
  }
	.post-content ul{
		list-style: none;
	}
</style>
<style scoped>
	
	#details {
		width: 100%;
		min-height: 100vh;
		/* background-color: #000000; */
		color: #FFFFFF;
		/* animation: slideMove .3s cubic-bezier(.62, 0.91, .45, 1.27); */
		    
	}
	@keyframes slideMove {
		from {
			transform: translate3d(100%, 0, 0);
		}
	
		to {
			transform: translate3d(0, 0, 0)
		}
	}
#web_bg{
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: -999;
	 background: var(--light_bg_color);
	animation: to_show 4s;
}
@keyframes to_show {
		from {
			opacity: 0;filter: alpha(opacity=0);
		}

		to {
			opacity: 1;filter: none;
		}
	}
	

	.post-bg {
		height: 400px;
		position: relative;
		animation: slots-name 1s;
		/* opacity: 0; */
		z-index: 2;
	}
    @keyframes slots-name{
    	from{opacity: 0;transform: translateY(-50px);}
    	to{opacity: 1;}
    }
	.post-img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		z-index: 1;
	}

	.post-bg::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .5);
		z-index: 2;
	}

	#post-info {
		position: absolute;
		bottom: 1.5rem;
		padding: 0 8%;
		box-sizing: border-box;
		word-break: break-all;
		width: 100%;
		color: #eee;
		text-align: left;
		z-index: 3;
	}

	#post-info #post-title {
		margin-bottom: 8px;
		font-size: 30px;
		line-height: 1.5;
	}

	.meta-firstline,
	.meta-secondline {
		font-size: 13.3px;
	}

	#post-meta {
		line-height: 1.8;
	}

	.post-meta-wordcount {
		display: flex;
		flex-wrap: wrap;
	}

	.post-meta__separator {
		margin: 0 6px;
	}

	.layout_post {
		padding: 40px 15px;
		box-sizing: border-box;
		color: #4C4948;
		width: 100%;
		transition: all .5s;
		animation: slot-name 1s;
	}
    @keyframes slot-name{
    	from{
			opacity: 0;transform: translateY(50px);
		}
    	to{transform: translateY(0px);opacity: 1;}
    }
	
	.content-inner {
		display: flex;
		max-width: 1400px;
		margin: 0 auto;
	}

	.aside_left {
		width: 25%;
		position: sticky;
		top: 65px;
		height: 100%;
	}

	.aside-margin {
		margin: var(--margin) 0;
	}

	.aside_center {
		padding: 0 calc(var(--margin) / 4);
		box-sizing: border-box;
		width: 50%;
		flex: 1;
	}

	.post-content {
		line-height: initial;
		width: 100%;
		padding: 50px 40px;
		border-radius: 8px;
		box-sizing: border-box;
		text-align: justify;
		word-break: break-all;
		/* word-break: break-all; */
		box-shadow: 0 4px 8px 6px rgba(7, 17, 27, .06);
		transition: all .5s;
    background-image: linear-gradient(
    0deg,transparent 24%,rgba(201,195,195,.329) 25%,hsla(0,8%,80.4%,.05) 26%,transparent 27%,transparent 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,transparent 77%,transparent),linear-gradient(
    90deg,transparent 24%,rgba(204,196,196,.226) 25%,hsla(0,4%,66.1%,.05) 26%,transparent 27%,transparent 74%,hsla(0,5.2%,81%,.185) 75%,rgba(180,176,176,.05) 76%,transparent 77%,transparent);
    background-color: #fff;
    background-size: 50px 50px;
	}

	.post-content:hover {
		box-shadow: 0 4px 12px 12px rgba(7, 17, 27, .15);
	}

	@media screen and (max-width: 768px) {
		.post-bg {
			height: 280px;
		}

		.post-content {
			padding: 36px 14px;
			
		}

		.layout_post {
			padding: 20px 5px;
		}
	}
  .article-catalog {
      background: #fff;
      border-radius: 4px;
      /* padding: 0; */
  }
  .catalog-title {
      font-weight: 500;
      padding: 10px 0;
      margin: 0 10px;
      font-size: 16px;
      line-height: 2rem;
      color: #1d2129;
      border-bottom: 1px solid #e4e6eb;
  }
  
  .catalog-body {
      height: 460px;
      margin: 5px;
      overflow: auto;
      
  }
  .catalog-list {
    position: relative;
  }
  .catalog-list .item {
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    color: #333;
  }
  .sub-list {
    padding-left: 10px;
  }
  .sub-list .item {
    font-size: 15px;
  }
  .catalog-list .item.d1 {
    font-weight: 400;
    color: #000;
  }
  .catalog-list .item .a-container {
    display: block;
    position: relative;
    padding: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .catalog-list .item.d2 .a-container.active {
    padding-left: 10px;
  }
  .a-container:hover {
    background: #f8f8f9;
    border-radius: 10px;
  }
  .catalog-list .catalog-aTag {
    color: inherit;
    display: inline-block;
    padding: 4px;
    width: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .catalog-list .item .a-container.active::before {
    content: "";
    position: absolute;
    top: 4px;
    left: 0;
    margin-top: 7px;
    width: 4px;
    height: 16px;
    background: #1e80ff;
    border-radius: 0 4px 4px 0;
  }
  .item .a-container.active {
    color: #007fff;
  }
</style>
