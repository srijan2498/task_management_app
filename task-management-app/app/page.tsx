import { TaskList } from '../components/TaskList'
import { getTasks } from '../lib/tasks'
import styles from '../styles/Home.module.css'

export default async function Home() {
  const initialTasks = await getTasks()

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Task Management App</h1>
      <TaskList initialTasks={initialTasks} />
    </main>
  )
}