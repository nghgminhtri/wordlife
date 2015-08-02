jQuery(document).ready(function($){
    if (wordlist.length > 0 ) {
        //Dropdown
        var scorecount=0;
        var clicked=0;
        var total=wordlist.length;
        $('.next').on('click',function(){
            clicked++;
            var res=$(this).parent().parent().find('.result');
            var submissionlink=$(this).parent().parent().parent().parent().parent().find('.textbox .textarea input')
            var submission= submissionlink.val();
            submission=submission.toLowerCase();
            if (submission!=''){
                if (submission=='apple'){
                    console.log('true');
                    console.log(res);
                    res.css('background','#19FF19');
                    scorecount++;
                }
                else{
                    res.css('background','red');
                }
                res.fadeOut(1000,function(){
                    res.css('background','');
                    res.fadeIn(1000);
                    var imglink=submissionlink.parent().parent().parent().find('.image img');
                    if (clicked<total)
                    {
                        submissionlink.val('');
                        imglink.attr('src','http://www.cachphacafengon.com/kcfinder/upload/images/chuoi.jpg'); //link moi
                    }
                    else
                    {
                        alert(' Bạn đã hoàn tất ! Kết quả: ' + scorecount+' / '+total);
                        console.log('this',$(this));
                        $('.next').off();
                    }
                });

            }
        });
    }
});