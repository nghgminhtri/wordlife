jQuery(document).ready(function($){
    var dst = {
        init: function() {
            //Select all editable text
            jQuery.fn.selectText = function(){
                var doc = document;
                var element = this[0];
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
            $('.words ul').on('click','li',function(event){
                $('.card').parent().children().css('border','5px black solid');
                $(this).children().css('border','15px orange solid');
                $('.words ul li').removeAttr('selected');
                $(this).attr('selected', 'selected');
            });

            //When click minus icon
            $('.glyphicon.glyphicon-minus').click(function(){ //Remove selected card + image
                var wordli = $('.words ul li[selected="selected"]');
                wordli.remove();

            })

            //When click edit icon
            $('.glyphicon.glyphicon-edit').click(function(){
                var wordli = $('.words ul li[selected="selected"]');
                wordli.find('.card p').attr('contenteditable','true');
                wordli.find('.card p').selectText();

                var currentText = wordli.find('.card p').html();
                wordli.find('.card p').unbind('blur').blur(function(){
                    $(this).attr('contenteditable','false');

                    var new_word = $(this).html();
                    if (currentText != $(this).html()) {
                        var imgElem = $(this).parent().siblings('.image').find('img');
                        var image = dst.ajaxWord(imgElem, wordListId, new_word, currentText);
                    }
                })
            });

            //When click plus icon
            $('.glyphicon.glyphicon-plus').click(function(){
                // remove highlight card
                $('.card').parent().children().css('border','5px black solid')
                // remove selected marker
                $('.words ul li').removeAttr('selected');

                $('.words ul').prepend(
                    '<li selected="selected"><div class="card" style="border: 15px solid orange;"><p contenteditable="true"></p></div><div align="center" class="image" style="border: 15px solid orange;"><img src=""></div></li>'
                );
                // focus
                $('.words ul:first-child').find('p').selectText();

                var wordli = $('.words ul li[selected="selected"]');
                wordli.find('p[contenteditable="true"]').unbind('blur').blur(function() {
                    $(this).attr('contenteditable','false');

                    if ($(this).html()) {
                        var imgElem = $(this).parent().siblings('.image').find('img');
                        var image = dst.ajaxWord(imgElem, wordListId, $(this).html());
                    }
                })
            })
            $('.glyphicon.glyphicon-volume-up').click(function(){
//                alert('Làm đi Trí');
            });
        },
        ajaxWord: function(element, word_list_id, new_word, old_word) {
            new_word = new_word.trim().toLowerCase();
            old_word = old_word || '';
            var postData = {
                word: new_word,
                word_list_id: word_list_id
            };
            if (old_word) {
                postData.old_word = old_word;
            };
            console.log(postData);
            $.ajax({
                url: '/word/',
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    console.log(data.image);
                    element.attr('src', data.image);
                },
                data: JSON.stringify(postData)
            });
        }
    };

    dst.init();
});