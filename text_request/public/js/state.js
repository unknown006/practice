$(function(){
    //rem
    let clientWidth=$('html').prop('clientWidth');
    let screenWidth=750;
    $('html').css('font-size',clientWidth/screenWidth*100);
    //修改标题和内容
    let state=location.search.slice(1).split('=')[1];
    let html='';
    let backUrl=sessionStorage.getItem('backUrl');
    if(state=='success'){
        html=`<img src="./img/chenggong@2x.png" alt="图片加载失败..."><p>已成功提交，谢谢！</p>`;
        //页面浏览埋点
        pageData(4,'问卷提交成功页');
    }else if(state=='unused'){
        html=`<img src="./img/tingyong@2x.png" alt="图片加载失败..."><p>对不起，页面已暂时关闭。</p>`;
        //页面浏览埋点
        pageData(3,'问卷停用页');
    }
    $(html).appendTo($('.container>section'));
    if(!backUrl){
        $('.container>button').on('click',function(){
            location.replace(backUrl);
        })
        .show();
    }
    console.log(backUrl)
})