export interface TaskData {
	id?: string;
	title: string;
	text: string;
	date: string;
}

const taskList: Task[] = [];

let counter = 1;

export class Task {
	#id: string;
	#title: string;
	#text: string;
	#date: string;

	constructor(id: string, data: TaskData) {
		this.#id = id;
		this.#title = data.title;
		this.#text = data.text;
		this.#date = data.date;
	}

	get id() {
		return this.#id;
	}
	get title() {
		return this.#title;
	}
	get text() {
		return this.#text;
	}
	get date() {
		return this.#date;
	}
	get json() {
		return {
			id: this.#id,
			title: this.#title,
			text: this.#text,
			date: this.#date
		};
	}

	/**
	 * Creates a new Task in the DB
	 *
	 * @param {TaskData} data - The data for the new task
	 *
	 * @returns {Task|null} the new Task or null if failed
	 */
	static create(data: TaskData): Task | null {
		if (!data.title || !data.text || !data.date) return null;

		const task = new Task(`Task_${counter}`, data);
		counter++;
		taskList.push(task);

		return task;
	}

	/**
	 * Gets a Task by its ID.
	 *
	 * @param {string} id - The ID of the Task to get
	 *
	 * @returns {Task|null} The Task with the specified ID or null if not found
	 */
	static getById(id: string): Task | null {
		return taskList.find(task => task.id === id) || null;
	}

	/**
	 * Updates the Task
	 *
	 * @param {TaskData} data - The updated TaskData
	 *
	 * @returns {Task} The updated Task
	 */
	update(data: TaskData): Task {
		if (data.title && typeof data.title === 'string') {
			this.#title = data.title;
		}
		if (data.text && typeof data.text === 'string') {
			this.#text = data.text;
		}
		if (data.date && typeof data.date === 'string') {
			this.#date = data.date;
		}

		return this;
	}
}
