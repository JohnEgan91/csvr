/* eslint-env jest */

var csvr = require('./csvr')

test('Parse with punctuation', function () {
  var row = `"Hello,","world","!"`
  var parsedArray = csvr.parseRow(row)
  expect(parsedArray[0]).toBe('Hello,')
  expect(parsedArray[1]).toBe('world')
  expect(parsedArray[2]).toBe('!')
})

test('Parse with empty and blank values', function () {
  var row = `" "|"  "|""|"null"`
  var parsedArray = csvr.parseRow(row, { delimiter: '|' })
  expect(parsedArray[0]).toBe(' ')
  expect(parsedArray[1]).toBe('  ')
  expect(parsedArray[2]).toBe('')
  expect(parsedArray[3]).toBe('null')
})

test('Parse with | delimiter', function () {
  var row = `"cats"|"dogs"|"birds"|"snakes"`
  var parsedArray = csvr.parseRow(row, { delimiter: '|' })
  expect(parsedArray[0]).toBe('cats')
  expect(parsedArray[1]).toBe('dogs')
  expect(parsedArray[2]).toBe('birds')
  expect(parsedArray[3]).toBe('snakes')
})

test('Parse with single quotes', function () {
  var row = `'cats','dogs','birds','snakes'`
  var parsedArray = csvr.parseRow(row, { quoteChar: `'` })
  expect(parsedArray[0]).toBe('cats')
  expect(parsedArray[1]).toBe('dogs')
  expect(parsedArray[2]).toBe('birds')
  expect(parsedArray[3]).toBe('snakes')
})

test('Parse with unquoted values', function () {
  var row = `cats,dogs,birds,snakes,,`
  var parsedArray = csvr.parseRow(row, { quoteChar: '' })
  expect(parsedArray[0]).toBe('cats')
  expect(parsedArray[1]).toBe('dogs')
  expect(parsedArray[2]).toBe('birds')
  expect(parsedArray[3]).toBe('snakes')
  expect(parsedArray[4]).toBe('')
  expect(parsedArray[5]).toBe('')
})

test('Parse value with quote', function () {
  var row = `"""","""test"""`
  var parsedArray = csvr.parseRow(row)
  expect(parsedArray[0]).toBe('"')
  expect(parsedArray[1]).toBe('"test"')
})

test('Parse value with other quote char', function () {
  var row = `_cat_____,_dog___`
  var parsedArray = csvr.parseRow(row, { quoteChar: '_'})
  expect(parsedArray[0]).toBe('cat__')
  expect(parsedArray[1]).toBe('dog_')
})

test('Unparse with punctuation', function () {
  var values = ['Hello,', 'world', '!']
  var row = csvr.unparseRow(values)
  expect(row).toBe(`"Hello,","world","!"`)
})

test('Unparse with empty and blank values', function () {
  var values = [' ', '  ', '', 'null']
  var row = csvr.unparseRow(values)
  expect(row).toBe(`" ","  ","","null"`)
})

test('Unparse with | delimiter', function () {
  var values = ['cats', 'dogs', 'birds', 'snakes']
  var row = csvr.unparseRow(values, { delimiter: '|' })
  expect(row).toBe(`"cats"|"dogs"|"birds"|"snakes"`)
})

test('Unparse with single quotes', function () {
  var values = ['cats', 'dogs', 'birds', 'snakes']
  var row = csvr.unparseRow(values, { quoteChar: `'` })
  expect(row).toBe(`'cats','dogs','birds','snakes'`)
})

test('Unparse with unquoted values', function () {
  var values = ['cats', 'dogs', 'birds', 'snakes', '', '']
  var row = csvr.unparseRow(values, { quoteChar: '' })
  expect(row).toBe(`cats,dogs,birds,snakes,,`)
})

test('Unparse value with quote', function () {
  var values = ['"', '"test"']
  var row = csvr.unparseRow(values)
  expect(row).toBe(`"""","""test"""`)
})

test('Unparse with nulls', function () {
  var values = ['', null, undefined]
  var row = csvr.unparseRow(values)
  expect(row).toBe(`"","",""`)
})

test('Unparse with non-string values', function () {
  var values = [123, {name: 'John'}, true]
  var row = csvr.unparseRow(values)
  expect(row).toBe(`"123","[object Object]","true"`)
})

test('Unparse value with other quote char', function () {
  var values = ['cat__', 'dog_']
  var row = csvr.unparseRow(values, { quoteChar: '_' })
  expect(row).toBe(`_cat_____,_dog___`)
})