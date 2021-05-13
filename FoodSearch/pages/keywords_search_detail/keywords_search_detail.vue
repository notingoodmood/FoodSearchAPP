<template>
	<view>
		<view class="FoodTitle">
			<view class="FoodName">{{ResultTemplate.Name}}</view>
			<view class="Col">{{ResultTemplate.Col}}</view>
		</view>
		<view class="ListContainer" id="BasicElements">
			<view class="ListHeadAndTail">
				<view class="TextBox">营养元素</view>
				<view class="TextBox">每100克</view>
				<view class="TextBox">备注</view>
			</view>
			<view class="ListItem">
				<view class="TextBox">蛋白质</view>
				<view class="TextBox">{{ResultTemplate.Protein}}</view>
				<view class="TextBox">高蛋白</view>
			</view>
			<view class="ListItem">
				<view class="TextBox">碳水化合物</view>
				<view class="TextBox">{{ResultTemplate.Carbon}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListHeadAndTail" >
				<view class="TextBox">脂肪</view>
				<view class="TextBox">{{ResultTemplate.Fat}}</view>
				<view class="TextBox"></view>
			</view>
		</view>
		<view class="ListContainer" id="Vitamins">
			<view class="ListHeadAndTail">
				<view class="TextBox">维生素</view>
				<view class="TextBox">每100克</view>
				<view class="TextBox">备注</view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素A</view>
				<view class="TextBox">{{ResultTemplate.VA}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素B1</view>
				<view class="TextBox">{{ResultTemplate.VB1}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素B2</view>
				<view class="TextBox">{{ResultTemplate.VB2}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素B6</view>
				<view class="TextBox">{{ResultTemplate.VB6}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素B12</view>
				<view class="TextBox">{{ResultTemplate.VB12}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素C</view>
				<view class="TextBox">{{ResultTemplate.VC}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">维生素D</view>
				<view class="TextBox">{{ResultTemplate.VD}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListHeadAndTail">
				<view class="TextBox">维生素E</view>
				<view class="TextBox">{{ResultTemplate.VE}}</view>
				<view class="TextBox"></view>
			</view>
		</view>
		<view class="ListContainer" id="Mineral">
			<view class="ListHeadAndTail">
				<view class="TextBox">矿物质</view>
				<view class="TextBox">每100克</view>
				<view class="TextBox">备注</view>
			</view>
			<view class="ListItem">
				<view class="TextBox">钠</view>
				<view class="TextBox">{{ResultTemplate.Na}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListItem">
				<view class="TextBox">钾</view>
				<view class="TextBox">{{ResultTemplate.K}}</view>
				<view class="TextBox"></view>
			</view>
			<view class="ListHeadAndTail">
				<view class="TextBox">钙</view>
				<view class="TextBox">{{ResultTemplate.Ca}}</view>
				<view class="TextBox"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { encodeMyUrl } from '../../info.js';
	
	export default {
		data() {
			return {
				ResultTemplate:{},
				WaitingWords:"稍等，正在解析..."
			}
		},
		onLoad(option) {
			this.onGetFoodDetailResult(option.name);
		},
		methods: {
			onGetFoodDetailResult(FoodName){
				uni.request({
					method:"GET",
					url:encodeMyUrl("QueryFoodDetail"),
					data:{
						name:FoodName
					},
					success: (res) => {
						console.log(res.data);
						this.ResultTemplate=res.data.Result;
					}
				})
			}
		}
	}
</script>

<style>
.FoodTitle{
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 100px;
	align-items: center;
	justify-content: center;
	border-bottom: #333333 dashed   1px;
}
.FoodName{
	flex: 1;
	font-size: 30px;
	margin-left: 25px;
}
.Col{
	flex: 1;
	font-size: 25px;
	margin-left: 20px;
}
.ListContainer{
	display: flex;
	flex-direction: column;
	margin-top: 50px;
	border-top: #000000 dashed   1px;
	width: 100%;
}
.ListHeadAndTail{
	flex: 1;
	display: flex;
	flex-direction: row;
	height: 100px;
	border-bottom: #000000 dashed   1px;
	align-items: center;
	justify-content: center;
}
.ListItem{
	flex: 1;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}
.TextBox{
	flex: 1;
	font-size: 15px;
	text-align: center;
	margin-top: 25px;
	margin-bottom: 25px;
}

</style>
