<script>
	import {FLAG_LOG_IN , MAGIC_NUMBER_LOG_IN} from "info.js";
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let data=uni.getStorageSync(FLAG_LOG_IN)
			if(!data){
				uni.navigateTo({
					url:"pages/user_login/user_login"
				})
				uni.showToast({
					title:"请登录...",
					icon:"loading"
				})
				uni.setStorageSync(FLAG_LOG_IN,MAGIC_NUMBER_LOG_IN)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
