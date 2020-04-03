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
```js
var row = 'dogs,cats,birds'
var vals = csvr.parseRow(row)
console.log(vals); // ["dogs", "cats", "birds"]

var rowAgain = csvr.unparseRow(vals)
console.log(rowAgain); // "dogs","cats","birds"
```