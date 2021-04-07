//存放运行时关键信息与方法

//服务器IP
export const server_ip='1.13.4.44';

//服务器端口
export const server_port='8080';

//服务器路径名
export const server_path='FoodSearch';

//本地缓存KEY：历史记录 List
export const HISTORY_LIST='history_list';

//历史记录条目数据Object
export class historyMessage{
	//时间戳
	date;
	//图片URL
	url;
	//查询得出的所有命中的食物条目
	name_list;
	constructor(myDate,myUrl,myNameList){
		this.date=myDate;
		this.url=myUrl;
		this.name_list=myNameList;
	}
}

//全局方法，组装URL
export const encodeMyUrl=(api_name)=>{
	return `http://`+server_ip+`:`+server_port+"/"+server_path+"/"+api_name;
}