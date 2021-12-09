<template>
	<transition name="fade">
		<div id="masking" v-show="visible">
			<div id="Loading">
				<img src="../../assets/images/loading.svg" alt="加载中...">
				<span class="text">{{str}}</span>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {
		name:'Loading',
		props:{
			str:{
				type:String || Number,
				default:'加载中'
			},
			visible: false
		}
	}
</script>

<style scoped>
	#masking{
		position: fixed;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,0.8);
		z-index: 12;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  opacity: 0;
	}
	
	.transform-enter-active,.transform-leave-active{
	   transition: transform .5s;
	}
	.transform-enter, .transform-leave-to{
	   transform: translateX(100%);
	}
	#Loading{
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		width: 80px;
		top: 50%;
		left: 50%;
		transform: translate3d(-50%,-50%,0);
		z-index: 10;
		/* background-color: rgba(0,0,0,0.8); */
	}
	#Loading>img{
		flex-shrink: 0;
	}
	#Loading>.text{
		margin-top: 5px;
		color: #FFFFFF;
	}
	#Loading>.text::after{
		content: '';
		display: inline-block; min-width: 2px; min-height: 2px;
		box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor;
		animation: dot 1s infinite step-start both;
	}
	@keyframes dot {
	    25% { box-shadow: none; }                                  /* 0个点 */
	    50% { box-shadow: 2px 0 currentColor; }                    /* 1个点 */
	    75% { box-shadow: 2px 0 currentColor, 6px 0 currentColor;  /* 2个点 */ }
	}
</style>
