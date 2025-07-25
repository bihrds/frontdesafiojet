import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Task } from '../types/Task';

interface TaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export default function TaskForm({ onAddTask }: TaskFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    executionTime: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome da tarefa é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória';
    }

    if (!formData.executionTime) {
      newErrors.executionTime = 'Hora de execução é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddTask({
        name: formData.name.trim(),
        description: formData.description.trim(),
        executionTime: formData.executionTime
      });
      
      setFormData({
        name: '',
        description: '',
        executionTime: ''
      });
      setErrors({});
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Plus className="h-6 w-6 text-[#22c55e]" />
        Nova Tarefa
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Nome da Tarefa *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all duration-200 bg-gray-700 text-white placeholder-gray-400 ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Digite o nome da tarefa..."
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Descrição *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all duration-200 resize-none bg-gray-700 text-white placeholder-gray-400 ${
              errors.description ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Descreva a tarefa em detalhes..."
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="executionTime" className="block text-sm font-medium text-gray-300 mb-1">
            Hora de Execução *
          </label>
          <input
            type="time"
            id="executionTime"
            value={formData.executionTime}
            onChange={(e) => handleChange('executionTime', e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent transition-all duration-200 bg-gray-700 text-white ${
              errors.executionTime ? 'border-red-500' : 'border-gray-600'
            }`}
          />
          {errors.executionTime && <p className="text-red-500 text-sm mt-1">{errors.executionTime}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-[#22c55e]/20 focus:outline-none"
        >
          Adicionar Tarefa
        </button>
      </form>
    </div>
  );
}