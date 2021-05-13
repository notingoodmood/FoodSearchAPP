<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.navigateTo({
				url:"pages/user_login/user_login"
			})
			uni.showToast({
				title:"请登录...",
				icon:"loading"
			})
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
