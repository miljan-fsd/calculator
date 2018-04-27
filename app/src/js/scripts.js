$(document).ready(function() {
  var display = $('.display')
  var history = $('.history')

  function clearAll() {
    display.html('0')
    history.html('')
  }

  function clearEntry() {
    display.text(display.text().slice(0, -1))
    history.text(history.text().slice(0, -1))

    if ($('.display').text().length < 1) {
      clearAll()
    }
  }

  function roundResult(num) {
    return parseFloat(Number(num).toPrecision(10))
  }

  function calculate(action) {
    var result
    var expression = display.text().replace(/action/, '')

    if (!expression.match(/[\d\+-\/\*\.\)\(]/)) {
      return display.text('Error')
    }

    if (action === '=') {
      try {
        result = eval(expression)
      } catch (e) {
        return display.text('Error')
      }

      result = roundResult(result)
      history.append('=' + result)
    } else if (action === 'pow') {
      result = Math.pow(expression, 2)

      if (isNaN(result)) {
        return display.text('Error')
      }

      result = roundResult(result)
      history.text(result)
    } else if (action === 'sqrt') {
      result = Math.sqrt(expression)

      if (isNaN(result)) {
        return display.text('Error')
      }

      result = roundResult(result)
      history.text(result)
    } else if (action === 'sign') {
      Math.sign(expression) === 1
        ? (result = expression *= -1)
        : (result = expression *= -1)

      if (isNaN(result)) {
        return display.text('Error')
      }

      result = roundResult(result)
      history.text(result)
    } else if (action === '%') {
      result = expression / 100

      if (isNaN(result)) {
        return display.text('Error')
      }

      result = roundResult(result)
      history.text(result)
    }

    display.text(result)
  }

  $('.btn').click(function() {
    var value = $(this).val()

    if (display.text().match(/[^\d\-\+\*\/\.\)\(]/)) {
      clearAll()
    }

    if (display.text() === '0' && value !== '.') {
      display.text('')
      history.text('')
    }

    if (
      display.text().length <= 1 &&
      history.text() === '' &&
      (value === '+' || value === ')' || value === '*' || value === '/')
    ) {
      clearAll()
    } else if (
      display.text().match(/[\+\-\*\/\.]$/) &&
      (value === '+' ||
        value === '-' ||
        value === '*' ||
        value === '/' ||
        value === '.')
    ) {
      return null
    } else if (
      (display.text().match(/\d+[\.]\d+$/) ||
        display.text().match(/[\.]\d+$/)) &&
      value === '.'
    ) {
      return null
    } else {
      if (value === 'ce') {
        clearEntry()
      } else if (value === 'ac') {
        clearAll()
      } else if (value === '=') {
        calculate('=')
      } else if (value === 'sqrt') {
        calculate('sqrt')
      } else if (value === 'sign') {
        calculate('sign')
      } else if (value === '%') {
        calculate('%')
      } else if (value === 'pow') {
        calculate('pow')
      } else {
        display.append(value)
        history.append(value)
      }
    }
  })
})
