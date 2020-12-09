# csvr

Small JavaScript utility for parsing the rows of a CSV file

## Set up
Install using npm or script tag
```bash
npm install csvr
```
```html
<script src="path/to/csvr.js"></script>
```

## Usage
Use the parseRow function to turn a CSV row into an array of values. Use the unparseRow function to turn an array into a CSV row.
```js
var row = '"dogs","cats","birds"'
var vals = csvr.parseRow(row)
console.log(vals); // ["dogs", "cats", "birds"]

var rowAgain = csvr.unparseRow(vals)
console.log(rowAgain); // "dogs","cats","birds"
```

Both functions have an optional second parameter which is an options object. This allows you to set the delimiter and quote character.
```js
var row = '-dogs-|-cats-|-birds-'
var options = {
  delimiter: '|',
  quoteChar: '-'
}
csvr.parseRow(row, options) // ["dogs", "cats", "birds"]
```