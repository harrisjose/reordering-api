module.exports = function (input, callback) {
  var fs = require('fs')
  var tree = require('../reorder/tree')
  var parser = require('../reorder/stanford/parse')
  var transform = require('../reorder/transform')

  fs.writeFileSync('./reorder/stanford/input.txt', String(input), 'utf8')

  parser('./reorder/stanford/input.txt', function (data) {
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
    callback(reordered)
  })
}
