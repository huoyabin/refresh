function Drop(container,opt){
	var _default={
		refresh:null,
		unload:null,
		distance:50,
		down:{
			down_name:"down_box",
			down_sx:"<p>下拉刷新</p>",
			down_sf:"<p>释放更新</p>",
			down_load:"<p class='loading'>正在加载中...</p>"
		},
		up:{
			up_name:"up_box",
			up_sx:"<p>下拉刷新</p>",
			up_sf:"<p>释放更新</p>",
			up_load:"<p class='loading'>正在加载中...</p>"
		}
	}
	for(var i in opt){
		_default[i]=opt[i];
	}
	this.settings=_default;
	this.container=typeof container==='string'?document.getElementById(container):container;
	this.init();		
}
Drop.prototype={
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		var y,_this=this,flag=false,flag2=false,str="",d_box=null,dis=this.settings.distance,u_box=null;
		this.container.addEventListener('touchstart',sfn,false);
		this.container.addEventListener('touchmove',mfn,false);
		this.container.addEventListener('touchend',efn,false);
		function sfn(e){
			y=e.touches[0].clientY;	
			sTop=this.scrollTop;		
			var mH=this.offsetHeight,conH=this.children[0].offsetHeight;
			_this.sH=conH-mH;
		}
		function mfn(e){
			_this.moveY=e.touches[0].clientY-y;
			if(_this.moveY<0){
				str="up";
			}else{
				str="down";
			}
			if(sTop<=0 && str=="down" && _this.settings.refresh){
				if(!flag){
						d_box=document.createElement('div');
						d_box.id=_this.settings.down.down_name;
						this.children[0].insertBefore(d_box,this.children[0].children[0]);	
						flag=true;
				}else{
					if(_this.moveY<=dis){
						var h=_this.moveY;
							d_box.innerHTML=_this.settings.down.down_sx;
					}else if(_this.moveY>dis&&_this.moveY<2*dis){
						var h=dis+(_this.moveY-dis)/2;
							d_box.innerHTML=_this.settings.down.down_sf;    
					}else{
						var h=1.5*dis+(_this.moveY-2*dis)/4;
							d_box.innerHTML=_this.settings.down.down_load;
					}
					d_box.style.height=h+'px';
				}
			}	
		
			if(sTop>=_this.sH && str=="up" &&_this.settings.unload){
	
				if(!flag2){
					u_box=document.createElement('div');
					u_box.id=_this.settings.up.up_name;
					this.children[0].appendChild(u_box);
					flag2=true;
				}else{
					var abs=Math.abs(_this.moveY);
					if(abs<=dis){
						var h=abs;
						u_box.innerHTML=_this.settings.up.up_sx;
					}else if(abs>dis&&abs<2*dis){
		 				var h=dis+(abs-dis)/2;
						u_box.innerHTML=_this.settings.up.up_sf;    
					}else{
		 				var h=1.5*dis+(abs-2*dis)/4;
		 				u_box.innerHTML=_this.settings.up.up_load;
		 			}
					u_box.style.height=h+'px';
			 	}
					
			}
		}
		function efn(e){

			if(sTop<=0 && str=="down" && _this.settings.refresh){
				d_box.style.height=dis+'px';
				d_box.style.webkitTransition='height .3s';
				if(_this.settings.refresh)_this.settings.refresh(_this.container.children[0],d_box);
				flag=false;
				flag2=false;
			}
			if(sTop>=_this.sH && str=="up" &&_this.settings.unload){
				u_box.style.height=dis+'px';
				u_box.style.webkitTransition='height .3s';
				if(_this.settings.unload)_this.settings.unload(_this.container.children[0],u_box);
				flag=false;
				flag2=false;
			}
				
		}
	}
}