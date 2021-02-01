const taskTitle = document.querySelector("#task-title");
const taskDescription = document.querySelector("#task-description");
const editTitle = document.querySelector("#edit-title");
const editDescription = document.querySelector("#edit-description");
const taskSaveBtn = document.querySelector("#task-edit-button");
const taskAddBtn = document.querySelector("#task-add-button");
const progressBlock = document.querySelector(".todo__card__progress_items");
const deletedBlock = document.querySelector(".todo__card__deleted_items");
const doneBlock = document.querySelector(".todo__card__complited_items");
const completeBlock = document.querySelector(".todo__card__complited_items");
const arrayDeleted = [];
const arrayDone = [];
const arrayProgress = [];
const progressCount = document.querySelector(".todo__card__progress_count");
progressCount.innerHTML = arrayProgress.length;
const complitedCount = document.querySelector(".todo__card__complited_count");
complitedCount.innerHTML = arrayDone.length;

taskAddBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (taskTitle.value == "" || taskDescription == "") {
    this.classList.add("fade-block", "error");
  } else {
    this.classList.remove("fade-block", "error");
    arrayProgress.push({
      title: taskTitle.value,
      description: taskDescription.value,
    });
    document.querySelector("#add-task").reset();
    drawInProgress();
    progressCount.innerHTML = arrayProgress.length;
  }
});

function drawInProgress() {
  progressBlock.innerHTML = "";
  arrayProgress.forEach((item) => {
    progressBlock.innerHTML += `
    <div class="todo__card__progress_card fade-block">
    <p class="divider"><span class="todo__card__title_pub">${item.title}</span></p>
    <p><span class="todo__card__description_pub">${item.description}</span></p>
    <div class="todo__card__buttons">
    <button class="todo__card_btn todo__edit_btn"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
    <button class="todo__card_btn todo__done_btn"><i class="fa fa-check-square-o" aria-hidden="true"></i></button>
    <button class="todo__card_btn todo__delete_btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
    </div>
    </div>
    `;
  });
}

function drawDeleted() {
  deletedBlock.innerHTML = "";
  arrayDeleted.forEach((item) => {
    deletedBlock.innerHTML += `
      <div class="todo__card__deleted_card fade-block">
      <p class="divider"><span class="todo__card__title_pub">${item.title}</span></p>
      <p><span class="todo__card__description_pub">${item.description}</span></p>
      <div class="todo__card__buttons">
      <button class="todo__card_btn todo__trash_btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
      </div>
      </div>
      `;
  });
}
function drawDone() {
  doneBlock.innerHTML = "";
  arrayDone.forEach((item) => {
    doneBlock.innerHTML += `
      <div class="todo__card__complited_card fade-block">
      <p class="divider"><span class="todo__card__title_pub">${item.title}</span></p>
      <p><span class="todo__card__description_pub">${item.description}</span></p>
      <div class="todo__card__buttons">
      <button class="todo__card_btn todo__complite_trash_btn"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
      </div>
      </div>
      `;
  });
}

function delTask() {
  const taskDelBtn = [...document.querySelectorAll(".todo__delete_btn")];
  const delBtn = event.target.closest(".todo__delete_btn");
  let i = taskDelBtn.indexOf(delBtn);
  arrayDeleted.push({
    title: arrayProgress[i].title,
    description: arrayProgress[i].description,
  });
  arrayProgress.splice(i, 1);
  drawInProgress();
  progressCount.innerHTML = arrayProgress.length;
  drawDeleted();
}
function doneTask() {
  const taskDoneBtn = [...document.querySelectorAll(".todo__done_btn")];
  const doneBtn = event.target.closest(".todo__done_btn");
  let i = taskDoneBtn.indexOf(doneBtn);
  arrayDone.push({
    title: arrayProgress[i].title,
    description: arrayProgress[i].description,
  });
  arrayProgress.splice(i, 1);
  drawInProgress();
  progressCount.innerHTML = arrayProgress.length;
  complitedCount.innerHTML = arrayDone.length;
  drawDone();
}
function editTask() {
  const taskEditBtn = [...document.querySelectorAll(".todo__edit_btn")];
  const editBtn = event.target.closest(".todo__edit_btn");

  let i = taskEditBtn.indexOf(editBtn);
  editTitle.value = arrayProgress[i].title;
  editDescription.value = arrayProgress[i].description;

  taskSaveBtn.addEventListener("click", (event) => {
    event.preventDefault;
    arrayProgress.splice(i, 1, {
      title: editTitle.value,
      description: editDescription.value,
    });
    document
      .querySelector(".todo__card__edit__content")
      .classList.add("hidden");
    drawInProgress();
  });
}

progressBlock.addEventListener("click", (event) => {
  if (event.target.closest(".todo__delete_btn")) {
    delTask();
  } else if (event.target.closest(".todo__edit_btn")) {
    document
      .querySelector(".todo__card__edit__content")
      .classList.remove("hidden");
    editTask();
  } else if (event.target.closest(".todo__done_btn")) {
    doneTask();
  } else {
    return true;
  }
});
deletedBlock.addEventListener("click", (event) => {
  if (event.target.closest(".todo__trash_btn")) {
    const taskDelBtn = [...document.querySelectorAll(".todo__trash_btn")];
    const delBtn = event.target.closest(".todo__trash_btn");
    let i = taskDelBtn.indexOf(delBtn);
    arrayDeleted.splice(i, 1);
    drawDeleted();
  } else {
    return true;
  }
});
completeBlock.addEventListener("click", (event) => {
  if (event.target.closest(".todo__complite_trash_btn")) {
    const taskDoneDelBtn = [
      ...document.querySelectorAll(".todo__complite_trash_btn"),
    ];
    const doneDelBtn = event.target.closest(".todo__complite_trash_btn");
    let i = taskDoneDelBtn.indexOf(doneDelBtn);
    arrayDeleted.push({
      title: arrayDone[i].title,
      description: arrayDone[i].description,
    });
    arrayDone.splice(i, 1);
    complitedCount.innerHTML = arrayDone.length;

    drawDeleted();
    drawDone();
  } else {
    return true;
  }
});
