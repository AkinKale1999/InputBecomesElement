// Teil 1: Variablen deklarieren und Elemente auswählen
const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

// Teil 2: Fokus auf das Textarea setzen und Event-Listener hinzufügen
textarea.focus();
// focus() sorgt dafür das beim laden der seite der cursor direkt 
// das textarea anklickt


textarea.addEventListener("keyup", (event) => {
  // keyup ist ein eventhandler Also ein code/ereignis der bei einer bestimmten
  // situation ausgeführt wird.
  // Code, der bei jedem Key-Up-Event ausgeführt wird Also wenn eine bestimmte
  // Taste gedrückt und losgelassen wird, wird die randomSelect() ausgeführt
  // (in diesem fall "Enter" zeile 21)
  
  createTags(event.target.value);

  // Wenn die Enter-Taste gedrückt wird, wird die randomSelect-Funktion aufgerufen
  if (event.key === "Enter") {
    // key stellt die Taste da die gedrückt wurde z.b Enter
    setTimeout(() => {
      event.target.value = "";
    }, 10);

    randomSelect();
  }
});

// Teil 3: createTags-Funktion
function createTags(input) {
  // Der Text im Textarea-Element wird in ein Array von tags aufgeteilt
  const tags = input
    .split(/[,;]/)
    // mit dieser syntax .split(/[,;]/) nimmt er mehrere zeichen entgegen.

    // mit dieser syntax .split(",")nimmt er NUR EIN zeichen entgegen.

    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  // Das tagsEl-Element wird geleert
  tagsEl.innerHTML = "";

  // Für jeden Tag wird ein neues span-Element erstellt und dem tagsEl-Element hinzugefügt
  tags.forEach((tag) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
}

// Teil 4: randomSelect-Funktion
function randomSelect() {
  // Ein Interval wird erstellt, um alle 100 Millisekunden einen zufälligen Tag auszuwählen und ihn hervorzuheben
  const times = 30;
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();
    highlightTag(randomTag);
    setTimeout(() => {
      unhighlightTag(randomTag);
    }, 100);
  }, 100);

  // Der Interval wird nach 30 Iterationen gestoppt
  setTimeout(() => {
    clearInterval(interval);
    setTimeout(() => {
      const randomTag = pickRandomTag();
      highlightTag(randomTag);
    }, 100);
  }, times * 100);
}

// Teil 5: pickRandomTag-Funktion
function pickRandomTag() {
  // Ein zufälliger Tag wird ausgewählt
  const tags = document.querySelectorAll(".tag");
  return tags[Math.floor(Math.random() * tags.length)];
}

// Teil 6: highlightTag-Funktion
function highlightTag(tag) {
  // Der ausgewählte Tag wird hervorgehoben
  tag.classList.add("highlight");
}

// Teil 7: unhighlightTag-Funktion
function unhighlightTag(tag) {
  // Der ausgewählte Tag wird nicht mehr hervorgehoben
  tag.classList.remove("highlight");
}
