$(function(){
    //rem
    let clientWidth=$('html').prop('clientWidth');
    let screenWidth=750;
    $('html').css('font-size',clientWidth/screenWidth*100);

    //即将要查询的问卷id
    let surveyId=location.search.match(/id=\d+/)[0];
    let backUrlMatch=location.search.match(/(\?|&)back=.*(\b$|(?=&))/);
    let backUrl='';
    if(backUrlMatch && backUrlMatch[0]!==undefined){
        backUrl=backUrlMatch[0].split('=')[1]
    }
    backUrl=decodeURIComponent(backUrl);
    sessionStorage.setItem('backUrl',backUrl)
    //下版本功能
    // $.ajax({
    //     url:`http://222.217.61.56:443/qm/backend/web/index.php?r=cover-template%2Fapi-template2&${surveyId}`,
    //     type:'get',
    //     dataType:'json',
    // }).then((res)=>{
    //     sessionStorage.setItem('styleInfo',JSON.stringify(res));
    //     let tempId=res.type;
    //     let search=`?${surveyId}`;
    //     console.log(res)

    //     if(res.welcome.required){
    //         //设置背景图
    //         $('.bg>img').prop('src',res.welcome.img);
    //         //进入按钮的跳转
    //         $('.container>button').click(()=>{
    //             location.href=`./questionnaire${tempId && tempId>=1 ? tempId : ''}.html${search}`;
    //         })
    //         $('.container').show()
    //     }else{
    //         location.replace(`./questionnaire${tempId && tempId>=1 ? tempId : ''}.html${search}`);
    //     }
    // })
    let search=`?${surveyId}`;
    $('.container>button').click(()=>{
        let absUrl=location.origin+location.pathname+location.search;
        // eleClick(eCode, tPg, tLoc, tTagName, tUrl)
        location.href=`./questionnaire.html${search}`;
    })
    console.log(location)
    $('.container').show();
    //页面浏览埋点
    pageData(1,'欢迎页');
})