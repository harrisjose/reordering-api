function eraseText () {
  document.getElementById('input_text').value = ''
}

function reload () {
  eraseText()
  document.getElementById('output').style.display = 'none'
  document.getElementById('starter').style.display = 'block'
}

function processText () {
  var input = document.getElementById('input_text').value
  document.getElementById('ip_block').textContent = input
  document.getElementById('starter').style.display = 'none'
  document.getElementById('loading').style.display = 'block'

  var data = {}
  data.input = input
  console.log(data)

  var xhr = new XMLHttpRequest()
  var url = '/api'
  xhr.open('POST', url, true)
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
  xhr.setRequestHeader('cache-control', 'no-cache')

  xhr.send(JSON.stringify(data))

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === 4) {
      if (xhr.status === 200) {
        var restext = JSON.parse(this.responseText)
        console.log(restext)
        var outtext = ''
        for (var i = 0; i < restext.length; i++) {
          outtext += restext[i]
        }
        document.getElementById('op_block').textContent = outtext
        document.getElementById('loading').style.display = 'none'
        document.getElementById('output').style.display = 'block'
      }
    }
  })
}
