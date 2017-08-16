//案例：放大镜
function $(id) {
    return document.getElementById(id);
}
window.onload = function() {
    var box = $("box");
    var smallbox = box.children[0];
    var bigbox = box.children[1];
    var yellowblock = smallbox.children[0];
    smallbox.onmouseover = function() {
        yellowblock.style.display = "block";
        bigbox.style.display = "block";
        smallbox.onmousemove = function(event){
            event = event || window.event;
            var x = event.clientX;
            var y = event.clientY;
            if(x <= box.offsetLeft + yellowblock.offsetWidth / 2){//注意使用box的offsetLeft时，当页面缩放或者滚动时会有bug，所以最好还是用固定的margin值
                x = 0;
            }else if(x >= box.offsetLeft + smallbox.offsetWidth - yellowblock.offsetWidth / 2){
                x = smallbox.offsetWidth - yellowblock.offsetWidth;
            }else{
                x = x - box.offsetLeft - yellowblock.offsetWidth / 2;
            }
            if(y <= box.offsetTop + yellowblock.offsetHeight / 2){
                y = 0;
            }else if(y >= box.offsetTop + smallbox.offsetHeight - yellowblock.offsetHeight / 2){
                y = smallbox.offsetHeight - yellowblock.offsetHeight;
            }else{
                y = y - box.offsetTop - yellowblock.offsetHeight / 2;
            }
            yellowblock.style.left = x + "px";
            yellowblock.style.top = y  + "px";
            bigbox.style.backgroundPosition = -x*(bigbox.offsetWidth/smallbox.offsetWidth) + "px " + -y*(bigbox.offsetHeight/smallbox.offsetHeight) + "px";//如果是利用大图片和小图片的比例若在有过多的空白时，可以利用大小盒子的比例来减少空白
        }
    };
    smallbox.onmouseout = function() {
        yellowblock.style.display = "none";
        bigbox.style.display = "none";
    }
};