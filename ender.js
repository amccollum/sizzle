!function (doc) {
  var Sizzle = require('sizzle')
  var table = 'table',
      nodeMap = {
        thead: table,
        tbody: table,
        tfoot: table,
        tr: 'tbody',
        th: 'tr',
        td: 'tr',
        fieldset: 'form',
        option: 'select'
      }

  function create(node, root) {
    var tag = /^<([^\s>]+)/.exec(node)[1]
    var el = (root || doc).createElement(nodeMap[tag] || 'div'), els = [];
    el.innerHTML = node;
    var nodes = el.childNodes;
    el = el.firstChild;
    els.push(el);
    while (el = el.nextSibling) {
      (el.nodeType == 1) && els.push(el);
    }
    return els;
  }
  $._select = function (s, r) {
    if (/^\s*</.test(s)) {
      return create(s, r);
    } else if (s.nodeType) {
      return [s];
    } else if (typeof r == 'string') {
      return Sizzle(s, Sizzle(r)[0]);
    } else if (typeof r == 'object' && isFinite(r.length)) {
      return Sizzle(s, r[0]);
    }
  };

  $.ender({
    find: function (s) {
      return $(Sizzle(s, this[0]));
    }
  }, true);
}(document);