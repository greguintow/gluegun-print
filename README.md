# gluegun-print

>Note: This is just an export from [Gluegun Print Toolbox](https://github.com/infinitered/gluegun/blob/master/src/toolbox/print-tools.ts)


The `gluegun-print` module provides various functions to print styled messages and tables in the console. You can use these functions to display information with different colors and formatting.

- [Usage](#usage)
  - [Installation](#installation)
  - [Importing the Module](#importing-the-module)
  - [Basic Example](#basic-example)
  - [Printing a Table](#printing-a-table)
  - [Using a Spinner](#using-a-spinner)
  - [Debugging Messages](#debugging-messages)
- [API](#api)


## Usage

### Installation

Install the module via npm or yarn:

```bash
npm install gluegun-print

# or

yarn add gluegun-print
```

### Importing the Module

To use the `print` module in your Node.js application, import it as follows:

```javascript
// CommonJS
const print = require('gluegun-print')

// ES modules
import print from 'gluegun-print'
```

### Basic Example

Here's a basic example of how to use the `print` module to display different types of messages:

```javascript
import print from 'gluegun-print'

print.info('This is an information message.');
print.error('This is an error message.');
print.warning('This is a warning message.');
print.success('This is a success message.');
print.highlight('This is a highlighted message.');
print.muted('This is a muted message.');

print.divider(); // Print a divider line
print.newline(); // Print a blank line
```

### Printing a Table

The `print.table(data, options)` function allows you to display data in a table format. The `data` parameter should be an array of arrays, where each inner array represents a row of data. The `options` parameter is optional and allows you to specify the table format and style.

```javascript
const tableData = [
  ['Name', 'Age', 'Country'],
  ['John', '30', 'USA'],
  ['Alice', '25', 'Canada'],
  ['Bob', '28', 'UK']
];

const tableOptions = {
  format: 'lean', // 'markdown', 'lean', or 'default' (default: 'default')
  style: {
    'padding-left': 1,
    'padding-right': 1
  }
};

print.table(tableData, tableOptions);
```

### Using a Spinner

The `print.spin(config)` function creates and starts a spinner using [ora](https://www.npmjs.com/package/ora). You can use it to indicate that a process is in progress.

```javascript
const spinner = print.spin('Loading...');
setTimeout(() => {
  spinner.succeed('Process completed successfully.');
}, 3000);
```

### Debugging Messages

The `print.debug(message, title)` function is useful for printing debug messages. It adds a title to distinguish debug output.

```javascript
const debugMessage = 'Some debug information.';
print.debug(debugMessage, 'DEBUG');
```

## API

| Method                                 | Description                                                                                                                                  |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `newline()`                            | Print a blank line.                                                                                                                          |
| `divider()`                            | Prints a divider line.                                                                                                                       |
| `findWidths(cliTable)`                 | Returns an array of the column widths for the given `cliTable` data table.                                                                   |
| `columnHeaderDivider(cliTable, style)` | Returns an array of column dividers based on column widths, considering possible paddings.                                                   |
| `resetTablePadding(cliTable)`          | Resets the padding of a table.                                                                                                               |
| `table(data, options)`                 | Prints an object to table format. The values will already be stringified. Accepts `options.format` (default: 'default') and `options.style`. |
| `fancy(message)`                       | Prints text without theming.                                                                                                                 |
| `info(message)`                        | Writes a normal information message.                                                                                                         |
| `error(message)`                       | Writes an error message.                                                                                                                     |
| `warning(message)`                     | Writes a warning message.                                                                                                                    |
| `debug(message, title)`                | Writes a debug message. Accepts an optional `title` parameter.                                                                               |
| `success(message)`                     | Writes a success message.                                                                                                                    |
| `highlight(message)`                   | Writes a highlighted message.                                                                                                                |
| `muted(message)`                       | Writes a muted message.                                                                                                                      |
| `spin(config)`                         | Creates a spinner and starts it up. Accepts a configuration object or a string for the spinner text.                                         |
| `checkmark`                            | A checkmark symbol (✔︎) as a colored string.                                                                                                  |
| `xmark`                                | A crossmark symbol (ⅹ) as a colored string.                                                                                                  |
