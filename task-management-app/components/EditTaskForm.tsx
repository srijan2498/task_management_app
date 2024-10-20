import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import { Task } from '../lib/tasks'

interface EditTaskFormProps {
  task: Task
  onSaveTask: (id: string, title: string, description: string, priority: string) => void
  onCancel: () => void
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onSaveTask, onCancel }) => {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [priority, setPriority] = useState(task.priority)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSaveTask(task.id, title, description, priority)
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
        className={styles.input}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        required
        className={styles.textarea}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className={styles.select}
      >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
      </select>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>Save</button>
        <button type="button" onClick={onCancel} className={styles.buttonSecondary}>Cancel</button>
      </div>
    </form>
  )
}