!function (doc) {

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
    return /^\s*</.test(s) ? create(s, r) : Sizzle(s, r);
  };

  $.ender({
    find: function (s) {
      return $(Sizzle(s, this[0]));
    }
  }, true);
}(document);