import { createContext, ReactNode, useContext, useState } from "react";

export interface Task {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}
interface TodoContextProps {
  tasks: Task[];
  addTask: (name: string, description: string) => void;
  editTask: (id: string, name: string, description: string) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}
const TodoContext = createContext<TodoContextProps | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (name: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      name,
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const editTask = (id: string, name: string, description: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, name, description } : task
      )
    );
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ tasks, addTask, editTask, toggleComplete, deleteTask }}
    >
      {children}
    </TodoContext.Provider>
  );
};
