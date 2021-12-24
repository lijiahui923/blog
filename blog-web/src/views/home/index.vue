<template>
	<div id="Home">
		<transition name="fade">
			<body-wrap @goHome="onGoMain">
				<Header slot='header' @MaskShow="MaskShow" />
			</body-wrap>
		</transition>
			<main class="layout_page" id='pages' ref='page'>
				<section class="bgcolor">
					<div class="aside aside_left">
						<user-card />
						<div class="aside-margin">
							<!-- <Classify :Classifydata="MaskShow" />分类 -->
						</div>
						<div class="aside-margin">
							<!-- <Label :Labeldata="MaskShow" /> 标签 -->
						</div>
						<div class="aside-margin" v-if="winWidth<=1200">
							<!-- <Notice /> -->
						</div>
					</div>
					<div class="aside aside_center">
						<!-- <Breadcrumb v-show="$route.meta.BreadUrl" /> -->
						<article-list />
					</div>
					<div class="aside aside_right" v-if="winWidth>1200">
						<!-- <Notice /> -->
					</div>
				</section>
				<!-- <Masking :show="MaskingShow" @MaskShow="MaskShow">
					<Mobile @MaskShow="MaskShow"/>
				</Masking> -->
			</main>
			<GoUp />
			<Footer />
	</div>
</template>

<script>
import BodyWrap from './components/body-wrap.vue';
import Header from '@/components/Header.vue';
import UserCard from './components/user-card.vue';
import ArticleList from './components/article-list.vue';
import GoUp from '@/components/GoUp';
import Footer from '@/components/Footer';
	export default {
		name: 'home',
		components: {
      BodyWrap,
			Header,
			UserCard,
			ArticleList,
      GoUp,
      Footer
		},
		props: {
			winWidth: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				MaskingShow: true,
			}
		},
		// computed: mapState('UserInfo', ['data']),
		methods: {
			//头部点击侧边导航栏
			MaskShow() {
				this.MaskingShow = !this.MaskingShow
			},
			//返回底部
			onGoMain() {
				this.wayscroll(this.$refs.page);
			}
		}
	}
</script>

<style scoped>
	.layout_page {
		width: 100%;min-height: calc(100vh - 100px);
		background: #fff linear-gradient(90deg, rgba(247, 149, 51, .1) 0, rgba(243, 112, 85, .1) 15%, rgba(239, 78, 123, .1) 30%, rgba(161, 102, 171, .1) 44%, rgba(80, 115, 184, .1) 58%, rgba(16, 152, 173, .1) 72%, rgba(7, 179, 155, .1) 86%, rgba(109, 186, 130, .1) 100%);
	}

	.bgcolor {
		max-width: 1400px;
		margin: 0 auto;
		padding: 40px 10px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.aside {
		flex: none;
		margin-bottom: 10px;
	}
	.aside_left,
	.aside_right {
		width: 25%;
		
	}
	.aside_left{
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

	@media screen and (max-width: 768px) {

		.aside_left,
		.aside_right,
		.aside_center {
			width: 100%;
			margin-bottom: 0;
		}

		.aside_center {
			padding: 0;
			order: 1;
		}
        .aside_left{
			order: 2;
		}
		.aside_right {
			margin-top: calc(var(--margin) / 2);
		}
		.aside-margin {
			margin: 10px 0;
		}

		
	}
</style>
