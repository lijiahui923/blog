<template>
	<transition name="fade">
		<div class="to-top" v-show="show" :class="[animations]" @click="goTop()"></div>
	</transition>
</template>

<script>
	export default {
		name:'GoUp',
		data(){
			return {
				show:false,
				animations:false
			}
		},
		created() {
			window.addEventListener('scroll', ()=>{
				let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
					document.body.scrollTop;
				if(scrollTop>=300){
					this.show = true
				}else{
					this.show = false
				}
			})
		},
		methods:{
			goTop(){
				if(!this.animations){
					this.animations = true;
					setTimeout(()=>{
						this.wayscroll(document.body)
						this.animations = false
					},500)
				}
			}
			
		}
	}
</script>

<style scoped>
.to-top {
    position: fixed;
    bottom: 50px;
	right: 100px;
    width: 150px;
    height: 174px;
    cursor: pointer;
    z-index: 998;
    background-position: 0 0;
    text-align: center;
    background-image: url('../assets/images/back-top.png');
    background-repeat: no-repeat;
}
.to-top:hover {
	background-image: url('../assets/images/space-back-top.png');
    animation: spac steps(1, start) 0.5s infinite;
}
.fade-enter-active, .fade-leave-active {
	transition: opacity 500ms
}
.fade-enter, .fade-leave-to {
	opacity: 0
}
@keyframes spac{
	0%{background-position: 0 0;}
	25%{background-position: -150px 0;}
	50%{background-position: -300px 0;}
	75%{background-position: -450px 0}
	100%{background-position: -600px 0}
}
@media screen and (max-width: 768px) {
	.to-top{
		bottom: 10px;
		right: 10px;
	}
}
</style>
