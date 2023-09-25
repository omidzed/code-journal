let data = {
  view: ['entry-form', 'entries', 'no-entries'],
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const previousEntriesJSON = localStorage.getItem('javascript-local-storage');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
window.addEventListener('beforeunload', function (event) {
  const entriesJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', entriesJSON);
});
