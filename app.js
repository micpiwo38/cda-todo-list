// Tableau en mémoire (en dur) pour stocker les tâches
let tasks = [
  { id: 1, text: "Apprendre Git et les branches", completed: true },
  { id: 2, text: "Coder la logique en JavaScript pur", completed: false },
  { id: 3, text: "Valider l'activité type 1", completed: false },
];

// Sélection des éléments du DOM
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const totalCounter = document.getElementById("total-counter");
const remainingCounter = document.getElementById("remaining-counter");

// Fonction principale pour afficher les tâches
function renderTasks() {
  //Par defaut une tache est vide
  todoList.innerHTML = "";
  //Le compteur de tache restante est à 0
  let remainingCount = 0;
  //On boucle sur le tableau d'objet
  tasks.forEach((task) => {
    //Si la tache n'est pas complétée on incremente 0 + 1
    if (!task.completed) {
      remainingCount++;
    }
    //On creer la balise <li></li>
    const li = document.createElement("li");
    //Si la tache est completée (coché dans la checkbox)
    if (task.completed) {
      //On ajoute <li></li> avec l'attribut class completed
      li.classList.add("completed");
    }

    // Texte de la tâche (cliquable pour changer l'état - US 02) => on creer une <span></span>
    const span = document.createElement("span");
    //On ajoute du texte
    span.textContent = (task.completed ? "☑ " : "☐ ") + task.text;
    //Au clic => on appel la fonction toggleTask via un callback
    span.addEventListener("click", () => toggleTask(task.id));

    // Bouton de suppression (US 03) => on creer une balise <button></button>
    const deleteBtn = document.createElement("button");
    //On ajoute du texte
    deleteBtn.textContent = "Supprimer";
    //On ajoute un attribut class=""
    deleteBtn.classList.add("delete-btn");
    //Au clic => on appel la fonction deleteTask via un callback
    deleteBtn.addEventListener("click", () => deleteTask(task.id));
    //<span></span> est ajouté a <li></li>
    li.appendChild(span);
    //On ajoute <button></button> a <li></li>
    li.appendChild(deleteBtn);
    //<li></li> est ajouté a <ul></ul>
    todoList.appendChild(li);
  });

  // Mise à jour des compteurs
  totalCounter.textContent = `Total : ${tasks.length}`;
  remainingCounter.textContent = `Restantes : ${remainingCount}`;
}

// US 01 : Ajouter une tâche => a la validation du formulaire
todoForm.addEventListener("submit", (e) => {
  //Supprimer le comportement par defaut (evite le refresh du navigateur)
  e.preventDefault();
  //Recupère la valeur du champ du formulaire et supprimer les espaces
  const textValue = todoInput.value.trim();
  //Si le champ est vide
  if (textValue === "") return;
  //Sinon on creer un nouvel objet tache
  const newTask = {
    id: Date.now(), // ID unique basé sur le timestamp
    text: textValue,
    completed: false,
  };
  //On l'ajoute au tableau d'objet
  tasks.push(newTask);
  //On vide le champ du formulaire
  todoInput.value = "";
  //Affiche le tableau mis ajour
  renderTasks();
});

// US 02 : Basculer l'état (terminé / non terminé)
function toggleTask(id) {
  //On boucle sur le tableau d'objet
  tasks = tasks.map((task) => {
    //Si id existe => on modifie son status bool
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  //Affiche la tache mise a jour
  renderTasks();
}

// US 03 : Supprimer une tâche
function deleteTask(id) {
  //Si l'id de la tache existe => la fonction filter detruit la tache
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// Initialisation au chargement de la page
renderTasks();
