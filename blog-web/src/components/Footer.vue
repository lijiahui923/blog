<template>
	<footer id="footer" data-type="color">
		<div id="footer-wrap">
			<div class="copyright">©Copyright 2021 我会瘦的MM</div>
		</div>
	</footer>
</template>

<script>
	import {getfooter} from '@/api/UserInfo.js'
	export default {
		name:"Footer",
		data(){
			return {
				loadTime:0,
				date:{
					n:0,
					y:0,
					r:0,
					xs:0,
					fz:0,
					miao:0,
				},
				buildTime:'',//建成时间
				beiAn:'',//备案号
			}
		},
		// beforeCreate() {
			// document.onreadystatechange = ()=>{
			// 	if (document.readyState === 'complete') {
			// 		//页面启动耗时
			// 		console.log('Page load time is '+ this.loadTime);
			// 		let loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
			// 		this.loadTime = loadTime
			// 		console.log('Page load time is '+ loadTime);
			// 	}
			// }
		// },
		async created() {
			
			let {data} = await getfooter();
			this.buildTime = data.buildTime;
			this.beiAn = data.beiAn;
			
			this.Firstdate()
			setInterval(()=>{
				this.Firstdate()
			},1000)
			
			this.$nextTick(()=>{
				let loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
				this.loadTime = loadTime
			});
		},
		methods:{
            Firstdate(){
				let date = new Date();//获取现在的时间
				let parse = Date.parse(this.buildTime);//设定网站建立的时间
				let getTime = date.getTime()-parse;//计算网站已经建立了多少时间
				
				//计算并输出网站建立的时间
				//通过取余运算符和取整方法计算
				let n=parseInt(getTime/31536000000);//"年"
				let m= getTime%31536000000;
				
				let y=parseInt(m/2592000000);//"月"
				m=getTime%2592000000;
				
				let r=parseInt(m/86400000);//"日"
				m=getTime%86400000;
				 
				let xs=parseInt(m/3600000);//"小时"
				m=getTime%3600000;
				
				let fz=parseInt(m/60000);//"分钟"
				m=getTime%60000;
				let miao=parseInt(m/1000);//"秒"
				
				let time = {n,y,r,xs,fz,miao}
				this.date = {...this.date,...time}
				// console.log(this.date)
				// console.log(`${n}年${y}月${r}日${xs}小时${fz}分钟${miao}秒`)
			}
		}
	}
</script>

<style scoped>
	#footer{
		border-top: 1px solid #1232;
		background-color: azure;
	}
	#footer #footer-wrap {
	  color: #333;
		display: flex;
    justify-content: center;
		/* flex-wrap: wrap;
		justify-content: space-between; */
		align-items: center;
	}
	#footer-wrap {
		font-size: 14px;
	    position: relative;
	    padding: 40px 20px;
	    color: #eee;
	    text-align: center;
		line-height: 2;
	}
	#footer-wrap .footer-separator {
	    margin: 0 4px;
	}
	#footer-wrap a{
		text-decoration: none;
		color: unset;
	}
	.footer_custom_text,.framework-info{
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: inherit;
	}
	.footer_custom_text>*{
		display: block;
	}
	.footer_custom_text>a>img{
		vertical-align: middle;
	}
	.icp>a{
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-user-select: text;
	}
	#footer-wrap .icp-icon {
	    padding: 0 4px;
		padding-left: 0;
	    vertical-align: text-bottom;
	}
	.icp:hover{
		text-decoration: underline;
	}
</style>
