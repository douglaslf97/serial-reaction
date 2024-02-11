"use client"
import YAML from 'yaml'

export async function exportData<T>(filename: string, data: T): Promise<void> {
  const doc = new YAML.Document(data)

  const blob = new Blob([doc.toString()], { type: 'text/yaml;charset=utf8;' })
  const link = document.createElement('a')

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.click()
  }
}