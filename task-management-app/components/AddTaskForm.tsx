import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

interface AddTaskFormProps {
  onAddTask: (title: string, description: string, priority: string) => void
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('1')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddTask(title, description, priority)
    setTitle('')
    setDescription('')
    setPriority('1')
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
      <button type="submit" className={styles.button}>Add Task</button>
    </form>
  )
}