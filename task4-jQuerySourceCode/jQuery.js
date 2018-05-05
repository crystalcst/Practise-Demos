(function (window) {
    var jQuery = function (selector) {
        return new jQuery.fn.init(selector);
    };

    jQuery.fn = jQuery.prototype;

    jQuery.prototype.init = function (selector) {
        if (typeof selector == 'object') {
            [].push.call(this, selector);
        } else if (typeof selector == 'string') {
            Sizzle(selector, document, this);
        }

        return this;
    }

    jQuery.prototype.init.prototype = jQuery.fn;

    jQuery.fn.on = function (type, cb) {
        var nodes = Array.from(this);

        nodes.forEach(function (value) {
            value.addEventListener(type, function () {
                cb.call(this);
            });
        });
    }

    jQuery.fn.css = function (attr, val) {
        var nodes = Array.from(this);

        nodes.forEach(function (v) {
            v.style[attr]= val;
        });

        return this;
    }

    var $ = jQuery;
    window.$ = $;
})(window)