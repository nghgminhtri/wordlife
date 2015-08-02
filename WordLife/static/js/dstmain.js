jQuery(document).ready(function($){
    //Dropdown

    //Select all editable text
    jQuery.fn.selectText = function(){
        var doc = document;
        var element = this[0];
        console.log(this, element);
        if (doc.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(element);
            range.select();
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    };
    //--------------------------------
    //When click a card or an image
    $('.listname').blur(function(){
            $(this).attr('contenteditable','false');
        })
    $('.listdesc').on('click',function(){
        $(this).parent().find('.listdesc').attr('contenteditable','true');
        $(this).parent().find('.listdesc').selectText();
    })
    $('.container ul').on('click','li',function(){
        $(this).parent().children().css('background','')
        $(this).css('background','linear-gradient(gray,white)');
        wordli=$(this);
        $('.removebox').click(function(){
            wordli.remove();
        })
        $('.glyphicon.glyphicon-pencil').on('click',function(){
            $(this).parent().find('.listname').attr('contenteditable','true');
            $(this).parent().find('.listname').selectText();

        })
    })
    $('.container ul li').on('dblclick',function(){
        window.location.href="/list/" + $(this).attr('data-id');
    });
    $('.glyphicon-folder-open').on('click',function(){
        window.location.href="/learn/" + $(this).parents('li').attr('data-id');
    })
    $('.addbox').click(function(){
        console.log('clicked');
        var newli=document.createElement("li");
        var newnamebar=document.createElement("div");
        var newnamedesc=document.createElement("div");
        var newnlistname=document.createElement("div");
        var newnlistdesc=document.createElement("div");
        var newspan1=document.createElement("span");
        var newspan2=document.createElement("span");
        var nametxt="Danh sách "+ (parseInt($('.container ul li').length)+1);
        var desctext='description';
        $('.container ul').prepend(newli);
        $('.container ul li:first-child').prepend(newnamebar);
        $('.container ul li:first-child div').addClass('name_bar');
        $('.container ul li:first-child .name_bar').append(newnamedesc);
        $('.container ul li:first-child .name_bar div').addClass('name_desc');
        $('.container ul li:first-child .name_bar').append(newspan2);
        $('.container ul li:first-child .name_bar span:last-child').addClass('glyphicon glyphicon-folder-open');
        $('.container ul li:first-child .name_bar').append(newspan1);
        $('.container ul li:first-child .name_bar span').addClass('glyphicon glyphicon-pencil'); 				
        $('.container ul li:first-child .name_bar .name_desc').append(newnlistname);
        $('.container ul li:first-child .name_bar .name_desc div').addClass('listname');
        $('.container ul li:first-child .name_bar .name_desc').append(newnlistdesc);
        $('.container ul li:first-child .name_bar .name_desc div:last-child').addClass("listdesc");
        $('.container ul li:first-child .name_bar .name_desc .listname').prepend(nametxt);
        $('.container ul li:first-child .name_bar .name_desc .listdesc').prepend(desctext);
    })

    //When click plus icon

});