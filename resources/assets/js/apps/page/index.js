import validation from 'jquery-validation'
import jqueryForm from 'jquery-form'
import validationMsgZh from 'jquery-validation/dist/localization/messages_zh'

var site = {
  parseFrom: () => {
    $('form').each(function(){
      const form = $(this);
      form.validate({
        submitHandler: function(form) {
          $(form).ajaxSubmit({
            dataType:"jsonp",
            success:(response => {
              form.find('.thankyou-mask').show();
              console.log(response);
            })
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
  }
}

$( document ).ready(function() {
  site.parseFrom();
});