/* global data */

const $photoUrl = document.querySelector('#photo-url');
const $photoPreview = document.querySelector('#photo-preview');
const $notes = document.querySelector('#notes');
const $entryForm = document.querySelector('.new-entry-form');
const $noEntries = document.querySelector('.no-entries');
const $entriesAnchor = document.querySelector('.entries-anchor');
const $views = document.querySelectorAll('.view-container');
const $newAnchor = document.querySelector('.new-anchor');
const $H2element = document.querySelector('#h2-new-entry');
const $entriesList = document.querySelector('.entries-list');

function viewSwap(targetView) {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === targetView) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
  data.view = targetView;
}

function toggleNoEntries() {
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  } else {
    $noEntries.classList.add('hidden');
  }
}

function renderEntry(entry) {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'list-item');
  $listItem.setAttribute('data-entry-id', entry.entryId);

  const $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  const $columnFull = document.createElement('div');
  $columnFull.setAttribute('class', 'column-full');

  const $columnHalfOne = document.createElement('div');
  $columnHalfOne.setAttribute('class', 'column-half');

  const $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.setAttribute('class', 'column-half');

  const $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('class', 'entry-photo');
  $entryPhoto.setAttribute('src', entry.photoUrl);
  $entryPhoto.setAttribute('alt', 'entry-photo');

  const $rowTitlePencil = document.createElement('div');
  $rowTitlePencil.setAttribute('class', '.row title-pencil');

  const $iconPencil = document.createElement('i');
  $iconPencil.setAttribute('class', 'fa-solid fa-pen');

  const $paragraph = document.createElement('p');
  $paragraph.setAttribute('class', 'entries-text');
  $paragraph.textContent = entry.notes;

  $listItem.appendChild($row);
  $row.appendChild($columnHalfOne);
  $columnHalfOne.appendChild($entryPhoto);
  $row.appendChild($columnHalfTwo);
  $columnHalfTwo.appendChild($rowTitlePencil);
  $rowTitlePencil.appendChild($iconPencil);
  $columnHalfTwo.appendChild($paragraph);
  return $listItem;
}

function editIconHandler(event) {
  console.log(event.target);
  if (event.target.tagName === 'I') {
    const $listItem = event.target.closest('li');

    viewSwap('entry-form');
    for (let i = 0; i < data.entries.length; i++) {
      if (
        data.entries[i].entryId ===
        Number($listItem.getAttribute('data-entry-id'))
      ) {
        data.editing = data.entries[i];
      }
      $H2element.textContent = 'Edit Entry';
      $photoUrl.value = data.editing.photoUrl;
      $notes.value = data.editing.notes;
      $photoPreview.src = $photoUrl.value;
    }
  }
}

function submitHandler(event) {
  event.preventDefault();

  if (data.editing === null) {
    const entry = {
      entryId: data.nextEntryId,
      notes: $notes.value,
      photoUrl: $photoUrl.value,
    };
    data.entries.unshift(entry);
    data.nextEntryId++;
    $entriesList.prepend(renderEntry(entry));

    viewSwap('entries');
    toggleNoEntries();
  } else {
    const editedEntry = {
      entryId: data.editing.entryId,
      photoUrl: $photoUrl.value,
      notes: $notes.value,
    };
    const $listItems = document.querySelectorAll('li');
    console.log('list of entries:', $listItems);
    for (let i = 0; i < $listItems.length; i++) {
      if (
        Number($listItems[i].getAttribute('data-entry-id')) ===
        editedEntry.entryId
      ) {
        data.entries[i] = editedEntry;
        $entriesList.replaceChild(renderEntry(editedEntry), $listItems[i]);
      }
    }
    data.editing = null;
    $H2element.textContent = 'New Entry';
  }

  $entryForm.reset();
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  viewSwap('entries');
  toggleNoEntries();
}

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = $photoUrl.value;
});

$newAnchor.addEventListener('click', function (event) {
  viewSwap('entry-form');
});

$entriesAnchor.addEventListener('click', function (event) {
  viewSwap('entries');
});

$entriesList.addEventListener('click', editIconHandler);
$entryForm.addEventListener('submit', submitHandler);

document.addEventListener('DOMContentLoaded', function (event) {
  const $entries = data.entries;

  for (let i = 0; i < $entries.length; i++) {
    const entry = renderEntry($entries[i]);
    $entriesList.appendChild(entry);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
