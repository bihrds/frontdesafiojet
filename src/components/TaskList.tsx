import React from 'react';
import { List, Calendar } from 'lucide-react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onRemoveTask: (id: string) => void;
}

export default function TaskList({ tasks, onRemoveTask }: TaskListProps) {
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = a.executionTime;
    const timeB = b.executionTime;
    return timeA.localeCompare(timeB);
  });

  if (tasks.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
        <Calendar className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">Nenhuma tarefa cadastrada</h3>
        <p className="text-gray-400">Adicione sua primeira tarefa usando o formulário acima.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <List className="h-6 w-6 text-[#22c55e]" />
        Minhas Tarefas ({tasks.length})
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={onRemoveTask}
          />
        ))}
      </div>
    </div>
  );
}