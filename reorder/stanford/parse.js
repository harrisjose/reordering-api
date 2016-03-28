function parse (filename, callback) {
  // Calls the lexparser.sh using the child_process spawn
  var spawn = require('child_process').spawn
  var ls = spawn('./reorder/stanford/lexparser.sh', [filename])
  var penntree = ''
  var treeArray = []
  // returns the penn tree
  ls.stdout.on('data', function (data) {
    penntree += String(data)
  })
  ls.stdout.on('close', function (code) {
    // sends penntree to callback after splitting into sentences
    // and removing empty values
    treeArray = penntree.split('\n\n').filter(function (s) {
      return s !== ''
    })
    callback(treeArray)
  })
}

module.exports = parse
