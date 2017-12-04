function openConf(t) {
  $("#ms-configurator").animate({right: "0px"}, 400), $(".ms-configurator-btn").animate({right: "-60px"}, 200)
}
function closeConf() {
  $("#ms-configurator").animate({right: "-310px"}, 200), $(".ms-configurator-btn").animate({right: "20px"}, 400)
}
function tabs() {
  for (var t = $(".nav.nav-tabs"), o = {}, n = {}, e = 0; e < t.length; e++) {
    var i = e + 1, a = $(t[e]).children(), s = $(t[e]).children().length;
    $(a[a.length - 1]).hasClass("ms-tabs-indicator") || ($(t[e]).data("id", i), $(t[e]).append('<span id="i' + i + '" class="ms-tabs-indicator"></span>'));
    var r = $("#i" + i);
    o["tabW" + i] = [], n["tabL" + i] = [];
    var l = o["tabW" + i], c = n["tabL" + i], p = 0;
    for (m = 0; m < s; m++)c[m] = p, l[m] = $(a[m]).width(), $(a[m]).hasClass("active") && r.css({
      left: c[m] + "px",
      width: l[m] + "px"
    }), p += l[m]
  }
  $(".nav.nav-tabs > li").click(function (t) {
    var e = (a = $(this).parent()).data("id");
    a.children().removeClass("current"), $(this).addClass("current");
    for (var i = a.children(), s = 0; s < i.length - 1; s++)$(i[s]).hasClass("current") && $("#i" + e).css({
      left: n["tabL" + e][s] + "px",
      width: o["tabW" + e][s] + "px"
    })
  })
}
!function (t, o, n) {
  var e = t();
  t.fn.dropdownHover = function (n) {
    return "ontouchstart" in document ? this : (e = e.add(this.parent()), this.each(function () {
      function i(t) {
        o.clearTimeout(a), o.clearTimeout(s), s = o.setTimeout(function () {
          e.find(":focus").blur(), !0 === d.instantlyCloseOthers && e.removeClass("open"), o.clearTimeout(s), r.attr("aria-expanded", "true"), l.addClass("open"), r.trigger(u)
        }, d.hoverDelay)
      }

      var a, s, r = t(this), l = r.parent(), c = {
        delay: 0,
        hoverDelay: 0,
        instantlyCloseOthers: !0
      }, p = {
        delay: t(this).data("delay"),
        hoverDelay: t(this).data("hover-delay"),
        instantlyCloseOthers: t(this).data("close-others")
      }, u = "show.bs.dropdown", d = t.extend(!0, {}, c, n, p);
      l.hover(function (n) {
        if (!l.hasClass("open") && !r.is(n.target))return !0;
        t(o).width() > 767 && i(n)
      }, function () {
        t(o).width() > 767 && (o.clearTimeout(s), a = o.setTimeout(function () {
          r.attr("aria-expanded", "false"), l.removeClass("open"), r.trigger("hide.bs.dropdown")
        }, d.delay))
      }), r.hover(function (n) {
        if (!l.hasClass("open") && !l.is(n.target) && t(o).width() > 767)return !0;
        t(o).width() > 767 && i(n)
      }), l.find(".dropdown-submenu").each(function () {
        var n, e = t(this);
        e.hover(function () {
          o.clearTimeout(n), e.children(".dropdown-menu").show(), e.siblings().children(".dropdown-menu").hide()
        }, function () {
          var t = e.children(".dropdown-menu");
          n = o.setTimeout(function () {
            t.hide()
          }, d.delay)
        })
      })
    }))
  }, t(document).ready(function () {
    t('[data-hover="dropdown"]').dropdownHover()
  })
}(jQuery, window), $(document).ready(function () {
  document.addEventListener("touchstart", function () {
  }, !0), (new WOW).init(), $(".sb-site-container > .container").css("min-height", $(window).height() - $(".sb-site-container").height() + "px"), plyr.setup(), $(".counter").counterUp({
    delay: 10,
    time: 2e3
  }), $(".carousel").carousel(), $('[data-toggle="tooltip"]').tooltip(), $('[data-toggle="popover"]').popover(), $("#status").fadeOut(), $("#ms-preload").delay(350).fadeOut("slow"), $("body").delay(350).css({overflow: "visible"});
  new $.slidebars;
  $(".megamenu-col").matchHeight(), $(".ms-footer-col").matchHeight(), $(".hero-img-col").matchHeight(), $.material.init(), smoothScroll.init({
    selector: "[data-scroll]",
    selectorHeader: null,
    speed: 500,
    easing: "easeInOutCubic",
    offset: 0,
    callback: function (t, o) {
    }
  });
  var t = $(".btn-back-top");
  $(window).scroll(function () {
    $(this).scrollTop() > 400 ? t.addClass("back-show") : t.removeClass("back-show")
  }), function (t) {
    t(function () {
      t(document).off("click.bs.tab.data-api", '[data-hover="tab"]'), t(document).on("mouseenter.bs.tab.data-api", '[data-hover="tab"]', function () {
        t(this).tab("show")
      })
    })
  }(jQuery);
  var o = $(".masonry-container");
  o.imagesLoaded(function () {
    o.masonry({columnWidth: ".masonry-item", itemSelector: ".masonry-item"})
  }), $(".nav").on("click mousedown mouseup touchstart", "a.has_children", function () {
    return $(this).next("ul").hasClass("open_t") && !$(this).parents("ul").hasClass("open_t") ? ($(".open_t").removeClass("open_t"), !1) : ($(".open_t").not($(this).parents("ul")).removeClass("open_t"), $(this).next("ul").addClass("open_t"), !1)
  }), $(document).on("click", ":not(.has_children, .has_children *)", function () {
    if ($(".open_t").length > 0)return $(".open_t").removeClass("open_t"), $(".open_t").parent().removeClass("open"), !1
  });
  var n = !1;
  $(".ms-conf-btn").click(function () {
    n ? (n = !1, closeConf()) : (n = !0, openConf())
  }), $(".sb-site-container").click(function () {
    n && (n = !1, closeConf())
  }), $("#datePicker").datepicker({orientation: "bottom left", autoclose: !0, todayHighlight: !0});
  var e = $(".ms-navbar"), i = $(".navbar-nav"), a = $("body"), s = $(".sb-site-container").hasClass("ms-nav-fixed");
}), function (t) {
  t(".input-number .btn-circle:first-of-type").on("click", function () {
    t(".input-number input").val(parseInt(t(".input-number input").val(), 10) - 1)
  }), t(".input-number .btn-circle:last-of-type").on("click", function () {
    t(".input-number input").val(parseInt(t(".input-number input").val(), 10) + 1)
  })
}(jQuery), function (t) {
  function o(t) {
    return void 0 === t.which || "number" == typeof t.which && t.which > 0 && (!t.ctrlKey && !t.metaKey && !t.altKey && 8 != t.which && 9 != t.which && 13 != t.which && 16 != t.which && 17 != t.which && 20 != t.which && 27 != t.which)
  }

  function n(o) {
    var n = t(o);
    n.prop("disabled") || n.closest(".form-group").addClass("is-focused")
  }

  function e(t, o) {
    return (t.hasClass("checkbox-inline") || t.hasClass("radio-inline") ? t : t.closest(".checkbox").length ? t.closest(".checkbox") : t.closest(".radio")).toggleClass("disabled", o)
  }

  function i(o) {
    var i = !1;
    (o.is(t.material.options.checkboxElements) || o.is(t.material.options.radioElements)) && (i = !0), o.closest("label").hover(function () {
      var o = t(this).find("input"), a = o.prop("disabled");
      i && e(t(this), a), a || n(o)
    }, function () {
      a(t(this).find("input"))
    })
  }

  function a(o) {
    t(o).closest(".form-group").removeClass("is-focused")
  }

  t.expr[":"].notmdproc = function (o) {
    return !t(o).data("mdproc")
  }, t.material = {
    options: {
      validate: !0,
      input: !0,
      ripples: !0,
      checkbox: !0,
      togglebutton: !0,
      radio: !0,
      arrive: !0,
      autofill: !1,
      withRipples: [".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","),
      inputElements: "input.form-control, textarea.form-control, select.form-control",
      checkboxElements: ".checkbox > label > input[type=checkbox], label.checkbox-inline > input[type=checkbox]",
      togglebuttonElements: ".togglebutton > label > input[type=checkbox]",
      radioElements: ".radio > label > input[type=radio], label.radio-inline > input[type=radio]"
    }, checkbox: function (o) {
      i(t(o || this.options.checkboxElements).filter(":notmdproc").data("mdproc", !0).after("<span class='checkbox-material'><span class='check'></span></span>"))
    }, togglebutton: function (o) {
      i(t(o || this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", !0).after("<span class='toggle'></span>"))
    }, radio: function (o) {
      i(t(o || this.options.radioElements).filter(":notmdproc").data("mdproc", !0).after("<span class='circle'></span><span class='check'></span>"))
    }, input: function (o) {
      t(o || this.options.inputElements).filter(":notmdproc").data("mdproc", !0).each(function () {
        var o = t(this), n = o.closest(".form-group");
        0 !== n.length || "hidden" === o.attr("type") || o.attr("hidden") || (o.wrap("<div class='form-group'></div>"), n = o.closest(".form-group")), o.attr("data-hint") && (o.after("<p class='help-block'>" + o.attr("data-hint") + "</p>"), o.removeAttr("data-hint"));
        var e = {"input-lg": "form-group-lg", "input-sm": "form-group-sm"};
        if (t.each(e, function (t, e) {
              o.hasClass(t) && (o.removeClass(t), n.addClass(e))
            }), o.hasClass("floating-label")) {
          var i = o.attr("placeholder");
          o.attr("placeholder", null).removeClass("floating-label");
          var a = o.attr("id"), s = "";
          a && (s = "for='" + a + "'"), n.addClass("label-floating"), o.after("<label " + s + "class='control-label'>" + i + "</label>")
        }
        null !== o.val() && "undefined" != o.val() && "" !== o.val() || n.addClass("is-empty"), n.find("input[type=file]").length > 0 && n.addClass("is-fileinput")
      })
    }, attachInputEventHandlers: function () {
      var e = this.options.validate;
      t(document).on("keydown paste", ".form-control", function (n) {
        o(n) && t(this).closest(".form-group").removeClass("is-empty")
      }).on("keyup change", ".form-control", function () {
        var o = t(this), n = o.closest(".form-group"), i = void 0 === o[0].checkValidity || o[0].checkValidity();
        "" === o.val() ? n.addClass("is-empty") : n.removeClass("is-empty"), e && (i ? n.removeClass("has-error") : n.addClass("has-error"))
      }).on("focus", ".form-control, .form-group.is-fileinput", function () {
        n(this)
      }).on("blur", ".form-control, .form-group.is-fileinput", function () {
        a(this)
      }).on("change", ".form-group input", function () {
        var o = t(this);
        if ("file" != o.attr("type")) {
          var n = o.closest(".form-group");
          o.val() ? n.removeClass("is-empty") : n.addClass("is-empty")
        }
      }).on("change", ".form-group.is-fileinput input[type='file']", function () {
        var o = t(this).closest(".form-group"), n = "";
        t.each(this.files, function (t, o) {
          n += o.name + ", "
        }), (n = n.substring(0, n.length - 2)) ? o.removeClass("is-empty") : o.addClass("is-empty"), o.find("input.form-control[readonly]").val(n)
      })
    }, ripples: function (o) {
      t(o || this.options.withRipples).ripples()
    }, autofill: function () {
      var o = setInterval(function () {
        t("input[type!=checkbox]").each(function () {
          var o = t(this);
          o.val() && o.val() !== o.attr("value") && o.trigger("change")
        })
      }, 100);
      setTimeout(function () {
        clearInterval(o)
      }, 1e4)
    }, attachAutofillEventHandlers: function () {
      var o;
      t(document).on("focus", "input", function () {
        var n = t(this).parents("form").find("input").not("[type=file]");
        o = setInterval(function () {
          n.each(function () {
            var o = t(this);
            o.val() !== o.attr("value") && o.trigger("change")
          })
        }, 100)
      }).on("blur", ".form-group input", function () {
        clearInterval(o)
      })
    }, init: function (o) {
      this.options = t.extend({}, this.options, o), t.fn.ripples && this.options.ripples && this.ripples(), this.options.input && (this.input(), this.attachInputEventHandlers()), this.options.checkbox && this.checkbox(), this.options.togglebutton && this.togglebutton(), this.options.radio && this.radio(), this.options.autofill && (this.autofill(), this.attachAutofillEventHandlers()), document.arrive && this.options.arrive && (t.fn.ripples && this.options.ripples && document.arrive(this.options.withRipples, function () {
        t.material.ripples(t(this))
      }), this.options.input && document.arrive(this.options.inputElements, function () {
        t.material.input(t(this))
      }), this.options.checkbox && document.arrive(this.options.checkboxElements, function () {
        t.material.checkbox(t(this))
      }), this.options.radio && document.arrive(this.options.radioElements, function () {
        t.material.radio(t(this))
      }), this.options.togglebutton && document.arrive(this.options.togglebuttonElements, function () {
        t.material.togglebutton(t(this))
      }))
    }
  }
}(jQuery), function (t, o, n, e) {
  "use strict";
  function i(o, n) {
    s = this, this.element = t(o), this.options = t.extend({}, r, n), this._defaults = r, this._name = a, this.init()
  }

  var a = "ripples", s = null, r = {};
  i.prototype.init = function () {
    var n = this.element;
    n.on("mousedown touchstart", function (e) {
      if (!s.isTouch() || "mousedown" !== e.type) {
        n.find(".ripple-container").length || n.append('<div class="ripple-container"></div>');
        var i = n.children(".ripple-container"), a = s.getRelY(i, e), r = s.getRelX(i, e);
        if (a || r) {
          var l = s.getRipplesColor(n), c = t("<div></div>");
          c.addClass("ripple").css({left: r, top: a, "background-color": l}), i.append(c), function () {
            o.getComputedStyle(c[0]).opacity
          }(), s.rippleOn(n, c), setTimeout(function () {
            s.rippleEnd(c)
          }, 500), n.on("mouseup mouseleave touchend", function () {
            c.data("mousedown", "off"), "off" === c.data("animating") && s.rippleOut(c)
          })
        }
      }
    })
  }, i.prototype.getNewSize = function (t, o) {
    return Math.max(t.outerWidth(), t.outerHeight()) / o.outerWidth() * 2.5
  }, i.prototype.getRelX = function (t, o) {
    var n = t.offset();
    return s.isTouch() ? 1 === (o = o.originalEvent).touches.length && o.touches[0].pageX - n.left : o.pageX - n.left
  }, i.prototype.getRelY = function (t, o) {
    var n = t.offset();
    return s.isTouch() ? 1 === (o = o.originalEvent).touches.length && o.touches[0].pageY - n.top : o.pageY - n.top
  }, i.prototype.getRipplesColor = function (t) {
    return t.data("ripple-color") ? t.data("ripple-color") : o.getComputedStyle(t[0]).color
  }, i.prototype.hasTransitionSupport = function () {
    var t = (n.body || n.documentElement).style;
    return void 0 !== t.transition || void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.MsTransition || void 0 !== t.OTransition
  }, i.prototype.isTouch = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }, i.prototype.rippleEnd = function (t) {
    t.data("animating", "off"), "off" === t.data("mousedown") && s.rippleOut(t)
  }, i.prototype.rippleOut = function (t) {
    t.off(), s.hasTransitionSupport() ? t.addClass("ripple-out") : t.animate({opacity: 0}, 100, function () {
      t.trigger("transitionend")
    }), t.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
      t.remove()
    })
  }, i.prototype.rippleOn = function (t, o) {
    var n = s.getNewSize(t, o);
    s.hasTransitionSupport() ? o.css({
      "-ms-transform": "scale(" + n + ")",
      "-moz-transform": "scale(" + n + ")",
      "-webkit-transform": "scale(" + n + ")",
      transform: "scale(" + n + ")"
    }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : o.animate({
      width: 2 * Math.max(t.outerWidth(), t.outerHeight()),
      height: 2 * Math.max(t.outerWidth(), t.outerHeight()),
      "margin-left": -1 * Math.max(t.outerWidth(), t.outerHeight()),
      "margin-top": -1 * Math.max(t.outerWidth(), t.outerHeight()),
      opacity: .2
    }, 500, function () {
      o.trigger("transitionend")
    })
  }, t.fn.ripples = function (o) {
    return this.each(function () {
      t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new i(this, o))
    })
  }
}(jQuery, window, document), window.onresize = tabs;
var handler = window.onresize;
handler.apply(window, [" On"]), $("#ms-account-modal").on("shown.bs.modal", function (t) {
  setTimeout(tabs, 700)
});