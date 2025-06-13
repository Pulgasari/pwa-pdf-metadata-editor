import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib';

const fileInput = document.getElementById('fileInput');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const langInput = document.getElementById('lang');
const saveBtn = document.getElementById('saveBtn');

let pdfDoc;

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const arrayBuffer = await file.arrayBuffer();
  pdfDoc = await PDFDocument.load(arrayBuffer);

  titleInput.value = pdfDoc.getTitle() || '';
  authorInput.value = pdfDoc.getAuthor() || '';
  langInput.value = pdfDoc.getLanguage() || '';
});

saveBtn.addEventListener('click', async () => {
  if (!pdfDoc) return;
  pdfDoc.setTitle(titleInput.value);
  pdfDoc.setAuthor(authorInput.value);
  pdfDoc.setLanguage(langInput.value);

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'bearbeitet.pdf';
  a.click();
  URL.revokeObjectURL(url);
});
