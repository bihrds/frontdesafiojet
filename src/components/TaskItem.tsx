import React from 'react';
import { Clock, FileText, Trash2 } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onRemove: (id: string) => void;
}

export default function TaskItem({ task, onRemove }: TaskItemProps) {
  const formatTime = (time: string) => {
    return time;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-white">{task.name}</h3>
        <button
          onClick={() => onRemove(task.id)}
          className="text-gray-400 hover:text-red-400 transition-colors duration-200 p-1 rounded-full hover:bg-red-900/20"
          title="Remover tarefa"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <FileText className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-gray-300 leading-relaxed">{task.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#22c55e]" />
          <span className="text-[#22c55e] font-medium">{formatTime(task.executionTime)}</span>
        </div>

        <div className="pt-2 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            Criada em: {formatDate(task.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}