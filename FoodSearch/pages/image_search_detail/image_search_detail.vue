<template>
	<view class="pageWrapper">
		<image class="rawImage" :src="imagePath" mode="aspectFit"></image>
		<view class="text-area">
			<view class="textTable">
			<view class="tabelRow">
				<view class="tableItem">名称</view>
				<view class="tableItem">可能性</view>
			</view>
			<view class="tabelRow" v-for="(item,key) in rawData" v-if="item.Name">
				<view class="tableItem">{{item.Name}}</view>
				<view class="tableItem">{{item.Confidence}}%</view>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
import { encodeMyUrl, historyMessage, HISTORY_LIST } from '../../info.js';
export default {
	data() {
		return {
			imagePath: '/static/loading.png',
			rawData:[]
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
		let flag=option.SholudNotCreateHistoryItem;
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
				console.log(res.data);
				_this.imagePath = option.imagePath;
				_this.rawData=res.data.keyWords;
				if(!flag){
					this.onHistoryMessageCrated(option.imagePath,res.data);
				}
			},
			fail: () => {
				_this.KeyWords='没有找到结果'
				uni.showToast({
					title: '服务器开小差了，请稍后再试...',
					icon: 'none'
				});
			}
		});
	},
	methods: {
		onHistoryMessageCrated(imagePath,keyWords){
			let myHistoryMessage=new historyMessage(this.getDates(),imagePath,keyWords);
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
					let newList=[];
					newList.push(myHistoryMessage);
					uni.setStorage({
						key:HISTORY_LIST,
						data:newList,
					})
				}
			})
		},
		getDates(){
			var date = new Date();//实例一个时间对象；
			var year = date.getFullYear();//获取系统的年；
			var month = date.getMonth()+1;//获取系统月份，由于月份是从0开始计算，所以要加1
			var day = date.getDate();//获取系统日
			var hour = date.getHours();//获取系统时间
			var minute = date.getMinutes(); //分
			var second = date.getSeconds();//秒
			return year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
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
	height: 600rpx;
	width: 600rpx;
	margin-top: 0rpx;
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
.textTable{
	display:flex;
	flex-direction:column;
}
.tabelRow{
	display:flex;
	flex: 1;
	flex-direction:row;
}
.tableItem{
	flex: 1;
	width: 125px;
	justify-content: center;
	align-items: center;
	font-size: 25px;
}
</style>
