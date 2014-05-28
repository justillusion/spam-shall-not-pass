(function( $ ) {
  $.fn.myRobot = function(options, templates) {
    var settings = $.extend(true,{},{
      //'element' : '.antispam',
      //method can be 'get' or 'inherit' from form method
      'var' : 'robot',
      'value': 'no',
      'templates' : {
        'wrap'    : '<div class="robotWrap"></div>',
        'success' : '<span class="success">не</span>',
        'between' : '<span class="between">робот</span>',
        'wrong'   : '<span class="wrong">&times;</span>'
      }
    },options);

    var el = $(this);
    //overflow for parent containder!
    el.css('overflow','hidden');
    tpl = settings.templates;
    //create elements
    /*.append($(settings.templates.success))
                            .append($(settings.templates.between))
                            .append($(settings.templates.wrong));*/
    if (el.length)
      el.each(function(key,val){
        self = this;
        uCls = getid();
        //classes
        var cWrap = settings.var +'-wrap-'+key+uCls;
        var cSucces = settings.var +'-success-'+key+uCls;
        var cWrong = settings.var +'-wrong-'+key+uCls;
        var cBetween = settings.var +'-between-'+key+uCls;
        var asEL = $(tpl.wrap).addClass(cWrap)
          .append($(tpl.success).addClass(cSucces))
          .append($(tpl.between).addClass(cBetween))
          .append($(tpl.wrong).addClass(cWrong))
          .appendTo(self);
        //calculate sizes
        var successSize = $('.'+cSucces).outerWidth(true) + $('.'+cBetween).outerWidth(true);
        var wrongSize = $('.'+cWrong).outerWidth(true) + $('.'+cBetween).outerWidth(true);
        //set width for scope
        asEL.width(asEL.outerWidth());
        //set wrong size as default + offset left
        $(self).width(wrongSize).addClass('wrong');
        $(asEL).css('margin-left', -1*$('.'+cSucces).outerWidth(true)+'px');
        //actions
        $(self).on({
          click: function () {
            if($(this).hasClass('wrong')){
                $(this).width(successSize);
                $(asEL).css('margin-left', '0px');
                $(this).removeClass('wrong');
                humanize(asEL.parents('form'));
              }
              else{
                $(this).width(wrongSize);
                $(asEL).css('margin-left', -1*$('.'+cSucces).outerWidth(true)+'px');
                $(this).addClass('wrong');
                humanize(asEL.parents('form'),true);
              }
          }
        });

      });
    //dunno why named this function
    function humanize(form,clear){
      //add field to form
      if (clear == true){
        form.find('input[name="'+settings.var+'"]').remove();
      }
      else
        $('<input>').attr({'name' :settings.var,
                          'value' :settings.value,
                          'type' : 'hidden'
                        }).appendTo(form);
    }

    //generate random key
    function getid(){
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 5; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
    }
  };
})(jQuery);
