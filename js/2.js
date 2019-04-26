/*
    原生js
    第三方库：用原生JS将常用的功能按照一定的逻辑封装起来，方便快速开发
    常见的库：jQuery  Prototype  YUI MoolTool...
    getElementById  getElementByTagName   getElementByClassName   设置（设置）样式

*/
//创建Base对象
//selector  选择器
function $(selector){
    return new Base(selector);
}
//库对象
function Base(selector){
    this.else=[];//数组  保存节点对象
    if(selector!=undefined){
        if(typeof selector=='object'){
            this.else.push(selector);//将跌点对象储存
        }else{
            //选择器  #box   .one  p
            var c=selector.charAt(0);//取出第一个字符;
            switch(c){
                case '#':
                    //id选择器
                    var id=selector.substring(1);
                    this.getId(id);
                break;
                case '.':
                    //类选择器
                    var cls=selector.substring(1);
                    this.getClass(cls);
                break;
                default:
                    //元素选择器
                    this.getTag(selector);
                break;
            }
        }
    }
}

//根据ID查找节点对象
Base.prototype.getId=function(id){
    var o=document.getElementById(id);
    this.else.push(o);
    return this;//返回当前对象，目的为了连缀（调用当前对象的其他方法）
};

//根据TagName查找节点对象
//1.一个参数在全局查找
//2.二个参数在注定节点下查找节点对象
Base.prototype.getTag=function(TagName,parentNode){
    // if(parentNode!=undefined){
    //     var os=parentNode.getElementsByTagName(TagName);
    // }
    var o=parentNode==undefined?document:parentNode;
    var os=o.getElementsByTagName(TagName);
    for(var i=0;i<os.length;i++){
        this.else.push(os[i]);
    }
    return this;
}

//根据ClssName修改节点对象
Base.prototype.getClass=function(cls){
    var os=document.getElementsByClassName(cls);
    for(var i=0;i<os.length;i++){
        this.else.push(os[i]);
    }
    return this;
}

//根据索引查找节点对象
Base.prototype.eq=function(index){
    var o=this.else[index];
    this.else=[];
    this.else.push(o);
    return this;
}



//修改样式  property 样式名  value  样式值
/*
    获取或设置样式的值
    两个参数时：设置
    一个参数时：获取样式

*/
Base.prototype.css=function(property,value){
    //两个参数  设置样式
    if(value!=undefined){
        //遍历节点对象
        for(var i=0;i<this.else.length;i++){
            this.else[i].style[property]=value;
        }
    }else if(typeof property=='object'){
        //一个参数 ，对象。
        //遍历节点对象
        for(var j=0;j<this.else.length;j++){
            //遍历样式对象
            for(var k in property){
                this.else[j].style[k]=property[k];//取出样式对象的属性和值
            }
        }
    }else{
        //一个参数  获取样式的值
        var s=this.else[0].style[property];//只能取行内
        // if(s==''){
        //     s=window.getComputedStyle(this.else[0],null)[property];
        // }
        return s==''?window.getComputedStyle(this.else[0],null)[property]:s;
    }
    
    return this;
}

//添加class
Base.prototype.addClass=function(clsName){
    for(var i=0;i<this.else.length;i++){
        //取出原来的样式，追加 更改新样式
        var cls=this.else[i].className+' '+clsName;
        this.else[i].className=cls;
    }
    return this;
};

//移除class
Base.prototype.removeClass=function(clsName){
    for(var i=0;i<this.else.length;i++){
        if(this.else[i].className.indexOf(clsName)!=-1){
            var cls=this.else[i].className.replace('className','');//替换
            this.else[i].className=cls;
        }
    }
    return this;
}

//显示 隐藏

Base.prototype.hide=function(){
    for(i=0;i<this.else.length;i++){
        this.else[i].style.display='none';
    }
    return this;
}

Base.prototype.show=function(){
    for(i=0;i<this.else.length;i++){
        this.else[i].style.display='block';
    }
    return this;
}

//切换
Base.prototype.toggle=function(){
    for(var i=0;i<this.else.length;i++){
       var o=this.else[i];//节点对象
       var s=o.style.display;//行内样式
       s=s==''?window.getComputedStyle(o,null).display:s;
       if(s=='none'){
           o.style.display='block';
       }else{
           o.style.display='none';
       }
    }
    return this;
};


//修改内容

//1.设置节点对象内容
//2.获取节点对象内容
Base.prototype.html=function(value){
    //无参
    if(value==undefined){
        //获取节点内容
        return this.else[0].innerHTML;//返回第一个节点对象的内容
    }

    for(var i=0;i<this.else.length;i++){
        this.else[i].innerHTML=value;
    }
    return this;
}

//设置输入类型的值
//无参时  取值           有参时 设置value
Base.prototype.val=function(value){
    // 有参时 设置value
    if(value!=undefined){
            for(var i=0;i<this.else.length;i++){
                this.else[i].value=value;
            }
        }else{
            //无参时  取值
            return this.else[0].value
    }
    
    return this;
}

//属性的修改
//1.获取属性值 或批量设置属性（一个参数）
//2.设置属性的值（两个参数）
Base.prototype.attr=function(property,value){
    if(value!=undefined){
        //有值
        for(var i=0;i<this.else.length;i++){
            this.else[i][property]=value
        }
    }else if(typeof property=="object"){
        //批量设置属性  遍历节点对象
        for(var i=0;i<this.else.length;i++){
            //遍历对象，取出属性名和属性值
            for(var j in property){
                this.else[i][j]=property[j];
            }
        }
    }else{
        //一个参数   获取值
        return this.else[0][property];
    }
    
    return this;
}

//事件
//fn  事件处理函数
Base.prototype.click=function(fn){
    //遍历节点对象
    for(var i=0;i<this.else.length;i++){
        this.else[i].onclick=fn;
    }
    return this;
};

//为节点对象添加鼠标经过事件
Base .prototype.mouseover=function(fn){
    for(var i=0;i<this.else.length;i++){
        this.else[i].onmouseover=fn;
    }
    return this;
};
//为节点对象添加鼠标离开事件
Base .prototype.mouseout=function(fn){
    for(var i=0;i<this.else.length;i++){
        this.else[i].onmouseout=fn;
    }
    return this;
};

//hover方法
Base.prototype.hover=function(fn_over,fn_out){
    for(var i=0;i<this.else.length;i++){
        this.else[i].onmouseover=(fn_over);
        this.else[i].onmouseout=(fn_out);
    }
    return this;
}


//内容改变事件
Base.prototype.change=function(fn){
    for(var i=0;i<this.else.length;i++){
        this.else[i].onchange=fn;
    }
    return this;
}