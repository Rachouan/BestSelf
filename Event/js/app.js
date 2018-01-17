$(function() {


  function init() {

    $(".btn-menu").on("click", function(e) {
      e.preventDefault();
      $("#menu").toggleClass("open");
    });

    $(document).on('click', 'a[href^="#"]', function(e) {
        // target element id
        var id = $(this).attr('href');

        // target element
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }

        // prevent standard hash navigation (avoid blinking in IE)
        e.preventDefault();

        // top position relative to the document
        var pos = $id.offset().top;

        // animated top scrolling
        $('body, html').animate({scrollTop: pos});
    });

    $(document)
      .on("mousemove", ".cardhover", function(event) {

        if (!$(this).hasClass("open")) {
          var halfW = ($(this).width() / 2);
          var halfH = ($(this).height() / 2);

          var coorX = (halfW - (event.pageX - $(this).offset().left));
          var coorY = (halfH - (event.pageY - $(this).offset().top));

          var degX = ((coorY / halfH) * 10) + 'deg'; // max. degree = 10
          var degY = ((coorX / halfW) * -10) + 'deg'; // max. degree = 10

          $(this).find(".card").css('transform', function() {
              return 'perspective( 300px ) translate3d( 0, 0, 0 ) rotateX(' + degX + ') rotateY(' + degY + ')';
            })
            .children('.card__summary')
            .css('transform', function() {
              return 'perspective( 400px ) translate3d( 0, 2, 0 ) rotateX(' + degX + ') rotateY(' + degY + ')';
            });
        }
      })
      .on("mouseout", ".cardhover", function() {
        $(this).find(".card").removeAttr('style')
          .children('.card__summary')
          .removeAttr('style');
      });

    $("#topics .cardhover").on("click", function() {
      $("#detail div").load("?page=detail #detail .detail", function(){
        detail(true);
      });
    });
    $(window).on("scroll", function() {
      var pageTop = $(document).scrollTop()
      var pageBottom = pageTop + $(window).height()
      var tags = $(".scroll-show");

      for (var i = 0; i < tags.length; i++) {
        var tag = tags[i]
        if ($(tag).position().top < pageBottom) {
          $(tag).addClass("visible")
        } else {
          $(tag).removeClass("visible")
        }
      }
    });

  }

  function detail(open) {
    $("#detail .btn-close").on("click",function (e) {
      detail(false);
    });
    if(open){
      $("#detail").addClass("open");
    }else{
      $("#detail").removeClass("open");
    }
  }

  init();
});
