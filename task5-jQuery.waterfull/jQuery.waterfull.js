jQuery.fn.waterfull = function() {
    var items = $(this).children();

    $(this).css({
        'position': 'relative'
    });

    var columns = 5;
    var cwidth = $(this).width();

    var width = cwidth / columns;

    items.width(width);

    var h = [];

    items.each(function(key, val) {
        if (key < columns) {
            h.push($(this).height());

            $(this).css({
                'position': 'absolute',
                'left': key * width,
                'top': 0
            })
        } else {
            var min_val = h[0];
            var min_key = 0;

            for(var i = 0;i < h.length; i++) {
                if(min_val > h[i]) {
                    min_val = h[i];
                    min_key = i;
                }
            }

            h[min_key] += $(this).height();

            $(this).css({
                'position': 'absolute',
                'left': width * min_key,
                'top': min_val
            })
        }
    });
}