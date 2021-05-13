<template>
	<view class="TableHolder">
		<view class="TableRowContainer">
			<view class="TableHead">性别</view>
			<input class="TableInput" placeholder="输入性别..." />
		</view>
		<view class="TableRowContainer">
			<view class="TableHead">年龄</view>
			<input class="TableInput" placeholder="输入年龄..." />
		</view>
		<view class="TableRowContainer">
			<view class="TableHead">症状</view>
			<picker 
			class="SymptomsPicker"
			:value="ChosenSymptom" 
			:range="Symptoms"
			@change="onPickerChange"
			>
				<text class="PickerChosenSymptoms">{{Symptoms[ChosenSymptom]}}</text>
			</picker>
		</view>
		<view class="TableRowContainer">
			<view class="TableHead">补充</view>
			<input class="TableInput" placeholder="填写补充信息..." />
		</view>
		<view class="TableRowContainer">
			<view class="TableHead">可能病症</view>
			<view class="TableRowText">{{PossibleDisease}}</view>
		</view>
		<view class="TableColumnContainer">
			<view class="TableHead">推荐补充营养元素</view>
			<view class="TableColumnText">{{RequiredElements}}</view>
		</view>
		<view class="TableColumnContainer">
			<view class="TableHead">推荐食物</view>
			<view class="TableColumnText">{{RecommendedFoods}}</view>
		</view>
		<button class="RenderTableButton" @click="onRenderTableButtonClicked">查询诊疗方案</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ChosenSymptom:0,
				Symptoms:["身体疲乏、腿部水肿","排便不畅","眼睛干燥、怕光、疼痛等","指趾麻木、肌肉酸痛",
				"疲劳倦怠、毛囊出血","生长迟滞","头痛、兴奋、抽搐、昏迷","倦怠、肌无力、心室纤颤、心脏停搏",
				"手足抽搐","心慌气短、头晕眼花","生长发育迟缓、食欲不振","心肌扩大、心力衰竭、心律失常"],
				Diseases:["营养不良","便秘","夜盲症","脚气病","坏血病","佝偻病","低渗性脱水、酸中毒",
				"肌无力、心律失常","佝偻病","缺铁性贫血","发育迟缓","克山病、大骨节病"],
				Elements:["蛋白质","膳食纤维","维生素A","维生素B1","维生素C","维生素D","钠","钾","钙",
				"铁","锌","硒"],
				Foods:["豆类、鱼类或者奶制品","谷类、麸、全麦制品","动物肝脏、鱼肝油","谷类的谷皮和胚芽、动物肝脏",
				"新鲜蔬菜、水果","海水鱼、肝、蛋黄","加工食品、盐","豆类、瘦肉、香蕉、橘子","牛奶、小虾皮、芝麻酱",
				"肝脏、肉类、蛋黄","贝类、肉类、内脏","肝脏、肉类、鱼类"],
				PossibleDisease:"",
				RequiredElements:"",
				RecommendedFoods:""
			}
		},
		methods: {
			onPickerChange(e){
				this.ChosenSymptom=e.target.value;
			},
			onRenderTableButtonClicked(){
				this.PossibleDisease=this.Diseases[this.ChosenSymptom];
				this.RequiredElements=this.Elements[this.ChosenSymptom];
				this.RecommendedFoods=this.Foods[this.ChosenSymptom];
			}
		}
	}
</script>

<style>
.TableHolder{
	display: flex;
	flex-direction: column;
}
.TableRowContainer{
	flex: 1;
	display: flex;
	flex-direction: row;
	border-bottom: #000000 solid 1px;
}
.TableColumnContainer{
	flex: 1;
	display: flex;
	flex-direction: column;
	border-bottom: #000000 solid 1px;
}
.TableHead{
	flex: 1;
	font-size: 20px;
	text-align: left;
	margin-left: 10px;
	margin-top: 20px;
	margin-bottom: 20px;
	
}
.TableInput{
	flex: 2;
	font-size: 20px;
	text-align: left;
	margin-top: 20px;
	margin-bottom: 20px;
}
.TableRowText{
	flex: 2;
	font-size: 20px;
	text-align: left;
	margin-top: 20px;
	margin-bottom: 20px;
}
.TableColumnText{
	font-size: 20px;
	text-align: left;
	margin-left: 10px;
	color: gray;
	margin-bottom: 20px;
}
.SymptomsPicker{
	flex: 2;
	display: flex;
}
.PickerChosenSymptoms{
	font-size: 20px;
	margin-top: 20px;
	margin-bottom: 20px;
}
.RenderTableButton{
	margin-top: 20px;
}
</style>
