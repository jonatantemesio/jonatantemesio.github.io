! function(e) {
  "use strict";

  function t(e, t) {
      var i = !1,
          n = !0,
          o = e.document,
          s = o.documentElement,
          a = o.addEventListener ? "addEventListener" : "attachEvent",
          r = o.addEventListener ? "removeEventListener" : "detachEvent",
          c = o.addEventListener ? "" : "on",
          l = function(n) {
              "readystatechange" == n.type && "complete" != o.readyState || (("load" == n.type ? e : o)[r](c + n.type, l, !1), !i && (i = !0) && t.call(e, n.type || n))
          },
          p = function() {
              try {
                  s.doScroll("left")
              } catch (e) {
                  return void setTimeout(p, 50)
              }
              l("poll")
          };
      if ("complete" == o.readyState) t.call(e, "lazy");
      else {
          if (o.createEventObject && s.doScroll) {
              try {
                  n = !e.frameElement
              } catch (h) {}
              n && p()
          }
          o[a](c + "DOMContentLoaded", l, !1), o[a](c + "readystatechange", l, !1), e[a](c + "load", l, !1)
      }
  }
  var i = e,
      n = i.document,
      o = "cbinstance",
      s = {
          get: function(e) {
              return decodeURIComponent(n.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
          },
          set: function(e, t, i, o, s, a) {
              if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
              var r = "";
              if (i) switch (i.constructor) {
                  case Number:
                      r = i === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + i;
                      break;
                  case String:
                      r = "; expires=" + i;
                      break;
                  case Date:
                      r = "; expires=" + i.toUTCString()
              }
              return n.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + r + (s ? "; domain=" + s : "") + (o ? "; path=" + o : "") + (a ? "; secure" : ""), !0
          },
          has: function(e) {
              return new RegExp("(?:^|;\\s*)" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(n.cookie)
          },
          remove: function(e, t, i) {
              return !(!e || !this.has(e)) && (n.cookie = encodeURIComponent(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (i ? "; domain=" + i : "") + (t ? "; path=" + t : ""), !0)
          }
      },
      a = {
          merge: function() {
              var e, t = {},
                  i = 0,
                  n = arguments.length;
              if (0 === n) return t;
              for (; i < n; i++)
                  for (e in arguments[i]) Object.prototype.hasOwnProperty.call(arguments[i], e) && (t[e] = arguments[i][e]);
              return t
          },
          str2bool: function(e) {
              switch (e = "" + e, e.toLowerCase()) {
                  case "false":
                  case "no":
                  case "0":
                  case "":
                      return !1;
                  default:
                      return !0
              }
          },
          fade_in: function(e) {
              e.style.opacity < 1 && (e.style.opacity = (parseFloat(e.style.opacity) + .05).toFixed(2), i.setTimeout(function() {
                  a.fade_in(e)
              }, 50))
          },
          get_data_attribs: function(e) {
              var t = {};
              if (Object.prototype.hasOwnProperty.call(e, "dataset")) t = e.dataset;
              else {
                  var i, n = e.attributes;
                  for (i in n)
                      if (Object.prototype.hasOwnProperty.call(n, i)) {
                          var o = n[i];
                          if (/^data-/.test(o.name)) {
                              var s = a.camelize(o.name.substr(5));
                              t[s] = o.value
                          }
                      }
              }
              return t
          },
          normalize_keys: function(e) {
              var t = {};
              for (var i in e)
                  if (Object.prototype.hasOwnProperty.call(e, i)) {
                      var n = a.camelize(i);
                      t[n] = e[n] ? e[n] : e[i]
                  } return t
          },
          camelize: function(e) {
              for (var t = "-", i = e.indexOf(t); i != -1;) {
                  var n = i === e.length - 1,
                      o = n ? "" : e[i + 1],
                      s = o.toUpperCase(),
                      a = n ? t : t + o;
                  e = e.replace(a, s), i = e.indexOf(t)
              }
              return e
          },
          find_script_by_id: function(e) {
              for (var t = n.getElementsByTagName("script"), i = 0, o = t.length; i < o; i++)
                  if (e === t[i].id) return t[i];
              return null
          }
      },
      r = a.find_script_by_id("cookiebanner"),
      c = e.Cookiebanner = function(e) {
          this.init(e)
      };
  c.prototype = {
      cookiejar: s,
      init: function(t) {
          this.inserted = !1, this.closed = !1, this.test_mode = !1;
          var i = "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.",
              n = "Learn more";
          if (this.default_options = {
                  cookie: "cookiebanner-accepted",
                  closeText: "&#10006;",
                  cookiePath: "/",
                  debug: !1,
                  expires: 1 / 0,
                  zindex: 255,
                  mask: !1,
                  maskOpacity: .5,
                  maskBackground: "#000",
                  height: "auto",
                  minHeight: "21px",
                  bg: "#000",
                  fg: "#ddd",
                  link: "#aaa",
                  position: "bottom",
                  message: i,
                  linkmsg: n,
                  moreinfo: "http://aboutcookies.org",
                  effect: null,
                  fontSize: "14px",
                  fontFamily: "arial, sans-serif",
                  instance: o,
                  textAlign: "center",
                  acceptOnScroll: !1,
                  acceptOnClick: !1
              }, this.options = this.default_options, this.script_el = r, this.script_el) {
              var s = a.get_data_attribs(this.script_el);
              this.options = a.merge(this.options, s)
          }
          t && (t = a.normalize_keys(t), this.options = a.merge(this.options, t)), o = this.options.instance, this.options.zindex = parseInt(this.options.zindex, 10), this.options.mask = a.str2bool(this.options.mask), "string" == typeof this.options.expires && "function" == typeof e[this.options.expires] && (this.options.expires = e[this.options.expires]), "function" == typeof this.options.expires && (this.options.expires = this.options.expires()), this.script_el && this.run()
      },
      log: function() {
          "undefined" != typeof console && console.log.apply(console, arguments)
      },
      run: function() {
          if (!this.agreed()) {
              var e = this;
              t(i, function() {
                  e.insert()
              })
          }
      },
      build_viewport_mask: function() {
          var e = null;
          if (!0 === this.options.mask) {
              var t = this.options.maskOpacity,
                  i = this.options.maskBackground,
                  o = '<div id="cookiebanner-mask" style="position:fixed;top:0;left:0;width:100%;height:100%;background:' + i + ";zoom:1;filter:alpha(opacity=" + 100 * t + ");opacity:" + t + ";z-index:" + this.options.zindex + ';"></div>',
                  s = n.createElement("div");
              s.innerHTML = o, e = s.firstChild
          }
          return e
      },
      agree: function() {
          return this.cookiejar.set(this.options.cookie, 1, this.options.expires, this.options.cookiePath), !0
      },
      agreed: function() {
          return this.cookiejar.has(this.options.cookie)
      },
      close: function() {
          return this.inserted && (this.closed || (this.element && this.element.parentNode.removeChild(this.element), this.element_mask && this.element_mask.parentNode.removeChild(this.element_mask), this.closed = !0)), this.closed
      },
      agree_and_close: function() {
          return this.agree(), this.close()
      },
      cleanup: function() {
          return this.close(), this.unload()
      },
      unload: function() {
          return this.script_el && this.script_el.parentNode.removeChild(this.script_el), e[o] = void 0, !0
      },
      insert: function() {
          function e(e, t, i) {
              var n = e.addEventListener ? "addEventListener" : "attachEvent",
                  o = e.addEventListener ? "" : "on";
              e[n](o + t, i, !1)
          }
          this.element_mask = this.build_viewport_mask();
          var t = this.options.zindex;
          this.element_mask && (t += 1);
          var i = n.createElement("div");
          i.className = "cookiebanner", i.style.position = "fixed", i.style.left = 0, i.style.right = 0, i.style.height = this.options.height, i.style.minHeight = this.options.minHeight, i.style.zIndex = t, i.style.background = this.options.bg, i.style.color = this.options.fg, i.style.lineHeight = i.style.minHeight, i.style.padding = "5px 16px", i.style.fontFamily = this.options.fontFamily, i.style.fontSize = this.options.fontSize, i.style.textAlign = this.options.textAlign, "top" === this.options.position ? i.style.top = 0 : i.style.bottom = 0, i.innerHTML = '<div class="cookiebanner-close" style="float:right;padding-left:5px;">' + this.options.closeText + "</div><span>" + this.options.message + " <a>" + this.options.linkmsg + "</a></span>", this.element = i;
          var o = i.getElementsByTagName("a")[0];
          o.href = this.options.moreinfo, o.target = "_blank", o.style.textDecoration = "none", o.style.color = this.options.link;
          var s = i.getElementsByTagName("div")[0];
          s.style.cursor = "pointer";
          var r = this;
          e(s, "click", function() {
              r.agree_and_close()
          }), this.element_mask && (e(this.element_mask, "click", function() {
              r.agree_and_close()
          }), n.body.appendChild(this.element_mask)), this.options.acceptOnScroll && e(window, "scroll", function() {
              r.agree_and_close()
          }), this.options.acceptOnClick && e(window, "click", function() {
              r.agree_and_close()
          }), n.body.appendChild(this.element), this.inserted = !0, "fade" === this.options.effect ? (this.element.style.opacity = 0, a.fade_in(this.element)) : this.element.style.opacity = 1
      }
  }, r && (e[o] || (e[o] = new c))
}(window);