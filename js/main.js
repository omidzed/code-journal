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
  $entryImage.src = './images/placeholder-image-square.jpg';
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

  const $title = document.createElement('h2');
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

const $entriesList = document.querySelector('.entries-list');

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const entryItem = renderEntry(data.entries[i]);
    $entriesList.appendChild(entryItem);
  }
});

// eslint-disable-next-line no-unused-vars
function toggleNoEntries() {
  const $noEntriesView = document.querySelector('div[data-view="no-entries"]');
  if (data.entries.length !== 0) {
    $noEntriesView.setAttribute('class', 'hidden');
  } else {
    $noEntriesView.setAttribute('class', 'view');
  }
}

const $views = document.querySelectorAll('[data-view]');
// eslint-disable-next-line no-unused-vars
// const $entriesView = document.querySelector('div[data-view="entries"]');
// eslint-disable-next-line no-unused-vars
function viewSwap(view) {
  data.view = view;
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}

// $entryForm.addEventListener('submit', function (event) {
//   event.preventDefault();
//   const entry = {
//     entryId: data.nextEntryId,
//     title: $titleInput.value,
//     photoUrl: $photoUrlInput.value,
//     notes: $notesText.value,
//   };
//   data.entries.unshift(renderEntry(entry));
//   data.nextEntryId++;
//   $entryForm.reset();
//   $entryImage.src = './images/placeholder-image-square.jpg';
//   if (viewSwap(view) === ''){

//   }
// });
// Existing viewSwap function

// Add an event handler function for showing entries view
function handleEntriesClick() {
  viewSwap('entries'); // 'entries' is the view name, you can change it based on your needs
}
function handleEntryFormClick() {
  viewSwap('entry-form');
}

// Get the anchor element using its id and attach the click event
const $entriesLink = document.querySelector('.entries');
$entriesLink.addEventListener('click', handleEntriesClick);
const $entryFormLink = document.querySelector('.entry-form');
$entryFormLink.addEventListener('click', handleEntryFormClick);
