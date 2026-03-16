import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function exportElementToPdf(element, filename = 'report.pdf') {
  const canvas = await html2canvas(element, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px' })
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()
  pdf.addImage(imgData, 'PNG', 0, 0, width, height)
  pdf.save(filename)
}
