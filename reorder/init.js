module.exports = function (input, callback) {
  var fs = require('fs')
  var tree = require('../reorder/tree')
  var parser = require('../reorder/stanford/parse')
  var transform = require('../reorder/transform')
  var fname = new Date().getTime() + '.txt'

  fs.writeFileSync('./reorder/stanford/' + fname, String(input), 'utf8')

  parser('./reorder/stanford/' + fname, function (data) {
    var flat = []
    var jsTree = []
    var reordered = []
    for (var i = 0; i < data.length; i++) {
      flat.push(tree.flatten(data[i]))
    }
    for (i = 0; i < flat.length; i++) {
      jsTree.push(tree.treeify(flat[i]))
    }
    for (i = 0; i < jsTree.length; i++) {
      reordered.push(transform.tree(jsTree[i]))
    }
    fs.unlinkSync('./reorder/stanford/' + fname)
    callback(reordered)
  })
}
