var winW=document.documentElement.clientWidth;
	document.documentElement.style.fontSize=winW/3.2+'px';
//var main=new IScroll('#main');
var drop=new Drop('main',{
	refresh:function(container,d_box){

		setTimeout(function(){
			d_box.style.height=0;
			//d_box.style.webkitTransition='height .3s';
			$.ajax({
				url:"data/update.json",
				dataType:'json',
				success:function(e){
					var update=""
					for(var i in e.lists){
						update+="<dl>"
							+"<dt></dt>"
							+"<dd>"
							+"<p>"+e.lists[i].title+"</p>"
							+"<time>"+e.lists[i].date+"</time>"
							+"</dd>"
							+"</dl>";				
					}
					container.innerHTML=update;
				}
			})
		},1000);
	},
	unload:function(container,u_box){
		setTimeout(function(){
			u_box.style.height=0;
			$.ajax({
				url:"data/more.json",
				dataType:'json',
				success:function(e){
					var load=""
					for(var i in e.lists){
						load+="<dl>"
							+"<dt></dt>"
							+"<dd>"
							+"<p>"+e.lists[i].title+"</p>"
							+"<time>"+e.lists[i].date+"</time>"
							+"</dd>"
							+"</dl>";				
					}
					$(container).append($(load));
					$(u_box).remove();
				}
			})
		},1000)
	}
})