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
			ip:this.ipaddr
		};
	},
	methods:{
		//输入事件处理,限制数值范围0-255,输入空值将在blur后默认设置255
		updateVal:function(val,index){
			var r = /^\d{0,3}$/;
			var _self = this;
			var before = this.ip[index];
			var v = before;
			if(val===''){
				v = val;
			}else if(r.test(val)){
				v = parseInt(val);
				if(v>-1 && v<256){
					v += '';
				}else{
					v=before;//recover original value to reject illegal char
				}
			}
			this.ip.splice(index,1,v);
			this.$emit('updateaddr',this.ip,this.idx,this.extkey);
		},
		handleFocus:function(index){//select text when focused
			this.$refs.singleInput[index].select();
		},
		//自动跳转下一个输入框
		changeFocus:function(ev,index){
			var _self = this;
			var val = ev.target.value;
			var e = ev || window.event;
			if(e.keyCode == 39 || e.keyCode == 13 || e.keyCode == 32) {
				//right arrow,space,enter
				if(index<3){
					_self.$refs.singleInput[index+1].focus();
				}
			}else if(e.keyCode == 37){
				//left arrow
				if(index>0){
					_self.$refs.singleInput[index-1].focus();
				}
			}else if(index<3 && e.keyCode<105 && e.keyCode>48){
				//输入完成判断,输入3个合法ip数字,第三位超过255自动保留前面输入两位跳转下一个框
				if(val.length===3 || parseInt(val)>25 || 
				   (parseInt(val)===25 && e.keyCode>53 && e.keyCode<=57) ||
				   (parseInt(val)===25 && e.keyCode>101 && e.keyCode<=105)){
					_self.$refs.singleInput[index+1].focus();
				}
			}
		},
		handleBlur:function(val,index){
			if(val===''){
				this.ip.splice(index,1,'255');
				this.$emit('updateaddr',this.ip,this.idx,this.extkey);
			}
		}
	},
	props:{
		ipaddr:{type:Array,'default':['0','0','0','0']},
		readonly:{type:Boolean,'default':true},
		idx:{type:Number},// 父组件数据的索引
		extkey:{type:String,'default':'ip'},// 用于保存ip数据对应的key,Server数据不需要
		spliter:{type:String,'default':'.'}
	},
	template:'\
		<ul class="ip-wrap">\
			<li v-for="(item,index) in ipaddr">\
				<input type="text" maxlength="3"\
						ref="singleInput"\
						:readonly="readonly"\
						:value="item"\
						@input="updateVal($event.target.value,index)" \
						@keyup="changeFocus($event,index)" \
						@focus="handleFocus(index)" \
						@blur="handleBlur($event.target.value,index)"/>\
				<span v-if="index!==ipaddr.length-1">{{spliter}}</span>\
			</li>\
		</ul>'
};

var vm = new Vue({
	el:'#wrap',
	data:_data,
	components:{
		'ip-input':ipInput
	},
	methods:{
		updateData:function(addr,idx){
			//更新数据到父组件
			_data.servers.info.splice(idx,1,addr);
		},
		edit:function(){
			if(this.server.readonly){
				this.server.readonly=false;
			}
		},
		save:function(){
			if(!this.server.readonly){
				this.server.readonly=true;
			}
		}
	}
});
