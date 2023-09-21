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

// function toggleNoEntries(){
//   if ()

// }

// const $tabContainer = document.querySelector('.tab-container');
// const $tabList = document.querySelectorAll('.tab');
// const $viewList = document.querySelectorAll('.view');

// console.log($tabContainer);
// console.log($tabList);
// console.log($viewList);

// $tabContainer.addEventListener('click', function (event) {
//   if (event.target.matches('.tab')) {
//     for (let i = 0; i < $tabList.length; i++) {
//       if ($tabList[i] === event.target && $tabList[i].className === 'tab') {
//         $tabList[i].className = 'tab active';
//       } else $tabList[i].className = 'tab';
//     const dataView = event.target.getAttribute('data-view');
//       for (let i = 0; i < $viewList.length; i++) {
//         if ($viewList[i].getAttribute('data-view') === dataView) {
//           $viewList[i].className = 'view';
//         } else $viewList[i].className = 'view hidden';
//       }
