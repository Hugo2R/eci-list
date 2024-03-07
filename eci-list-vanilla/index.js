var prevState = [];
var x;

const setPrevState = () => {
  const list = document.querySelectorAll("#list-container li");
  prevState = list;
}
const addItem = () => {
  const container = document.querySelector("#list-container");
  const txtInput = document.querySelector("#text");
  const txt = txtInput.value.trim();
  const item = document.createElement("li");
  item.textContent = txt;
  item.setAttribute("data-id", Date.now());
  item.setAttribute("data-selected", false);
  container.appendChild(item);
  txtInput.value = "";
}

document.querySelector("#text").addEventListener("keyup", e => {
  const txt = e.target.value.trim(); 
  
  if (e.key === "Enter" && txt) {
    setPrevState();
    addItem();
  }
});

document.querySelector("#add").addEventListener("click", e => {
  setPrevState();
  txtInput = document.querySelector("#text");

  if (txtInput.value) {
    addItem();
  }
});

document.querySelector("#list-container").addEventListener("click", e => {
  const el = e.target;
  if (el.tagName === "LI") {
    const selected = el.getAttribute("data-selected") === "true";
    const classes = el.classList;

    if (selected) {
      classes.remove("selected");
    } else {
      classes.add("selected");
    }
    el.setAttribute("data-selected", !selected);
  }
})

document.querySelector("#list-container").addEventListener("dblclick", e => {
  const el = e.target;
  setPrevState();
  if (el.tagName === "LI") {
    el.remove();
  }
});

document.querySelector("#del").addEventListener("click", e => {
  setPrevState();
  const list = document.querySelectorAll("#list-container li");

  list.forEach(el => {
    if(el.getAttribute("data-selected") === "true") {
      el.remove();
    }
  });
});

document.querySelector("#back").addEventListener("click", e => {
  const container = document.querySelector("#list-container");
  const list = container.querySelectorAll("li");
  list.forEach(el => el.remove());

  prevState.forEach(el => container.appendChild(el));
});