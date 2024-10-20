export interface Task {
  id: string
  title: string
  description: string
  priority: string
  completed: boolean
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project proposal',
    description: 'Write and submit the project proposal by Friday',
    priority: '1',
    completed: false
  },
  {
    id: '2',
    title: 'Buy groceries',
    description: 'Get milk, eggs, bread, and vegetables',
    priority: '2',
    completed: false
  },
  {
    id: '3',
    title: 'Go for a run',
    description: 'Run for 30 minutes in the park',
    priority: '3',
    completed: true
  }
]

export async function getTasks(): Promise<Task[]> {
  // Simulate API call or database query
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialTasks), 1000)
  })
}