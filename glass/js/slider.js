//�������Ŵ�
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
            if(x <= box.offsetLeft + yellowblock.offsetWidth / 2){//ע��ʹ��box��offsetLeftʱ����ҳ�����Ż��߹���ʱ����bug��������û����ù̶���marginֵ
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
            bigbox.style.backgroundPosition = -x*(bigbox.offsetWidth/smallbox.offsetWidth) + "px " + -y*(bigbox.offsetHeight/smallbox.offsetHeight) + "px";//��������ô�ͼƬ��СͼƬ�ı��������й���Ŀհ�ʱ���������ô�С���ӵı��������ٿհ�
        }
    };
    smallbox.onmouseout = function() {
        yellowblock.style.display = "none";
        bigbox.style.display = "none";
    }
};