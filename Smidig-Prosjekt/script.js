// --- Hent elementer ---
const addBtn = document.getElementById('addBtn');
const taskInput = document.getElementById('taskInput');
const assigneeSelect = document.getElementById('assigneeSelect');
const memberInput = document.getElementById('memberInput');
const addMemberBtn = document.getElementById('addMemberBtn');
const memberList = document.getElementById('memberList');

// --- Legg til medlem ---
addMemberBtn.addEventListener('click', () => {
  const name = memberInput.value.trim();
  if (!name) return;

  // Legg til i listevisningen
  const li = document.createElement('li');
  li.textContent = name;
  memberList.appendChild(li);

  // Legg til i dropdown-menyen
  const option = document.createElement('option');
  option.value = name;
  option.textContent = name;
  assigneeSelect.appendChild(option);

  memberInput.value = '';
  saveData();
});

// --- Legg til oppgave ---
addBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  const assignee = assigneeSelect.value;
  if (!text) return;

  const task = createTaskElement(text, assignee);
  document.querySelector('#todo .tasks').appendChild(task);

  taskInput.value = '';
  assigneeSelect.value = '';
  saveData();
});

// --- Lag oppgaveelement ---
function createTaskElement(text, assignee) {
  const div = document.createElement('div');
  div.className = 'task';
  div.draggable = true;
  div.innerHTML = `<strong>${text}</strong><div class="assignee">${assignee ? '👤 ' + assignee : ''}</div>`;
  div.addEventListener('dragstart', dragStart);
  return div;
}

// --- Drag & Drop ---
function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.innerHTML);
  e.target.classList.add('dragging');
}

document.querySelectorAll('.tasks').forEach(area => {
  area.addEventListener('dragover', e => e.preventDefault());
  area.addEventListener('drop', e => {
    e.preventDefault();
    const content = e.dataTransfer.getData('text/plain');
    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true;
    task.innerHTML = content;
    task.addEventListener('dragstart', dragStart);
    area.appendChild(task);
    document.querySelector('.dragging')?.remove();
    saveData();
  });
});

// --- Lagre og laste ---
function saveData() {
  const data = {
    members: Array.from(memberList.querySelectorAll('li')).map(li => li.textContent),
    columns: {}
  };

  document.querySelectorAll('.column').forEach(col => {
    data.columns[col.id] = Array.from(col.querySelectorAll('.task')).map(task => task.innerHTML);
  });

  localStorage.setItem('kanbanGroupData', JSON.stringify(data));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem('kanbanGroupData'));
  if (!data) return;

  // Last inn medlemmer
  if (data.members) {
    data.members.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      memberList.appendChild(li);

      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      assigneeSelect.appendChild(option);
    });
  }

  // Last inn oppgaver
  for (const [colId, tasks] of Object.entries(data.columns || {})) {
   const area = document.querySelector(`#${colId} .tasks`);
    tasks.forEach(html => {
      const div = document.createElement('div');
      div.className = 'task';
      div.draggable = true;
      div.innerHTML = html;
      div.addEventListener('dragstart', dragStart);
      area.appendChild(div);
    });
  }
}

loadData();