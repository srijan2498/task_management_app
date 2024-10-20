import React from 'react'
import styles from '../styles/Home.module.css'
import { Task } from '../lib/tasks'

interface TaskItemProps {
  task: Task
  onToggleComplete: (id: string) => void
  onEditTask: (task: Task) => void
  onDeleteTask: (id: string) => void
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEditTask, onDeleteTask }) => {
    const priority=task.priority=='1'?'high':task.priority=='2'?'medium':task.priority=='3'?'low':''
  return (
    <div className={`${styles.taskItem} ${styles[priority]} ${task.completed ? styles.completed : ''}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <div className={styles.taskActions}>
        <button onClick={() => onToggleComplete(task.id)} className={styles.button}>
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button onClick={() => onEditTask(task)} className={styles.buttonSecondary}>Edit</button>
        <button onClick={() => onDeleteTask(task.id)} className={styles.buttonDanger}>Delete</button>
      </div>
    </div>
  )
}