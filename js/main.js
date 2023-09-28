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
  $entryForm.reset();
  toggleNoEntries();
  viewSwap('entries');
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
  for (let i = 0; i < data.entries.length; i++) {
    const entryItem = renderEntry(data.entries[i]);
    $entriesList.appendChild(entryItem);
  }
  viewSwap(data.view);
  toggleNoEntries();
});

const views = document.querySelectorAll('.container.view');

function viewSwap(targetView) {
  for (let i = 0; i < views.length; i++) {
    const viewElement = views[i];
    if (viewElement.getAttribute('data-view') === targetView) {
      viewElement.classList.remove('hidden');
    } else {
      viewElement.classList.add('hidden');
    }
  }
}

const $noEntriesText = document.querySelector('#no-entries-text');

function toggleNoEntries() {
  if (data.entries.length <= 0) {
    $noEntriesText.classList.remove('hidden');
  } else {
    $noEntriesText.classList.add('hidden');
  }
}

function handleEntriesClick() {
  $entryForm.reset();
  toggleNoEntries();
  viewSwap('entries');
}
function handleEntryFormClick() {
  viewSwap('entry-form');
}

const $entriesLink = document.querySelector('.entries');
$entriesLink.addEventListener('click', handleEntriesClick);
const $newEntryForm = document.querySelector('.entry-form');
$newEntryForm.addEventListener('click', handleEntryFormClick);
