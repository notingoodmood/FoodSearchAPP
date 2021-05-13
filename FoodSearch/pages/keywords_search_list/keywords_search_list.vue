<template>
	<view>
		<view 
		class="ListContainer" 
		v-if="SearchResultData && SearchResultData.length!=0"
		 >
			<view class="ListItem" 
			v-for="(item,index) in SearchResultData"
			@click="onListItemClicked(index)"
			>
				<view class="Name">{{item.Name}}</view>
				<view class="Col">{{item.Col}}</view>
			</view>
		</view>
		<view class="WaitingWords" v-else>{{WaitingWords}}</view>
	</view>
</template>

<script>
	import { encodeMyUrl } from '../../info.js';
	export default {
		data() {
			return {
				SearchResultData:[],
				WaitingWords:"请稍后，正在查询..."
			}
		},
		onLoad(option) {
			this.SearchForResults(option.keyword);
		},
		methods: {
			SearchForResults(keyword){
				uni.request({
					method:"GET",
					url:encodeMyUrl('QueryKeyWord'),
					data:{
						keyword:keyword
					},
					success: (res) => {
						console.log(res.data);
						this.SearchResultData=res.data.Result;
						if(this.SearchResultData.length==0){
							this.WaitingWords="抱歉，未能找到结果..."
						}
					}
				})
			},
			onListItemClicked(index){
				uni.navigateTo({
					url:"../keywords_search_detail/keywords_search_detail?name="
					+this.SearchResultData[index].Name,
				})
			}
		}
	}
</script>

<style>
.ListItem{
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100px;
	border-bottom: #000000 dotted 1px;
}
.Name{
	margin-left: 20px;
	margin-top: 25px;
	flex: 1;
	font-size: 30px;
}
.Col{
	margin-left: 50px;
	margin-top: 25px;
	flex: 1;
	font-size: 25px;
}
.WaitingWords{
	font-size: 40px;
}

</style>
