"use client"
import ObjectToCsv from 'objects-to-csv'
import YAML from 'yaml'

export async function exportToCsv<T>(filename: string, data: T, headers?: string[]): Promise<void> {
  /*if (!rows || !rows.length) {
    return;
  }

  const separator: string = ", "
  const keys: string[] = Object.keys(rows[0] as any)

  const columnHeaders: string[] = headers ? headers : keys
  const csvContent =
    columnHeaders.join(separator) +
    "\n" +
    rows.map(row => {
      return keys.map(k => {
        let cell = ((row as any)[k]) == null || ((row as any)[k]) === undefined ? '' : ((row as any)[k])
        cell = cell instanceof Date
          ? cell.toLocaleString()
          : cell.toString().replace(/"/g, '""')

        if (cell.search(/("|,|\n)/g) >= 0) {
          cell = `"${cell}"`;
        }

        return cell;
      }).join(separator)
    }).join("\n")

  const blob = new Blob([csvContent], { type: 'text/csv;charset=uft-8;' })
  const link = document.createElement('a')

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
  }*/

  const doc = new YAML.Document(data)

  const blob = new Blob([doc.toString()], { type: 'text/yaml;charset=uft8;' })
  const link = document.createElement('a')

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
  }
}