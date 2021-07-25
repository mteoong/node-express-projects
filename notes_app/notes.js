const fs = require('fs');

function add(title, body) {
  let notes = loadNotes();

  for (let note of notes) {
    if(note.title === title) {
      note.body = body;
      saveNotes(notes);
      return;
    }
  }

  notes.push({title: title, body: body})
  saveNotes(notes);
}

function loadNotes() {
  try {
    let data = fs.readFileSync('./notes.txt').toString();
    return JSON.parse(data);
  } catch(e) {
    return [];
  }
}

function saveNotes(notes) {
  fs.writeFileSync('notes.txt', JSON.stringify(notes));
}

function remove(title) {
  let notes = loadNotes();
  let notesToKeep = notes.filter((note) => {
    return note.title !== title;
  });
  saveNotes(notesToKeep);
}

function list() {
  let notes = loadNotes();

  for (let note of notes) {
    console.log(note.title);
  }
}

function read(title) {
  let notes = loadNotes();
  let myNote = notes.find((note) => note.title = title);

  if(myNote) {
    console.log(myNote.title);
    console.log(myNote.body);
  } else {
    console.log('No note with this title.');
  }
}

module.exports = {
  add, 
  remove,
  list,
  read,
}