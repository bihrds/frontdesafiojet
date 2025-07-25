import React, { useState } from 'react';
import { Task } from './types/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const removeTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div>
              <img
                src="/LOGOFACEIT.png"
                alt="Logo Face it"
                className="h-24 w-24 rounded-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4ade80] to-[#5eead4] bg-clip-text text-transparent">
              Gerenciador de Tarefas
            </h1>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Organize suas atividades diárias de forma simples e eficiente. 
            <br />
            Encare a tempestade que tenta te derrubar, 
            você se torna invencível no momento em que reconhece a força que carrega dentro de si!
          </p>
        </div>


        <TaskForm onAddTask={addTask} />

        <TaskList tasks={tasks} onRemoveTask={removeTask} />


        <div className="text-center mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400">
            Desenvolvido com React + TypeScript + Tailwind CSS - Bianca Rocha
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;