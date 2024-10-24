"use strict";
(function(C, g) {
    "function" === typeof define && define.amd ? define([], g) : "object" === typeof module && module.exports ? module.exports = g() : C.Rellax = g();
})("undefined" !== typeof window ? window : global, function() {
    var C = function(g, q) {
        function P() {
            if (3 === a.options.breakpoints.length && Array.isArray(a.options.breakpoints)) {
                var d = !0, c = !0, b;
                a.options.breakpoints.forEach(function(f) {
                    "number" !== typeof f && (c = !1);
                    null !== b && f < b && (d = !1);
                    b = f;
                });
                if (d && c) return;
            }
            a.options.breakpoints = [
                576,
                768,
                1201
            ];
            console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted");
        }
        var a = Object.create(C.prototype), p = 0, r = 0, t = 0, k = 0, e = [], u = !0, J = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(d) {
            return setTimeout(d, 1E3 / 60);
        }, v = null, G = !1;
        try {
            var K = Object.defineProperty({}, "passive", {
                get: function() {
                    G = !0;
                }
            });
            window.addEventListener("testPassive", null, K);
            window.removeEventListener("testPassive", null, K);
        } catch (d) {}
        var Q = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout, R = window.transformProp || function() {
            var d = document.createElement("div");
            if (null === d.style.transform) {
                var c = [
                    "Webkit",
                    "Moz",
                    "ms"
                ], b;
                for(b in c)if (void 0 !== d.style[c[b] + "Transform"]) return c[b] + "Transform";
            }
            return "transform";
        }();
        a.options = {
            speed: -2,
            verticalSpeed: null,
            horizontalSpeed: null,
            breakpoints: [
                576,
                768,
                1201
            ],
            center: !1,
            wrapper: null,
            relativeToWrapper: !1,
            round: !0,
            vertical: !0,
            horizontal: !1,
            verticalScrollAxis: "y",
            horizontalScrollAxis: "x",
            callback: function() {}
        };
        q && Object.keys(q).forEach(function(d) {
            a.options[d] = q[d];
        });
        q && q.breakpoints && P();
        g ||= ".rellax";
        g = "string" === typeof g ? document.querySelectorAll(g) : [
            g
        ];
        if (0 < g.length) {
            a.elems = g;
            if (a.options.wrapper && !a.options.wrapper.nodeType) {
                if (g = document.querySelector(a.options.wrapper)) a.options.wrapper = g;
                else {
                    console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
                    return;
                }
            }
            var H, F = function() {
                for(var d = 0; d < e.length; d++)a.elems[d].style.cssText = e[d].style;
                e = [];
                r = window.innerHeight;
                k = window.innerWidth;
                d = a.options.breakpoints;
                H = k < d[0] ? "xs" : k >= d[0] && k < d[1] ? "sm" : k >= d[1] && k < d[2] ? "md" : "lg";
                L();
                for(d = 0; d < a.elems.length; d++){
                    var c = void 0, b = a.elems[d], f = b.getAttribute("data-rellax-percentage"), l = b.getAttribute("data-rellax-speed"), h = b.getAttribute("data-rellax-xs-speed"), w = b.getAttribute("data-rellax-mobile-speed"), x = b.getAttribute("data-rellax-tablet-speed"), y = b.getAttribute("data-rellax-desktop-speed"), z = b.getAttribute("data-rellax-vertical-speed"), A = b.getAttribute("data-rellax-horizontal-speed"), D = b.getAttribute("data-rellax-vertical-scroll-axis"), E = b.getAttribute("data-rellax-horizontal-scroll-axis"), S = b.getAttribute("data-rellax-zindex") || 0, T = b.getAttribute("data-rellax-min"), U = b.getAttribute("data-rellax-max"), V = b.getAttribute("data-rellax-min-x"), W = b.getAttribute("data-rellax-max-x"), X = b.getAttribute("data-rellax-min-y"), Y = b.getAttribute("data-rellax-max-y"), m = !0;
                    h || w || x || y ? c = {
                        xs: h,
                        sm: w,
                        md: x,
                        lg: y
                    } : m = !1;
                    h = a.options.wrapper ? a.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    a.options.relativeToWrapper && (h = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - a.options.wrapper.offsetTop);
                    var B = a.options.vertical ? f || a.options.center ? h : 0 : 0, M = a.options.horizontal ? f || a.options.center ? a.options.wrapper ? a.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft : 0 : 0;
                    h = B + b.getBoundingClientRect().top;
                    w = b.clientHeight || b.offsetHeight || b.scrollHeight;
                    x = M + b.getBoundingClientRect().left;
                    y = b.clientWidth || b.offsetWidth || b.scrollWidth;
                    B = f ? f : (B - h + r) / (w + r);
                    f = f ? f : (M - x + k) / (y + k);
                    a.options.center && (B = f = .5);
                    c = m && null !== c[H] ? Number(c[H]) : l ? l : a.options.speed;
                    z = z ? z : a.options.verticalSpeed;
                    A = A ? A : a.options.horizontalSpeed;
                    D = D ? D : a.options.verticalScrollAxis;
                    E = E ? E : a.options.horizontalScrollAxis;
                    l = N(f, B, c, z, A);
                    b = b.style.cssText;
                    m = "";
                    if (f = /transform\s*:/i.exec(b)) m = b.slice(f.index), m = (f = m.indexOf(";")) ? " " + m.slice(11, f).replace(/\s/g, "") : " " + m.slice(11).replace(/\s/g, "");
                    e.push({
                        baseX: l.x,
                        baseY: l.y,
                        top: h,
                        left: x,
                        height: w,
                        width: y,
                        speed: c,
                        verticalSpeed: z,
                        horizontalSpeed: A,
                        verticalScrollAxis: D,
                        horizontalScrollAxis: E,
                        style: b,
                        transform: m,
                        zindex: S,
                        min: T,
                        max: U,
                        minX: V,
                        maxX: W,
                        minY: X,
                        maxY: Y
                    });
                }
                O();
                u && (window.addEventListener("resize", F), u = !1, I());
            }, L = function() {
                var d = p, c = t;
                p = a.options.wrapper ? a.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset;
                t = a.options.wrapper ? a.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset;
                a.options.relativeToWrapper && (p = ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - a.options.wrapper.offsetTop);
                return d != p && a.options.vertical || c != t && a.options.horizontal ? !0 : !1;
            }, N = function(d, c, b, f, l) {
                var h = {};
                d = 100 * (l ? l : b) * (1 - d);
                c = 100 * (f ? f : b) * (1 - c);
                h.x = a.options.round ? Math.round(d) : Math.round(100 * d) / 100;
                h.y = a.options.round ? Math.round(c) : Math.round(100 * c) / 100;
                return h;
            }, n = function() {
                window.removeEventListener("resize", n);
                window.removeEventListener("orientationchange", n);
                (a.options.wrapper ? a.options.wrapper : window).removeEventListener("scroll", n);
                (a.options.wrapper ? a.options.wrapper : document).removeEventListener("touchmove", n);
                v = J(I);
            }, I = function() {
                L() && !1 === u ? (O(), v = J(I)) : (v = null, window.addEventListener("resize", n), window.addEventListener("orientationchange", n), (a.options.wrapper ? a.options.wrapper : window).addEventListener("scroll", n, G ? {
                    passive: !0
                } : !1), (a.options.wrapper ? a.options.wrapper : document).addEventListener("touchmove", n, G ? {
                    passive: !0
                } : !1));
            }, O = function() {
                for(var d, c = 0; c < a.elems.length; c++){
                    var b = e[c].verticalScrollAxis.toLowerCase(), f = e[c].horizontalScrollAxis.toLowerCase();
                    d = -1 != b.indexOf("x") ? p : 0;
                    b = -1 != b.indexOf("y") ? p : 0;
                    var l = -1 != f.indexOf("x") ? t : 0;
                    f = -1 != f.indexOf("y") ? t : 0;
                    d = N((d + l - e[c].left + k) / (e[c].width + k), (b + f - e[c].top + r) / (e[c].height + r), e[c].speed, e[c].verticalSpeed, e[c].horizontalSpeed);
                    f = d.y - e[c].baseY;
                    b = d.x - e[c].baseX;
                    null !== e[c].min && (a.options.vertical && !a.options.horizontal && (f = f <= e[c].min ? e[c].min : f), a.options.horizontal && !a.options.vertical && (b = b <= e[c].min ? e[c].min : b));
                    null != e[c].minY && (f = f <= e[c].minY ? e[c].minY : f);
                    null != e[c].minX && (b = b <= e[c].minX ? e[c].minX : b);
                    null !== e[c].max && (a.options.vertical && !a.options.horizontal && (f = f >= e[c].max ? e[c].max : f), a.options.horizontal && !a.options.vertical && (b = b >= e[c].max ? e[c].max : b));
                    null != e[c].maxY && (f = f >= e[c].maxY ? e[c].maxY : f);
                    null != e[c].maxX && (b = b >= e[c].maxX ? e[c].maxX : b);
                    a.elems[c].style[R] = "translate3d(" + (a.options.horizontal ? b : "0") + "px," + (a.options.vertical ? f : "0") + "px," + e[c].zindex + "px) " + e[c].transform;
                }
                a.options.callback(d);
            };
            a.destroy = function() {
                for(var d = 0; d < a.elems.length; d++)a.elems[d].style.cssText = e[d].style;
                u || (window.removeEventListener("resize", F), u = !0);
                Q(v);
                v = null;
            };
            F();
            a.refresh = F;
            return a;
        }
        console.warn("Rellax: The elements you're trying to select don't exist.");
    };
    return C;
});

//# sourceMappingURL=index.2071f9e2.js.map