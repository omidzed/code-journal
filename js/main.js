const $photoUrlInput = document.querySelector('#photo-url-input');
const $entryImage = document.querySelector('#entry-image');
const $entryForm = document.querySelector('#entry-form');
const $notesText = document.querySelector('#notes-text');
const $titleInput = document.querySelector('#title-input');
const $entriesList = document.querySelector('.entries-list');

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
  $entryImage.src = './images/placeholder-image-square.jpg';

  handleEntriesClick();
});

function renderEntry(entry) {
  const $entry = document.createElement('li');
  $entry.setAttribute('class', 'entry');

  const $firstColumnHalf = document.createElement('div');
  $firstColumnHalf.setAttribute('class', 'column-half');

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('class', 'photo');
  $entryImage.src = entry.photoUrl;
  $entryImage.alt = entry.title;

  const $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half');

  const $title = document.createElement('h3');
  $title.setAttribute('class', 'entry-title');
  $title.innerText = entry.title;

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entry-notes');
  $paragraph.innerText = entry.notes;

  $entry.appendChild($firstColumnHalf);
  $firstColumnHalf.appendChild($entryImage);
  $entry.appendChild($secondColumnHalf);
  $secondColumnHalf.appendChild($title);
  $secondColumnHalf.appendChild($paragraph);

  return $entry;
}

document.addEventListener('DOMContentLoaded', function (event) {
  toggleNoEntries();
  for (let i = 0; i < data.entries.length; i++) {
    const entryItem = renderEntry(data.entries[i]);
    $entriesList.appendChild(entryItem);
  }
});

const view = document.querySelector('[data-view]');

function viewSwap(view) {
  view = data.view;
  if (view.getAttribute('data-view') === 'entries') {
    view.classList.remove('hidden');
  } else {
    view.classList.add('hidden');
  }
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    view.classList.add('hidden');
  }
}
function handleEntriesClick() {
  viewSwap('entries');
}
function handleEntryFormClick() {
  viewSwap('entry-form');
}

const $entriesLink = document.querySelector('.entries');
$entriesLink.addEventListener('click', handleEntriesClick);
const $newEntryForm = document.querySelector('.entry-form');
$newEntryForm.addEventListener('click', handleEntryFormClick);
