//获得id为unsel的元素的内容，去掉开头的空字符<option>和结尾的</option>空字符，按</option>空字符<option>切割，保存到变量unselCts中
var unselCts=document.getElementById("unsel")
                     .innerHTML
                     .replace(/^\s*<option>|<\/option>\s*$/g,"")
                     .split(/<\/option>\s*<option>/);
var selCts=[];//创建空数组selCts
console.log(unselCts);
//获得4个button元素
var btns=document.getElementsByTagName("button");
//遍历btns，为每个btn绑定单击事件
for(var i=0,len=btns.length;i<len;i++){
  btns[i].onclick=move;
}
//获得id为unsel的元素保存在变量unsel中
var unsel=document.getElementById("unsel");
//获得id为sel的元素保存在变量sel中
var sel=document.getElementById("sel");
function move(){ //定义move函数
  switch(this.innerHTML){
    case "&gt;&gt;": //如果当前按钮的内容为>>
      selCts=selCts.concat(unselCts);//将unselCts拼接到selCts结尾
      unselCts.length=0;//清空unselCts
      //or  unselCts=[]新建一个空数组替换掉
      break;
    case "&lt;&lt;": //如果当前按钮的内容为<<
      //将selCts拼接到unselCts结尾
      unselCts=unselCts.concat(selCts);
      //清空selCts
      selCts=[];
      break;
    case "&gt;":
      //获得unsel元素下所有option，保存在opts
      var opts=unsel.getElementsByTagName("option");
      //从后向前遍历opts中每个opt
      for(var i=opts.length-1;i>=0;i--){
        //如果当前opt的selected为true
        if(opts[i].selected)
          selCts.push(unselCts.splice(i,1)[0]);//删除unselCts数组中当前位置的元素，追加到selCts中
      }
      //将selCTs数组按国家名称升序排列
      selCts.sort();
      break;
    case "&lt;":
      var opts=sel.getElementsByTagName("option");
      for(var i=opts.length-1;i>=0;i--){
        if(opts[i].selected)
          unselCts.push(selCts.splice(i,1)[0]);
      }
      unselCts.sort();
      break;
  }
  //将unselCts数组更新到unsel元素上
  updateView(unselCts,unsel);
  //将selCts更新到sel元素上
  updateView(selCts,sel);
}
//专门将一个数组更新到sel元素
function updateView(arr,sel){
  //设置sel的内容为：
    //arr按</option><option>拼接，再开头拼<option>,结尾拼</option>
  sel.innerHTML=arr.length!=0?"<option>"+arr.join("</option><option>")+"</option>":"";
}