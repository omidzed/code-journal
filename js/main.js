const $photoUrlInput = document.querySelector('#photo-url-input');
const $entryImage = document.querySelector('#entry-image');
const $entryForm = document.querySelector('#entry-form');
const $notesText = document.querySelector('#notes-text');
const $titleInput = document.querySelector('#title-input');
const $entriesList = document.querySelector('.entries-list');
const $entriesLink = document.querySelector('.entries');
const $newEntryForm = document.querySelector('.entry-form');
const views = document.querySelectorAll('.container.view');
const $noEntriesText = document.querySelector('#no-entries-text');
const $entriesHeading = document.querySelector('.new-entry-heading');
const $deleteButton = document.querySelector('#delete-button');
const $modal = document.querySelector('#delete-entry-modal');
const $cancelButton = document.querySelector('#cancel-button');
const $confirmButton = document.querySelector('#confirm-button');

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

function toggleNoEntries() {
  if (data.entries.length <= 0) {
    $noEntriesText.classList.remove('hidden');
  } else {
    $noEntriesText.classList.add('hidden');
  }
}

function renderEntry(entry) {
  const $entry = document.createElement('li');
  $entry.setAttribute('class', 'entry');
  $entry.setAttribute('data-entry-id', entry.entryId);

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

function handlePhotoUrlInput(event) {
  $entryImage.src = $photoUrlInput.value;
}

function handleEntryFormSubmit(event) {
  const entry = {
    entryId: data.nextEntryId,
    title: $titleInput.value,
    photoUrl: $photoUrlInput.value,
    notes: $notesText.value,
  };
  if (data.editing === null) {
    event.preventDefault();
    data.entries.unshift(entry);
    $entriesList.prepend(renderEntry(entry));
    $entryImage.src = './images/placeholder-image-square.jpg';
    data.nextEntryId++;
    $entryForm.reset();
    toggleNoEntries();
  } else {
    const editedEntry = {
      entryId: data.editing.entryId,
      title: $titleInput.value,
      photoUrl: $photoUrlInput.value,
      notes: $notesText.value,
    };

    const $entriesListItems = document.querySelectorAll('li');
    for (let i = 0; i < $entriesListItems.length; i++) {
      if (
        Number($entriesListItems[i].getAttribute('data-entry-id')) ===
        editedEntry.entryId
      ) {
        $entriesList.replaceChild(
          renderEntry(editedEntry),
          $entriesListItems[i]
        );
        data.entries[i] = editedEntry;
      }
    }
    $entriesHeading.textContent = 'New Entry';
    data.editing = null;
  }
  $entryForm.reset();
  viewSwap('entries');
}

function pencilClickHandler(event) {
  if (event.target.tagName === 'I') {
    const $clickedEntry = event.target.closest('li');
    viewSwap('entry-form');
    $deleteButton.classList.remove('hidden');
    $entriesHeading.textContent = 'Edit Entry';

    for (let i = 0; i < data.entries.length; i++) {
      if (
        Number($clickedEntry.getAttribute('data-entry-id')) ===
        data.entries[i].entryId
      ) {
        data.editing = data.entries[i];
        $photoUrlInput.value = data.editing.photoUrl;
        $titleInput.value = data.editing.title;
        $notesText.value = data.editing.notes;
        $entryImage.src = $photoUrlInput.value;
      }
    }
  }
}

function deleteButtonHandler(event) {
  $modal.classList.remove('hidden');
}
function cancelButtonHandler(event) {
  $modal.classList.add('hidden');
}

function handleEntriesClick() {
  $entryForm.reset();
  toggleNoEntries();
  viewSwap('entries');
}

function handleEntryFormClick() {
  viewSwap('entry-form');
}

function confirmButtonHandler(event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }

  const $entriesListItems = document.querySelectorAll('li');
  for (let i = 0; $entriesListItems.length; i++) {
    if (
      data.editing.entryId ===
      Number($entriesListItems[i].getAttribute('data-entry-id'))
    ) {
      $entriesListItems[i].remove();
      break;
    }
  }

  $modal.classList.add('class', 'hidden');
  $entryImage.src = './images/placeholder-image-square.jpg';
  $entriesHeading.textContent = 'Edit Entry';
  $entryForm.reset();
  toggleNoEntries();
  viewSwap('entries');
}

$photoUrlInput.addEventListener('input', handlePhotoUrlInput);
$entryForm.addEventListener('submit', handleEntryFormSubmit);
$newEntryForm.addEventListener('click', handleEntryFormClick);
$entriesLink.addEventListener('click', handleEntriesClick);
$entriesList.addEventListener('click', pencilClickHandler);
$deleteButton.addEventListener('click', deleteButtonHandler);
$cancelButton.addEventListener('click', cancelButtonHandler);
$confirmButton.addEventListener('click', confirmButtonHandler);

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entryItem = renderEntry(data.entries[i]);
    $entriesList.appendChild(entryItem);
  }
  viewSwap(data.view);
  toggleNoEntries();
});
