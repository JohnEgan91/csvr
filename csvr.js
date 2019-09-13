;(function () {

/**
 * Convert a CSV string into an array of values
 * @param  {String} row       A row from a CSV file
 * @param  {Object} options   Options
 * @return {Array}            An array containing the values
 */
  var parseRow = function (row, options) {

    // If the row is null or blank, return empty array
    if (!row || row.trim() === '') {
      return []
    }

    var DELIMITER = ','
    if (options && options.delimiter) {
      DELIMITER = options.delimiter
    }

    var QUOTE_CHAR = '"'
    if (options && options.quoteChar) {
      QUOTE_CHAR = options.quoteChar
    }

    var values = []
    var inQuotes = false
    var inEscapedQuote = false
    var value = ''

    // Loop through each character in the row
    for (var i = 0; i < row.length; i++) {
      var currentChar = row[i]
      var nextChar = i + 1 === row.length ? null : row[i + 1]

      if (inEscapedQuote) {
        // Skip second quote
        inEscapedQuote = false
      } else if (currentChar === QUOTE_CHAR && inQuotes && nextChar != null && nextChar === QUOTE_CHAR) {
        // Handle escaped quotes
        value += currentChar
        inEscapedQuote = true
      } else if (currentChar === QUOTE_CHAR) {
        // Begin/end quoted value
        inQuotes = !inQuotes
      } else if (currentChar === DELIMITER && !inQuotes) {
        // Handle separator
        values.push(value)
        value = ''
      } else {
        // Else append current character
        value += currentChar
      }
    }

    // Handle end of row
    values.push(value)

    return values
  }

  /**
 * Convert an array of values into a CSV string
 * @param  {Array} values     Array of values
 * @param  {Object} options   Options
 * @return {String}           CSV row string
 */
  var unparseRow = function (values, options) {
      
    // If values is null or empty, return empty string
    if (!values || values.length < 1) {
      return ''
    }

    var DELIMITER = ','
    if (options && options.delimiter) {
      DELIMITER = options.delimiter
    }

    var QUOTE_CHAR = '"'
    if (options && (options.quoteChar === '' || options.quoteChar)) {
      QUOTE_CHAR = options.quoteChar
    }

    // Add quotes around each value
    var valuesWithQuotes = values.map(function (value) {
      value = value ? value + '' : ''
      var escaped = value.replace(/"/g, '""')
      return QUOTE_CHAR + escaped + QUOTE_CHAR
    })

    // Turn into string with delimiter
    return valuesWithQuotes.join(DELIMITER)
  }

  if (typeof exports === 'object') {
    exports.parseRow = parseRow
    exports.unparseRow = unparseRow
  } else {
    window.csvr = {
      parseRow: parseRow,
      unparseRow: unparseRow
    }
  }
})()
