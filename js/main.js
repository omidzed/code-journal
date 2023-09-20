const $photoUrlInput = document.querySelector('#photo-url-input');
const $entryImage = document.querySelector('#entry-image');
const $entryForm = document.querySelector('#entry-form');
const $notesText = document.querySelector('#notes-text');
const $titleInput = document.querySelector('#title-input');

$photoUrlInput.addEventListener('input', function (event) {
  $entryImage.src = $photoUrlInput.value;
});

$entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const entry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    photoUrl: $photoUrlInput.value,
    notes: $notesText.value,
  };
  data.entries.unshift(entry);
  data.nextEntryId++;
  $entryForm.reset();
});
