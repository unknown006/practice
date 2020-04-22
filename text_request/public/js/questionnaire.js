$(function(){
    //rem
    let clientWidth=$('html').prop('clientWidth');
    let screenWidth=750;
    $('html').css('font-size',clientWidth/screenWidth*100);

    //全局变量
    let surveyId=Number(location.search.slice(1).match(/id=\d+/)[0].split('=')[1]);
    let questionList=[];
    //保存问卷信息(标题,背景图url等)
    let surveyInfo={}; 
    //保存多选选项顺序列表
    let checkBoxOrderedList=[];
    //url
    //正式地址
    let baseUrl='https://inventory.baojunev.com/questionmanagement';
    //测试地址
    // let baseUrl='http://222.217.61.56:443/qm';
    let questionListUrl=`${baseUrl}/api/web/index.php?r=question-info/questions&id=${surveyId}`;
    let postAnswerListUrl=`${baseUrl}/api/web/index.php?r=question-info/save&id=${surveyId}`;
    let getVerifyCodeUrl=`${baseUrl}/api/web/index.php?r=question-info/send-sms`;
    let verifyMobileUrl=`${baseUrl}/api/web/index.php?r=question-info/check-sms`;
    // let sendDiscountUrl=`http://172.22.14.72/api/v2/discount/sendDiscount`;
    // //Integer discountId, String phoneStr
    //发送用户的回答
    function submitData(data){
        return $.ajax({
            url:postAnswerListUrl,
            type:'post',
            data:JSON.stringify(data),
            contentType:'application/json',
            dataType:'json',
        })
    }
    //发券请求
    function sendDiscount(data){
        return $.ajax({
            url:sendDiscountUrl,
            type:'post',
            data:JSON.stringify(data),
            contentType:'application/json',
            dataType:'json',
        })
    }
    //获取手机验证码
    function getVerifyCode(phoneNum){
        let data={};
        data.mobile=phoneNum;
        return $.ajax({
            url:getVerifyCodeUrl,
            type:'post',
            data:JSON.stringify(data),
            contentType:'application/json',
            dataType:'json',
        })
    }
    //验证手机验证码
    function verifyMobile(data){
        return $.ajax({
            url:verifyMobileUrl,
            type:'post',
            data:JSON.stringify(data),
            contentType:'application/json',
            dataType:'json',
        })
    }
    if(surveyId){
        //请求问题列表
        $('.loading').show();
        $('.container>section').hide();
        $.ajax({
            url:questionListUrl,
            type:'get',
            contentType:'application/json',
            dataType:'json',
        }).then(({questions,survey})=>{
            console.log(questions,survey)
            if(survey.status==0){
                location.href='./state.html?state=unused';
            }else{
                surveyInfo=survey;
                questionList=questions;
                //排序
                questionList.sort((a,b)=>{
                    return a.order_num-b.order_num;
                })
                //初始化
                init();

                $('.loading').hide();
                $('.container>section').show();
            }
        })

    }else{
        $('.container>*:not(header):not(.fail)').hide();
        $('.container>.fail').show();
    }
    //挂载自定义样式
    function applyCustomStyle(){
        let styleInfo=sessionStorage.getItem('styleInfo');
        styleInfo=JSON.parse(styleInfo);
        console.log(styleInfo)
    }
    //初始化渲染
    function init(){
        //更改标题和问卷内容
        $('section>header').find('.title>p').html(surveyInfo.title);
        $('section').find('.desc').html(surveyInfo.brief);
        
        //创建问题并挂载
        appendToViewByList(questionList)
        
        //绑定事件
        bindEvent();
        
        //设置样式(下版本)
        // applyCustomStyle();
        
        //页面浏览埋点
        pageData(2,'问卷页');
    }
    //根据数据创建并挂载至文档
    function appendToViewByList(data){
        let html='';
        data.forEach((elem)=>{
            switch(elem.answer_method){
                case 1:
                    html+=crtRadio(elem);
                break;
                case 2:
                    html+=crtCheckBox(elem);
                break;
                case 3:
                    html+=crtSelect(elem);
                break;
                case 4:
                    html+=crtTextarea(elem);
                break;
            }
        })
        if(surveyInfo.vertify_phone==1){
            html+=`<li class="item phone">
                    <div class="title">
                        <span>*</span><span>${data.length+1}</span>、<span>填写手机号</span>
                    </div>
                    <div class="input">
                        <div class="phone-num">
                            <input type="number" placeholder="请输入手机号码">
                        </div>
                        <div class="verify-code">
                            <input type="number" placeholder="请输入验证码">
                            <button>获取验证</button>
                        </div>
                    </div>
                </li>`;
        }
        $('section>section>.list').html(html);
    }
    //检测是否有未填项
    function getfirstUnfilledIndex(){
        let index=-1;
        let $questionList=$('section>section>.list');
        $questionList.children().each(function(i,elem){
            let isRequired=false;
            isRequired=$(elem).find('.title>span:first-child').html()!='';
            if(isRequired){
                let answerMethod=Number($(elem).attr('data-answer-method'));
                let data;
                switch(answerMethod){
                    case 1:
                        data=getRadioData($(elem));
                        if(data.option_id=='' || data.option_content==''){
                            // isPass=false;
                            index=i;
                        }
                    break;
                    case 2:
                        data=getCheckboxData($(elem));
                        if(data.length<=0){
                            // isPass=false;
                            index=i;
                        }
                    break;
                    case 3:
                        data=getSelectData($(elem));
                        if(data.option_id=='' || data.option_content==''){
                            // isPass=false;
                            index=i;
                        }
                    break;
                    case 4:
                        data=getTextData($(elem));
                        if(data.option_content==''){
                            // isPass=false;
                            index=i;
                        }
                    break;

                }
                if(index!=-1){
                    return false;
                }
            }
        })
        return index;
    }
    //获取所有问题的回答数据
    function getQuestionsData(){
        let dataList=[];
        let $questionList=$('section>section>.list');
        $questionList.children().each(function(i,elem){
            let data;
            let answerMethod=Number($(elem).attr('data-answer-method'));
            switch(answerMethod){
                case 1:
                    data=getRadioData($(elem));
                    if(data.option_id!='' && data.option_content!=''){
                        dataList.push(data);
                    }
                break;
                case 2:
                    data=getCheckboxData($(elem));
                    //排序
                    data.sort((a,b) => a.order_num-b.order_num);
                    if(data.length>0){
                        dataList=dataList.concat(data);
                    }
                break;
                case 3:
                    data=getSelectData($(elem));
                    if(data.option_id!='' && data.option_content!=''){
                        dataList.push(data);
                    }
                break;
                case 4:
                    data=getTextData($(elem));
                    if(data.option_content!=''){
                        dataList.push(data);
                    }
                break;
            }
        })
        console.log(dataList)
        return dataList;
    }
    //验证手机号
    function checkPhoneNum(phoneNum){
        let phoneReg=/^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        return phoneReg.test(phoneNum)
    }
    //绑定全局事件
    function bindEvent(){
        //单选问题选项
        $('section>section>.list').on('click','.item.radio>.options>.option',function(){
            $(this).addClass('checked').siblings().removeClass('checked');
        })
        //多选问题选项
        $('section>section>.list').on('click','.item.checkbox>.options>.option',function(){
            let questionId=Number($(this).parent().parent().attr('data-id'));
            let optionId=Number($(this).attr('data-id'));
            let hasItem=checkBoxOrderedList.some((item,index,list)=>{
                return item.id==questionId;
            })
            if(!hasItem){
                let question={id:questionId,optionsId:[optionId]};
                checkBoxOrderedList.push(question);
            }else{
                if($(this).hasClass('checked')){
                    let question=checkBoxOrderedList.find((item)=>{
                        return item.id==questionId;
                    })
                    let questionIndex=checkBoxOrderedList.findIndex((item)=>{
                        return item.id==questionId;
                    })
                    let optionIndex=question.optionsId.findIndex((id)=>{
                        return id==optionId;
                    })
                    question.optionsId.splice(optionIndex,1);
                    if(question.optionsId.length<=0){
                        checkBoxOrderedList.splice(questionIndex,1);
                    }
                }else{
                    let question=checkBoxOrderedList.find((item)=>{
                        return item.id==questionId;
                    })
                    question.optionsId.push(optionId)
                }
            }
            $(this).toggleClass('checked');
        })
        //下拉菜单
        $('section>section>.list').on('click','.item.select>.selector',function(){
            $(this).find('.options').toggle();
        })
        //下拉菜单的选项
        $('section>section>.list').on('click','.item.select>.selector>.options>.option',function(){
            let content=$(this).html();
            let id=$(this).attr('data-id');
            $(this).parent().prev().html(content).css('color','#333').attr('data-id',id);
        })
        //点击窗口任意位置隐藏所有下拉
        $('body').on('click',function(e){
            if(!$(e.target).hasClass('selector')){
                $('section>section>.list>.item.select>.selector>.options').hide(); 
            }
        })
        //获取手机验证码按钮
        $('section>section>.list>.item.phone').find('.verify-code>button').on('click',function(){
            let fontColor=$(this).css('color');
            let mobile=$(this).parent().prev().children('input').val();
            //验证手机号
            let canPass=checkPhoneNum(mobile);
            if(canPass){
                let time=60;
                let timer=setInterval(()=>{
                    if(time<=0){
                        $(this).prop('disabled',false);
                        $(this).html(`获取验证`).css('color',fontColor);
                        clearInterval(timer);
                    }else{
                        $(this).prop('disabled',true);
                        $(this).html(`重新获取(${time--})`).css('color','#BBB');
                    }
                },1000)
                getVerifyCode(mobile).then((res)=>{
                    console.log(res)
                })
            }else{
                alert('手机号格式有误')
            }
        })
        //提交按钮的点击事件
        $('footer>button').click(function(){
            let $this=$(this);
            let index=getfirstUnfilledIndex();
            let buttonColor=$(this).css('background-color');
            if(surveyInfo.vertify_phone==1){
                let mobile=$('section>section>.list>.item.phone').find('.phone-num>input').val();
                let code=$('section>section>.list>.item.phone').find('.verify-code>input').val();
                if(index==-1){
                    if(mobile==''){
                        alert('手机号码不能为空！')
                    }else if(code==''){
                        alert('验证码不能为空！')
                    }else{
                        $this.prop('disabled',true).css('background','#BBB').html('正在提交');
                        verifyMobile({mobile,code}).then((res)=>{
                            if(res.code==200){
                                let obj={};
                                let dataList=getQuestionsData();
                                obj.questionData=dataList;
                                obj.phone=mobile || '';
                                submitData(obj).then((res)=>{
                                    if(res.code==100){
                                        location.href='./state.html?state=success';
                                    }else if(res.code==101){
                                        alert('您已提交过此问卷，请勿重复提交！')
                                    }else if(res.code=102){
                                        alert('提交失败！')
                                    }
                                    $this.prop('disabled',false).css('background',buttonColor).html('提交');
                                })           
                            }else{
                                alert('手机号码验证失败！')
                                $this.prop('disabled',false).css('background',buttonColor).html('提交');
                            }
                        })
                    }
                }else{
                    alert(`请填写第${index+1}题！`)
                }
            }else{
                if(index==-1){
                    let obj={};
                    let dataList=getQuestionsData();
                    obj.questionData=dataList;
                    obj.phone='';
                    $this.prop('disabled',true).css('background','#BBB').html('正在提交');
                    submitData(obj).then((res)=>{
                        if(res.code==100){
                            location.href='./state.html?state=success';
                        }else if(res.code==101){
                            alert('您已提交过此问卷，请勿重复提交！')
                        }else if(res.code=102){
                            alert('提交失败！')
                        }
                        $this.prop('disabled',false).css('background',buttonColor).html('提交');
                    })
                }else{
                    alert(`请填写第${index+1}题！`)
                }
            }
        })
    }
    //获取单选问题数据
    function getRadioData($questionItem){
        let obj={};
        obj.survey_id=surveyId;
        obj.question_id=Number($questionItem.attr('data-id'));
        obj.option_id=Number($questionItem.find('.options>.option.checked').attr('data-id')) || '';
        obj.option_content=$questionItem.find('.options>.option.checked>span.text').html() || '';
        return obj;
    }
    //获取多选问题数据
    function getCheckboxData($questionItem){
        let questionId=Number($questionItem.attr('data-id'));
        let list=[];
        $questionItem.find('.options>.option.checked').each(function(i,elem){
            let optionId=Number($(elem).attr('data-id'));
            let obj={};
            obj.survey_id=surveyId;
            obj.question_id=questionId;
            obj.option_id=optionId;
            obj.option_content=$(elem).children('span.text').html();
            let question=checkBoxOrderedList.find((item)=>{
                return item.id==questionId;
            })
            let optionIdIndex=question.optionsId.findIndex((item)=>{
                return item==optionId;
            })
            obj.order_num=optionIdIndex+1;
            list.push(obj);
        })
        return list;
    }
    //获取下拉菜单问题数据
    function getSelectData($questionItem){
        let obj={};
        obj.survey_id=surveyId;
        obj.question_id=Number($questionItem.attr('data-id'));
        obj.option_id=Number($questionItem.find('.selector>span:first-child').attr('data-id')) || '';
        obj.option_content=$questionItem.find('.selector>span:first-child').html() || '';
        return obj;
    }
    //获取填空问题数据
    function getTextData($questionItem){
        let obj={};
        obj.survey_id=surveyId;
        obj.question_id=Number($questionItem.attr('data-id'));
        obj.option_id='';
        obj.option_content=$questionItem.find('.textarea>textarea').val();
        return obj;
    }
    //创建单选问题
    function crtRadio({answer_method,content,options,order_num,problem_id,required}){
        let html='';
        let option='';
        options.forEach((elem)=>{
            option+=`<li class="option" data-id="${elem.option_id}">
                        <i class="icon"></i>
                        <span class="text">${elem.content}</span>
                    </li>`;
        })
        html=`<li class="item radio" data-id="${problem_id}" data-answer-method="${answer_method}">
                <div class="title">
                    <span>${required?'*':''}</span><span>${order_num}</span>、<span>${content}</span>
                </div>
                <ul class="options">
                    ${option}
                </ul>
            </li>`
        return html;
    }
    //创建多选问题
    function crtCheckBox({answer_method,content,options,order_num,problem_id,required}){
        let html='';
        let option='';
        options.forEach((elem)=>{
            option+=`<li class="option" data-id="${elem.option_id}">
                        <i class="icon"></i>
                        <span class="text">${elem.content}</span>
                    </li>`;
        })
        html=`<li class="item checkbox" data-id="${problem_id}" data-answer-method="${answer_method}">
                <div class="title">
                    <span>${required?'*':''}</span><span>${order_num}</span>、<span>${content}</span>
                </div>
                <ul class="options">
                    ${option}
                </ul>
            </li>`
        return html;
    }
    //创建下拉菜单
    function crtSelect({answer_method,content,options,order_num,problem_id,required}){
        let html='';
        let option='';
        options.forEach((elem)=>{
            option+=`<li class="option" data-id="${elem.option_id}">
                        <span class="text">${elem.content}</span>
                    </li>`;
        })
        html=`<li class="item select" data-id="${problem_id}" data-answer-method="${answer_method}">
                <div class="title">
                    <span>${required?'*':''}</span><span>${order_num}</span>、<span>${content}</span>
                </div>
                <div class="selector">
                    <span data-id="">请选择选项</span>
                    <ul class="options">
                        ${option}
                    </ul>
                </div>
            </li>`
        return html;
    }
    //创建填空
    function crtTextarea({answer_method,content,order_num,problem_id,line_height,required}){
        let html='';
        html=`<li class="item text" data-id="${problem_id}" data-answer-method="${answer_method}">
                <div class="title">
                    <span>${required?'*':''}</span><span>${order_num}</span>、<span>${content}</span>
                </div>
                <div class="textarea">
                    <textarea rows="${line_height || 1}" placeholder="请填写内容"></textarea>
                </div>
            </li>`
        return html; 
    }
})