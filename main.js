var _data = {
	server:{
		readonly:true,
		info:[
			{name:'s1',ipaddr:['223','21','99','109']},
			{name:'s2',ipaddr:['223','21','99','100']}
		]
	},
	machine:{
		readonly:true,
		info:[
			{name:'m1',ipaddr:['223','21','99','109']},
			{name:'m2',ipaddr:['223','21','99','100']}
		]
	}
};

var ipInput ={
	data:function(){
		return {
			name:this.mname,
			ip:this.ipaddr
		};
	},
	methods:{
		updateVal:function(val,index){
			this.ip.splice(index,1,val);
			this.$emit('updateaddr',this.ip,this.serveridx);
		}
	},
	props:{
		mname:{type:String},
		ipaddr:{type:Array,'default':['0','0','0','0']},
		readonly:{type:Boolean,'default':true},
		serveridx:{type:Number},
		spliter:{type:String,'default':'.'}
	},
	template:`
		<ul class="ip-wrap">
			<li v-for="(item,index) in ipaddr">
				<input type="text" maxlength="3"
						:readonly="readonly"
						:value="item"
						@input="updateVal($event.target.value,index)" />
				<span v-if="index!==ipaddr.length-1">{{spliter}}</span>
			</li>
		</ul>
	`
};

var vm = new Vue({
	el:'#wrap',
	data:_data,
	components:{
		'ip-input':ipInput
	},
	methods:{
		updateData:function(addr,idx){
			console.log(idx);
		},
		sendData:function(){
			console.log(this.$refs);
		}
	}
});