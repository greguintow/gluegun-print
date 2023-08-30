import * as CLITable from 'cli-table3'
import ora, { Ora } from 'ora'
import chalk from 'chalk'

const times = (fn: (i: any) => any, n: number) => {
  const list = new Array(n)
  for (let i = 0; i < n; i++) list[i] = fn(i)
  return list
}

export type TableStyle = Partial<CLITable.TableInstanceOptions['style']>

export { Ora }

export interface GluegunPrintTableOptions {
  format?: 'markdown' | 'lean' | 'default'
  style?: TableStyle
}

// Generate array of arrays of the data rows for length checking
// const getRows = t => times(flip(prop)(t), t.length)
const getRows = (table: CLITable.Table) => times(i => table[i], table.length)

const CLI_TABLE_COMPACT = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  bottom: '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  left: ' ',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '',
  'right-mid': '',
  middle: ' '
}

const CLI_TABLE_MARKDOWN = {
  ...CLI_TABLE_COMPACT,
  left: '|',
  right: '|',
  middle: '|'
}

/**
 * Print a blank line.
 */
export function newline() {
  console.log('')
}

/**
 * Prints a divider line
 */
export function divider() {
  console.log(chalk.grey('---------------------------------------------------------------'))
}

/**
 * Returns an array of the column widths.
 *
 * @param cliTable Data table.
 * @returns Array of column widths
 */
export function findWidths(cliTable: CLITable.Table): number[] {
  return [cliTable.options.head]
    .concat(getRows(cliTable))
    .reduce(
      (colWidths, row) => row.map((str, i) => Math.max(`${str}`.length + 1, colWidths[i] || 1)),
      [] as number[]
    )
}

/**
 * Returns an array of column dividers based on column widths, taking possible
 * paddings into account.
 *
 * @param cliTable Data table.
 * @returns Array of properly sized column dividers.
 */
export function columnHeaderDivider(cliTable: CLITable.Table, style: TableStyle = {}): string[] {
  const padding = (style['padding-left'] || 0) + (style['padding-right'] || 0)

  return findWidths(cliTable).map(w => Array(w + padding).join('-'))
}

/**
 * Resets the padding of a table.
 *
 * @param cliTable Data table.
 */
export function resetTablePadding(cliTable: CLITable.Table) {
  const style = (cliTable as any).options.style

  if (style) {
    style['padding-left'] = 1
    style['padding-right'] = 1
  }
}

/**
 * Prints an object to table format.  The values will already be
 * stringified.
 *
 * @param object The object to turn into a table.
 */
export function table(data: string[][], options: GluegunPrintTableOptions = {}): void {
  let t
  switch (options.format) {
    case 'markdown':
      // eslint-disable-next-line no-case-declarations
      const header = data.shift()
      t = new CLITable.default({
        head: header,
        chars: CLI_TABLE_MARKDOWN,
        style: options.style
      })
      t.push(...data)
      t.unshift(columnHeaderDivider(t, options.style))
      resetTablePadding(t)
      break
    case 'lean':
      t = new CLITable.default({
        style: options.style
      })
      t.push(...data)
      break
    default:
      t = new CLITable.default({
        chars: CLI_TABLE_COMPACT,
        style: options.style
      })
      t.push(...data)
  }
  console.log(t.toString())
}

/**
 * Prints text without theming.
 *
 * Use this when you're writing stuff outside the toolbox of our
 * printing scheme.  hint: rarely.
 *
 * @param message The message to write.
 */
export function fancy(message: any): void {
  console.log(message)
}

/**
 * Writes a normal information message.
 *
 * This is the default type you should use.
 *
 * @param message The message to show.
 */
export function info(message: string): void {
  console.log(chalk.reset(message))
}

/**
 * Writes an error message.
 *
 * This is when something horribly goes wrong.
 *
 * @param message The message to show.
 */
export function error(message: string): void {
  console.log(chalk.red(message))
}

/**
 * Writes a warning message.
 *
 * This is when the user might not be getting what they're expecting.
 *
 * @param message The message to show.
 */
export function warning(message: string): void {
  console.log(chalk.yellow(message))
}

/**
 * Writes a debug message.
 *
 * This is for devs only.
 *
 * @param message The message to show.
 */
export function debug(message: string, title = 'DEBUG'): void {
  const topLine = `vvv -----[ ${title} ]----- vvv`
  const botLine = `^^^ -----[ ${title} ]----- ^^^`

  info(topLine)
  console.log(message)
  info(botLine)
}

/**
 * Writes a success message.
 *
 * When something is successful.  Use sparingly.
 *
 * @param message The message to show.
 */
export function success(message: string): void {
  console.log(chalk.green(message))
}

/**
 * Writes a highlighted message.
 *
 * To draw attention to specific lines.  Use sparingly.
 *
 * @param message The message to show.
 */
export function highlight(message: string): void {
  console.log(chalk.cyan(message))
}

/**
 * Writes a muted message.
 *
 * For ancillary info, something that's not the star of the show.
 *
 * @param message The message to show.
 */
export function muted(message: string): void {
  console.log(chalk.grey(message))
}

/**
 * Creates a spinner and starts it up.
 *
 * @param config The text for the spinner or an ora configuration object.
 * @returns The spinner.
 */
export function spin(config?: string | object): Ora {
  return ora(config || '').start()
}

export const checkmark = chalk.green('✔︎')
export const xmark = chalk.red('ⅹ')

const print = {
  newline,
  divider,
  findWidths,
  columnHeaderDivider,
  table,
  fancy,
  info,
  error,
  warning,
  debug,
  success,
  highlight,
  muted,
  spin,
  checkmark,
  xmark
}

export default print
