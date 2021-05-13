<template>
	<view>
		<view class="ListContainer">
			<view class="ListRow" v-for="(item,index) in HistoryList" v-if="item.date" @click="onClickListItem(index)">
				<image :src="item.url" class="ListItemImage"></image>
				<view class="ListItemDate">{{item.date}}</view>
				<image src="../../static/arrow_right.png" class="ListItemIcon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {HISTORY_LIST} from '../../info.js';
	export default {
		data() {
			return {
				HistoryList:[],
			}
		},
		onShow() {
			this.HistoryList=uni.getStorageSync(HISTORY_LIST);
			console.log(this.HistoryList);
		},
		methods: {
			onClickListItem(index){
				uni.navigateTo({
					url: `../image_search_detail/image_search_detail?imagePath=${this.HistoryList[index].url}`
				})
			}
		}
	}
</script>

<style>
.ListRow{
	display: flex;
	flex-direction: row;
	height: 100px;
	width: 100%;
	border-bottom: 1px dashed   black;
}
.ListItemImage{
	height: 100px;
	width: 100px;
}
.ListItemDate{
	width: 250px;
	margin-top: 35px;
	margin-left: 20px;
}
.ListItemIcon{
	margin-top: 25px;
	width: 50px;
	height: 50px;
}
</style>
