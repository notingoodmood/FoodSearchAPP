<template>
	<view class="content">
		<view class="SearchTitleContainer">
		<uni-search-bar 
		v-model="inputWords"
		@confirm="onConfirmButtonClicked"
		class="KeywordsSearchBar"
		>
		<view slot="searchIcon" style="color: #999999" >@</view>
		</uni-search-bar>	
		</view>
		<view class="ImageSearchTitle">{{image_search_title}}</view>
		<view class="serach_button_container" @click="onSearchButtonClicked()"><image class="search_button" src="/static/search.png"></image></view>
		<view class="text-area">
			<text class="title">{{ search_message }}</text>
		</view>
		<view class="history_button_container" @click="onHistoryBottonClicked()"><image class="history_button" src="/static/history.png"></image></view>
		<view class="text-area">
			<text class="title">{{ history_message }}</text>
		</view>
	</view>
</template>

<script>
import { encodeMyUrl, historyMessage } from '../../info.js';
export default {
	data() {
		return {
			inputWords:'',
			history_message: '搜图历史记录',
			search_message: '开始图片搜索',
			image_search_title: '以图搜索'
		};
	},
	onLoad() {},
	methods: {
		onSearchButtonClicked: () => {
			//只允许在APP环境下使用！
			uni.chooseImage({
				count: 1,
				success: function(data) {
					plus.io.resolveLocalFileSystemURL(data.tempFilePaths[0], function(entry) {
						entry.file(
							function(file) {
								var reader = new plus.io.FileReader();
								reader.onloadend = function(e) {
									console.log(encodeMyUrl('ImageUpload'));
									uni.request({
										url: encodeMyUrl('ImageUpload'),
										data: {
											filename: new Date().getTime() + '.jpg',
											context: e.target.result.substring(23, e.target.result.length)
										},
										header: {
											'content-type': 'application/x-www-form-urlencoded'
										},
										method: 'POST',
										success: res => {
											console.log(res);
											uni.showToast({
												title: '正在跳转...',
												icon: 'none'
											});
											uni.navigateTo({
												url: `../image_search_detail/image_search_detail?imagePath=${res.data.url}`
											});
										},
										fail: () => {
											uni.showToast({
												title: '服务器开小差了，请稍后再试...',
												icon: 'none'
											});
										}
									});
								};
								reader.readAsDataURL(file);
							},
							function(e) {
								console.log('读写异常！');
							}
						);
					});
				},
				fail: () => {
					uni.showToast({
						title: '取消了识别请求',
						icon: 'none'
					});
				}
			});
		},
		onHistoryBottonClicked(){
			uni.navigateTo({
				url:'../image_search_history/image_search_history'
			})
		},
		onConfirmButtonClicked(){
			uni.navigateTo({
				url:"../keywords_search_list/keywords_search_list?keyword="+this.inputWords,
			})
		}
		}
	}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.KeywordsSearchBar{
	margin-top: 10px;
}
.SearchTitleContainer{
	width: 100%;
}
.ImageSearchTitle{
	margin-left: 0;
	margin-top: 50px;
	float: left;
	font-size: 25px;
}

.serach_button_container {
	height: 350rpx;
	width: 350rpx;
	margin-top: 100rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 300rpx;
	border-style: solid;
	border-width: 2rpx;
	border-color: black;
}

.search_button {
	height: 250rpx;
	width: 250rpx;
}

.history_button_container {
	height: 250rpx;
	width: 250rpx;
	margin-top: 50rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 300rpx;
	border-style: solid;
	border-width: 2rpx;
	border-color: black;
}
.history_button {
	height: 200rpx;
	width: 200rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
