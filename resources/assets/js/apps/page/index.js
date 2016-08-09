import validation from 'jquery-validation'
import validationMsgZh from 'jquery-validation/dist/localization/messages_zh'

var Site = {

  init: () => {
    Site.parseFrom();
    $('.msg-close').click(()=>{
      $('.msg-mask').hide();
    });
  },

  parseFrom: () => {
    $('form').each(function(){
      const form = $(this);
      form.validate({
        submitHandler: function() {
          $.ajax({
            url: "http://localhost:8080/post",
            dataType: "jsonp",
            jsonpCallback: "callback",
            data: form.serialize(),
            success: response => {
              Site.showMsg(form.attr('msg'));
            },
            error: response => {
              Site.showMsg("表单提交失败，请稍后再试。");
            }
          });
        }
      });

      const toggleThankyouMsg = function(){
        const mask = form.find('.thankyou-mask');
        mask.toggle();
      };
      
      const labels = form.find('.label-inside');
      labels.each(function(){
        const label = $(this);
        const input = $('#' + label.attr('for'));
        input.focus(function(){
          label.hide()
        });

        input.blur(function(){
          if (this.value.length === 0){
            label.show();
          }
        });
      });
    });
  },

  showMsg: (msg) => {
    const msgBox = $('.msg-mask');
    const msgBody = $('.msg-body');
    msgBody.html(msg);
    msgBox.show();
  }

}

$( document ).ready(function() {
  Site.init();
});