<template>
	<div id="body-warp">
		<div class="body-bag">
			<!-- <img class="body-media" src="media.images.src" :alt="media.images.name" v-if="isAndroid"> -->
			<video class="body-media" ref="video" :src="currentVideo.video" :poster='currentVideo.image'
			 muted="muted" autoplay="autoplay" loop="loop" x5-video-player-fullscreen="true" webkit-playsinline="true"
			 x-webkit-airplay="true" playsinline="true" :alt="currentVideo.name" />
		</div>
		<div class="body-header">
			<slot name="header"></slot>
		</div>
		<div id="site-info">
			<!-- <h1 id="site_title">Lilala</h1> -->
			<div id="site_subtitle">
				<span id="subtitle" class="typecursor">{{title.slice(0,titleIndex)}}</span>
			</div>
			<div id="site_social_icons">
				<a class="social-icon" href="http://wpa.qq.com/msgrd?v=3&uin=2836755307&site=qq&menu=yes" target="_blank" title="qq">
					<i class="iconfont icon-iconfonticon6"></i>
				</a>
				<a class="social-icon" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MjM5ODI0MjA1NA==&scene=110#wechat_redirect"
				 target="_blank" title="微信">
					<i class="iconfont icon-gongzhonghao"></i>
				</a>
				<a class="social-icon" href="https://github.com/lijiahui923/" target="_blank" title="GitHub">
					<i class="iconfont icon-github"></i>
				</a>
				<a class="social-icon" href="Mailto:lijiahui0063@163.com" target="_blank" title="邮箱">
					<i class="iconfont icon-youxiang"></i>
				</a>
				<!-- <a class="social-icon" href="/contact/" target="_blank" title="图片和电影">
					<i class="iconfont icon-duomeiti6"></i>
				</a> -->
			</div>
		</div>
		<div id="scroll_down" @click="$emit('goHome')">
			<i class="iconfont icon-35_xiangxiajiantou scroll_down-i"></i>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'body-wrap',
		components: {},
		data() {
			return {
				titleIndex: 0,
				title: "梦笑开娇靥，眼鬟压落花；簟生玉腕，香汗浸红纱。",
				isAndroid: this.judgeClient() == 'Android',
				isWeiXin: this.isWeiXin(),
        headerVideoList: [
          {
            image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/2404ac8bb9412a6b4764d7353801a1d2_preview.jpg',
            video: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/2404ac8bb9412a6b4764d7353801a1d2_preview.mp4',
            name: '雷电少女'
          },
          {
            image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/live/32640b5d8d4501398475b5e4a7e3074d.mp4.jpg',
            video: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/89b2916e8f40bab6f3949d6657532f01_preview.mp4',
            name: '早坂爱扭胯舞无缝'
          },
          {
            image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/live/d93c70e2113bacc8256b43b771334e5d.mp4.jpg',
            video: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/b77117bd5da3bf87cb58c3f14049105e_preview.mp4',
            name: '崩坏德丽莎生病的少女'
          },
          {
            image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/live/b8e7ec1c3af84097f0d0221ef44f12b2.mp4.jpg',
            video: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/8591a1c52ee67fbe4038a97caea9e0c9_preview.mp4',
            name: 'Candle喵'
          },
          {
            image: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/live/0ebf7c6dd7822e07eaac96e134d1627c.mp4.jpg',
            video: 'https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/a1935b5dc4c96f941b0a981c913ac65f_preview.mp4',
            name: '可爱女孩跳舞'
          }
        ],
        currentVideo: {}
			}
		},
		async created() {
			//微信视频播放
			try{
				window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
					let elevideo = this.$refs.video;
					elevideo.play()
				})
			}catch(e){}
			this.Subtitle()
      this.currentVideo = this.headerVideoList[Math.floor(Math.random() * this.headerVideoList.length)];
		},
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
		methods: {
			Subtitle() {
				let titmsg = this.title.length;
				let time = setInterval(() => {
					if (this.titleIndex < titmsg) {
						++this.titleIndex;
					} else {
						clearInterval(time);
						setTimeout(() => {
							let timsjian = setInterval(() => {
								if (this.titleIndex > 0) {
									--this.titleIndex
								} else {
									clearInterval(timsjian);
									this.Subtitle()
								}
							}, 100)
						}, 1000)
					}
				}, 200)
			},
			//js加载完成
			loadRongJs() {
				// 当使用远程js里的内容时请添加"//eslint-disable-line"防止eslint检测报错
				// console.log(this.$refs.video) //eslint-disable-line
				// this.$refs.video.play();	
				//微信内部浏览器自动播放
				if (window.WeixinJSBridge) {
					window.WeixinJSBridge.invoke('getNetworkType', {}, (res) => {
						this.$refs.video.play();
					})
				}else{
					document.addEventListener('WeixinJSBridgeReady', () => {
						this.$refs.video.play();
					}, false);
				}

			}
		},
		watch:{
			$route: {
			    handler: function(val, oldVal){
			     //切换路由防止视频暂停
					let elevideo = this.$refs.video;
					
					if (elevideo.paused) {
						// 暂停中
						elevideo.play();
					}
					
			    },
			    // 深度观察监听
			    // deep: true
				// immediate:true
			  }
		}
	}
</script>

<style scoped>
	#body-warp {
		position: relative;
		width: 100%;
		min-height: 100vh;
	}
	.body-bag {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: -1;
		background-color: azure;
		opacity: 0;
		animation: fade .5s ease-in forwards;
	}
 @keyframes fade{
    	from{opacity: 0;}
    	to{opacity: 1;}
    }
	.body-media {
		width: 100%;
		min-height: 100vh;
		object-fit: cover;
		z-index: -1;
	}

	#site_title {
		font-size: 40px;
		line-height: 1.5;
	}

	#site-info {
		color: #fff;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	#subtitle {
		font-size: 24px;
		line-height: 1.5;
	}

	#subtitle::after {
		content: '|';
	}

	.typecursor::after {
		animation: typedjsBink 1s .25s;
	}

	#site_social_icons {
		display: none;
		line-height: 2;
	}

	.social-icon {
		margin: 0 10px;
		text-decoration: none;
		font-style: normal;
		color: #FFFFFF;
	}

	.social-icon>.iconfont {
		font-size: 20px;
	}

	#scroll_down {
		position: absolute;
		width: 100%;
		bottom: 0;
		cursor: pointer;
		animation: scroll-down-effect 1.5s infinite;
		text-align: center;
	}

	.scroll_down-i {
		font-size: 30px;
		font-weight: 900;
		color: #fff;
		line-height: 1.5;

	}

	@keyframes headerNoOpacity {
		from {
			transform: translateY(-50px);
		}

		to {
			transform: translateY(0);
		}
	}

	@keyframes typedjsBink {
		0% {
			opacity: 0;
		}

		25% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 1;
		}
	}

	@keyframes scroll-down-effect {
		0% {
			transform: translateY(0);
			opacity: .4;
		}


		50% {
			transform: translateY(-16px);
			opacity: 1;
		}

		100% {
			transform: translateY(0);
			opacity: .4;
		}
	}

	@media screen and (max-width: 768px) {
		#site_title {
			font-size: 26px;
		}

		#subtitle {
			font-size: 16px;
		}

	}

	@media screen and (max-width: 1200px) {
		#site_social_icons {
			display: block;
		}
	}
</style>
