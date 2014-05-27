(function( $ ) {
  $.fn.myRobot = function(options, templates) {
    var settings = $.extend(true,{},{
      //'element' : '.antispam',
      //method can be 'get' or 'inherit' from form method
      'method' : 'get',
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
      console.log('success:',successSize, 'wrong',wrongSize);
        //set width for scope
        asEL.width(asEL.outerWidth());
        //set wrong size as default + offset left
        $(self).width(wrongSize).addClass('wrong');
        $(asEL).css('margin-left', -1*$('.'+cSucces).outerWidth(true)+'px');
        //console.log(-1*$('.'+cSucces).outerWidth(true)+'px');
        //hovers
        $(self).on({
         /* mouseenter: function () {
              //stuff to do on mouse enter
              if($(this).hasClass('wrong')){
                $(this).width(successSize);
                $(asEL).css('margin-left', '0px');
                //$(asEL).stop().animate({marginLeft : '+='+$('.'+cWrong).outerWidth(true)+'px'},200);
              }
              else{
                $(this).width(wrongSize);
                $(asEL).css('margin-left', -1*$('.'+cSucces).outerWidth(true)+'px');
              }
          },
          mouseleave: function () {
              //stuff to do on mouse leave
              if($(this).hasClass('wrong')){
                $(this).width(wrongSize);
                $(asEL).css('margin-left', -1*$('.'+cSucces).outerWidth(true)+'px');
              }
              else{
                $(this).width(successSize);
                $(asEL).css('margin-left', '0px');
              }
          },*/
          click: function () {
            if($(this).hasClass('wrong')){
                $(this).width(successSize);
              console.log(successSize);
                $(asEL).css('margin-left', '0px');
                $(this).removeClass('wrong');
                humanize(asEL.parents('form'));
                //$(asEL).stop().animate({marginLeft : '+='+$('.'+cWrong).outerWidth(true)+'px'},200);
              }
              else{
                $(this).width(wrongSize);
              console.log(wrongSize);
                $(asEL).css('margin-left', -1*$('.'+cSucces).outerWidth(true)+'px');
                $(this).addClass('wrong');
                humanize(asEL.parents('form'),true);
              }
          }
        });

      });
    //dunno why named this function
    function humanize(form,clear){
      if (clear == true)
        form.attr('action','');
      else
        form.attr('action',updateURLParameter(form.attr('action'),settings.var,settings.value));
    }
    //copy this code from stackoverflow answer
    function updateURLParameter(url, param, paramVal){
        var TheAnchor = null;
        var newAdditionalURL = "";
        var tempArray = url.split("?");
        var baseURL = tempArray[0];
        var additionalURL = tempArray[1];
        var temp = "";

        if (additionalURL)
        {
            var tmpAnchor = additionalURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor = tmpAnchor[1];
            if(TheAnchor)
                additionalURL = TheParams;

            tempArray = additionalURL.split("&");

            for (i=0; i<tempArray.length; i++)
            {
                if(tempArray[i].split('=')[0] != param)
                {
                    newAdditionalURL += temp + tempArray[i];
                    temp = "&";
                }
            }
        }
        else
        {
            var tmpAnchor = baseURL.split("#");
            var TheParams = tmpAnchor[0];
                TheAnchor  = tmpAnchor[1];

            if(TheParams)
                baseURL = TheParams;
        }

        if(TheAnchor)
            paramVal += "#" + TheAnchor;

        var rows_txt = temp + "" + param + "=" + paramVal;
        return baseURL + "?" + newAdditionalURL + rows_txt;
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
