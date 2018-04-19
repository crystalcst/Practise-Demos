require('./styles/main.scss');

window.onload = function() {
    let oUl = document.querySelector('.nav-middle ul');
    let oDiv = document.querySelector('footer');

    function eventExist(e) {
        let evt = e || window.event;
        let target = e.target || e.srcElement;
        return target;
    }
    /**
     * changeTabp: 切换导航栏，并切换active className
     * @param {event.target} event 
     * @param {委托监听的children目标} targetObj 
     */
    function changeTab(event, targetObj) { //切换导航栏
        let target = eventExist(event);
        if (target.nodeName.toLowerCase() === targetObj) {
            if (target.classList.contains('active')) { // 如果拥有active class
                return;
            } else { // 否则
                let activeObj = document.querySelector(".nav-middle .active");
                activeObj.classList.remove('active');
                target.classList.add('active');
            }
        }
    }

    oUl.addEventListener("click",(e)=> { // 监听导航栏，活动状态显示红色
        changeTab(e, 'li');
    });

    oDiv.addEventListener("click", (e) => {
        let target = eventExist(e);

        if (target.nodeName.toLowerCase() === 'i' || target.nodeName.toLowerCase() === 'span') {
            let parent = target.parentNode;
            if(parent.classList.contains('active')){
                return;
            }else {
                let activeObj = document.querySelector("footer .active");
                activeObj.classList.remove('active');
                parent.classList.add('active');
            }
        }
    });
}