<template>
	<view class="pageWrapper">
		<image class="rawImage" :src="imagePath" mode="aspectFit"></image>
		<view class="text-area">
			<text class="introduction">图片可能包含的食物：\n{{ KeyWords }}</text>
		</view>
	</view>
</template>

<script>
import { encodeMyUrl, historyMessage, HISTORY_LIST } from '../../info.js';
export default {
	data() {
		return {
			imagePath: '/static/loading.png',
			KeyWords: '稍等，解析中...'
		};
	},
	onLoad: function(option) {
		if (option.imagePath === undefined || option.imagePath === '') {
			uni.showToast({
				title: '数据解析失败QAQ',
				icon: 'none'
			});
			uni.navigateBack();
		}
		let _this = this;
		uni.request({
			url: encodeMyUrl('ImageSearch'),
			data: {
				url: option.imagePath
			},
			success: res => {
				uni.showToast({
					title: '已加载完成',
					icon: 'success'
				});
				_this.imagePath = option.imagePath;
				let keys='';
				res.data.keyWords.forEach((value)=>{
					keys+=(value.Name+"，可能性："+value.Confidence+"\n");
				})
				_this.KeyWords = keys;
				this.onHistoryMessageCrated(option.imagePath,res.data);
			},
			fail: () => {
				uni.showToast({
					title: '服务器开小差了，请稍后再试...',
					icon: 'none'
				});
			}
		});
	},
	methods: {
		onHistoryMessageCrated(imagePath,keyWords){
			let myHistoryMessage=new historyMessage(new Date().toUTCString(),imagePath,keyWords);
			uni.getStorage({
				key:HISTORY_LIST,
				success: (res) => {
					let list=res.data;
					list.push(myHistoryMessage);
					uni.setStorage({
						key:HISTORY_LIST,
						data:list
					})
				},
				fail: () => {
					console.log("404");
					let newList=[];
					newList.push(myHistoryMessage);
					uni.setStorage({
						key:HISTORY_LIST,
						data:newList,
					})
				}
			})
		}
	}
};
</script>

<style>
.pageWrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.text-area {
	display: flex;
	justify-content: center;
}
.rawImage {
	height: 500rpx;
	width: 500rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.introduction {
	font-size: 50rpx;
	color: #171717;
}
</style>
