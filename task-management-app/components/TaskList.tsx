"use client"

import React, { useState, useEffect } from 'react'
import { AddTaskForm } from './AddTaskForm'
import { EditTaskForm } from './EditTaskForm'
import { SearchBar } from './SearchBar'
import { TaskItem } from './TaskItem'
import styles from '../styles/Home.module.css'
import { Task } from '../lib/tasks'
import '../styles/commonStyles.css'

interface TaskListProps {
  initialTasks: Task[]
}

export const TaskList: React.FC<TaskListProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc') // Add state to toggle sort order
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    if(localStorage.getItem('tasks')){

    }
    else{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (title: string, description: string, priority: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      priority,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const toggleComplete = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const editTask = (task: Task) => {
    setEditingTask(task)
  }

  const saveTask = (id: string, title: string, description: string, priority: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title, description, priority } : task
    ))
    setEditingTask(null)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const sortTasks = (tasksToSort: Task[]): Task[] => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    
    // Sort based on the current sort order (asc or desc)
    const sortedTasks = tasksToSort.sort((a, b) =>
      priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
    )
    
    // Reverse the array if the sort order is 'asc' for ascending order
    return sortOrder === 'asc' ? sortedTasks.reverse() : sortedTasks
  }
  const [c, setc]=useState(0)
  const sortTaskItems=()=>{
      
    const highTask= tasks.filter((task)=>task.priority=='1')
    const midTask= tasks.filter((task)=>task.priority=='2')
    const lowTask= tasks.filter((task)=>task.priority=='3')
   let newTasksSorted: Task[] = []
    if(sortOrder=='desc'){
        newTasksSorted = [...highTask, ...midTask, ...lowTask]
    }
    else if(sortOrder=='asc'){
        newTasksSorted = [...lowTask, ...midTask, ...highTask]
    }
    if(c==0){
        alert("Sorted Successfully!")
    }
    else{
        alert("Already Sorted!")
    }
    setTasks(newTasksSorted)
    setc(1)
  }

  const filteredAndSortedTasks = sortTasks(
    tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const pendingTasks = filteredAndSortedTasks.filter(task => !task.completed)
  const completedTasks = filteredAndSortedTasks.filter(task => task.completed)

  const toggleSortOrder = () => {
    // Toggle the sort order between ascending and descending
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    sortTasks(tasks)
  }

  return (
    <div className={styles.taskList}>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <AddTaskForm onAddTask={addTask} />
      {editingTask && (
        <EditTaskForm
          task={editingTask}
          onSaveTask={saveTask}
          onCancel={() => setEditingTask(null)}
        />
      )}
      <button className='sort_btn' onClick={sortTaskItems}>
        {sortOrder === 'asc' ? 'Sort' : 'Sorted'}
      </button>
      <h2>Pending Tasks</h2>
      {pendingTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={toggleComplete}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
        />
      ))}
      <h2>Completed Tasks</h2>
      {completedTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={toggleComplete}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
        />
      ))}
    </div>
  )
}
