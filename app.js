import { PDFDocument } from 'https://cdn.skypack.dev/pdf-lib';

const openFilesBtn = document.getElementById('openFilesBtn');
const fileList = document.getElementById('fileList');

async function handleFile(fileHandle) {
  const file = await fileHandle.getFile();
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const container = document.createElement('div');
  container.className = 'file-entry';

  const titleInput = document.createElement('input');
  titleInput.value = pdfDoc.getTitle() || '';
  titleInput.placeholder = 'Titel';

  const authorInput = document.createElement('input');
  authorInput.value = pdfDoc.getAuthor() || '';
  authorInput.placeholder = 'Autor';

  const langInput = document.createElement('input');
  langInput.value = pdfDoc.getLanguage() || '';
  langInput.placeholder = 'Sprache';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Speichern';

  saveBtn.addEventListener('click', async () => {
    pdfDoc.setTitle(titleInput.value);
    pdfDoc.setAuthor(authorInput.value);
    pdfDoc.setLanguage(langInput.value);

    const pdfBytes = await pdfDoc.save();
    const writable = await fileHandle.createWritable();
    await writable.write(pdfBytes);
    await writable.close();
    alert(`Datei ${file.name} gespeichert`);
  });

  container.appendChild(titleInput);
  container.appendChild(authorInput);
  container.appendChild(langInput);
  container.appendChild(saveBtn);

  fileList.appendChild(container);
}

openFilesBtn.addEventListener('click', async () => {
  const handles = await window.showOpenFilePicker({
    multiple: true,
    types: [{
      description: 'PDF-Dateien',
      accept: { 'application/pdf': ['.pdf'] }
    }]
  });

  fileList.innerHTML = '';
  for (const handle of handles) {
    await handleFile(handle);
  }
});
