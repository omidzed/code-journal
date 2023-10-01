/* eslint-disable no-console */
const $photoUrlInput = document.querySelector('#photo-url-input');
const $entryImage = document.querySelector('#entry-image');
const $entryForm = document.querySelector('#entry-form');
const $notesText = document.querySelector('#notes-text');
const $titleInput = document.querySelector('#title-input');
const $entriesList = document.querySelector('.entries-list');
const $entriesLink = document.querySelector('.entries');
const $newEntryForm = document.querySelector('.entry-form');
// let $entriesHeading = document.querySelector('#entries-heading');

$newEntryForm.addEventListener('click', handleEntryFormClick);
$entriesLink.addEventListener('click', handleEntriesClick);

$photoUrlInput.addEventListener('input', function (event) {
  $entryImage.src = $photoUrlInput.value;
});

$entriesList.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    const $clickedEntry = event.target.closest('li');

    for (let i = 0; i < data.entries.length; i++) {
      if (
        Number($clickedEntry.getAttribute('data-entry-id')) ===
        data.entries[i].entryId
      ) {
        data.editing = data.entries[i];
        viewSwap('entry-form');
        console.log(data.editing);
        $photoUrlInput.value = data.editing.photoUrl;
        $titleInput.value = data.editing.title.value;
        $notesText.value = data.editing.notesText.value;
        // $entriesHeading = 'Edit Entry';
      }
      console.log(data.editing);
      console.log($notesText.value, $titleInput.value);
    }
  }
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
  $entry.setAttribute('data-entry-id', data.nextEntryId);

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');

  const $entryImage = document.createElement('img');
  $entryImage.setAttribute('class', 'photo');
  $entryImage.src = entry.photoUrl;
  $entryImage.alt = entry.title;

  const $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.setAttribute('class', 'column-half');
  $secondColumnHalf.setAttribute('id', 'labels-edit-icons');

  const $rowTop = document.createElement('div');
  $rowTop.setAttribute('class', 'row-title-edit-button');

  const $title = document.createElement('h3');
  $title.setAttribute('class', 'entry-title');
  $title.innerText = entry.title;

  const $editButton = document.createElement('i');
  $editButton.setAttribute('class', 'fa-solid fa-pen');

  const $rowBottom = document.createElement('div');
  $rowBottom.setAttribute('class', 'row-paragraph');

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entry-notes');
  $paragraph.innerText = entry.notes;

  $entry.appendChild($columnHalf);
  $columnHalf.appendChild($entryImage);
  $entry.appendChild($secondColumnHalf);
  $secondColumnHalf.appendChild($rowTop);
  $rowTop.appendChild($title);
  $rowTop.appendChild($editButton);
  $secondColumnHalf.appendChild($rowBottom);
  $rowBottom.appendChild($paragraph);

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
