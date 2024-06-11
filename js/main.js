var mobile = false;
$(document).ready(() => {
    $('#mobile').bind('click', () => {
        if($("#mobile_burger").css("display") === 'none') {
            document.getElementById('header').scrollIntoView({block: "center", behavior: "smooth"});
            $(window).scrollTop(0);
            $("#mobile_burger").css("display", "flex");
            $("body").css("overflow", "hidden");
            mobile = true;
        }
    });

    $("#mobile_close").bind('click', () => {
        if($("#mobile_burger").css("display") === 'flex') {
            $("#mobile_burger").css("display", "none");
            $("body").css("overflow", "auto");
            mobile = false;
        }
    });

    $('a[href^="#"]').on('click', function() {
        let href = $(this).attr('href');
    
        $('html, body').animate({
            scrollTop: $(href).offset().top
        });
        return false;
    });
});