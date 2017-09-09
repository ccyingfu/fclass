(function(global) {
  "use strict";
  var modules = [
    "fu.js",
    "commons/Event.js",
    "commons/Array.js",
    "widget/Base.js"
  ];
  var head = document.getElementsByTagName("head")[0];
  var entry = document.querySelector("[data-fu]");
  if (!entry) return;
  var entrySrc = entry.getAttribute("src");
  var entryNext = entry.nextSibling;
  var context = entrySrc.replace(/([\\/][^\\/]+.js)$/, "");
  var main = entry.getAttribute("data-main");
  var createScript = function(src) {
    var script = document.createElement("script");
    script.setAttribute("defer", "");
    script.src = src;
    return script;
  };
  modules.forEach(function(m) {
    var url = context + "/" + m;
    var script = createScript(url);
    if (entryNext && entryNext.nodeType == 1) {
      head.insertBefore(script, entryNext);
    } else {
      head.appendChild(createScript(url));
    }
  });
  head.appendChild(createScript(main));
  entry.parentNode.removeChild(entry);
})(window);