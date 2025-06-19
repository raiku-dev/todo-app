import { Task, type TaskData } from '../backend/Task';
import { setErrDisplay } from './utils';

const newTaskBtn = document.querySelector('.new-task-btn');

const modal = document.querySelector('dialog');
const closeBtn = modal?.querySelector('.close-btn');

const form = modal?.querySelector('form');
const idInput = form?.querySelector('input[name="id"]') as HTMLInputElement;
const titleInput = form?.querySelector(
	'input[name="title"]'
) as HTMLInputElement;
const dateInput = form?.querySelector('input[name="date"]') as HTMLInputElement;
const textarea = form?.querySelector('textarea') as HTMLTextAreaElement;
const errDisplay = form?.querySelector('.err');

const charCountCurrent = form?.querySelector('.char-count .current');
const charCountTotal = form?.querySelector('.char-count .total');

const taskList: TaskData[] = [];
const taskListElement = document.querySelector('.task-list');

newTaskBtn?.addEventListener('click', () => {
	modal?.showModal();
});

closeBtn?.addEventListener('click', () => {
	modal?.close();
	resetForm();
});

if (charCountTotal && textarea) {
	charCountTotal.textContent = textarea.getAttribute('maxlength');
}

if (charCountCurrent) {
	textarea?.addEventListener('input', () => {
		charCountCurrent.textContent = textarea.value.length.toString();
	});
}

form?.addEventListener('input', () => {
	if (errDisplay?.hasAttribute('data-visible')) {
		setErrDisplay(errDisplay, '');
	}
});

form?.addEventListener('submit', e => {
	e.preventDefault();
	const formData = new FormData(form);
	const title = formData.get('title');
	const text = formData.get('text');
	const date = formData.get('date');

	if (
		typeof title !== 'string' ||
		typeof text !== 'string' ||
		typeof date !== 'string'
	) {
		setErrDisplay(errDisplay, 'Invalid data');
		return;
	}

	let task;
	const id = formData.get('id');
	const data = { title, text, date };

	if (id && typeof id === 'string') {
		task = Task.getById(id);

		if (!task) {
			setErrDisplay(errDisplay, 'Task does not exist.');
			return;
		}

		task = task.update(data);

		const index = taskList.findIndex(t => t.id === id);
		if (index === -1) {
			setErrDisplay(errDisplay, 'Task does not exist in TaskList.');
			return;
		}

		taskList[index] = task.json;
	} else {
		task = Task.create(data);

		if (task) {
			taskList.push(task.json);
		}
	}

	if (task === null) {
		setErrDisplay(errDisplay, 'Invalid data');
	} else {
		if (taskListElement) {
			taskListElement.innerHTML = '';
			taskList.forEach(t => {
				taskListElement?.appendChild(createTaskElement(t));
			});
		}
		modal?.close();
		resetForm();
	}
});

taskListElement?.addEventListener('click', e => {
	const target = e.target as HTMLElement;
	if (!target.classList.contains('edit-btn')) return;

	const id = target.getAttribute('data-task-id');
	if (!id) {
		console.error('Id not found');
		return;
	}

	const task = Task.getById(id);
	if (!task) {
		console.error('Task not found');
		return;
	}

	if (!idInput || !titleInput || !dateInput || !textarea) {
		alert('An error has occured.');
		return;
	}

	idInput.value = task.id;
	titleInput.value = task.title;
	dateInput.value = task.date;
	textarea.value = task.text;

	if (charCountCurrent) {
		charCountCurrent.textContent = task.text.length.toString();
	}

	modal?.showModal();
});

function createTaskElement(data: TaskData) {
	const element = document.createElement('div');
	element.classList.add('task');
	element.innerHTML = `
		<div class="content">
			<h4>${data.title}</h4>
			<small class="date">${data.date}</small>
			<p class="text">${data.text}</p>
		</div>
		<button class="edit-btn" data-task-id="${data.id}">edit</button>
	`;
	return element;
}

function resetForm() {
	if (charCountCurrent) {
		charCountCurrent.textContent = '0';
	}
	if (form) form.reset();
	if (idInput) idInput.value = '';
}
