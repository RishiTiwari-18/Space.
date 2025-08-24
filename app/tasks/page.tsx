"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Circle, CheckCircle, Trash2, Flag } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

// Type definitions
type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: number;
  text: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
}

interface TaskStats {
  total: number;
  completed: number;
  remaining: number;
}

// Constants
const PRIORITY_ORDER = { high: 3, medium: 2, low: 1 } as const;
const PRIORITY_COLORS = {
  high: 'bg-red-500/30',
  medium: 'bg-yellow-500/30',
  low: 'bg-green-500/30'
} as const;

const STORAGE_KEY = 'space-tasks';

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue] as const;
}

// Memoized components for better performance
const TaskItem = ({ task, onToggle, onDelete }: {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => (
  <Card className={task.completed ? "opacity-60" : ""}>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onToggle(task.id)}
            aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {task.completed ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5" />
            )}
          </Button>
          <span className={task.completed ? "line-through" : ""}>
            {task.text}
          </span>
          <Badge className={PRIORITY_COLORS[task.priority]}>
            <Flag className="h-3 w-3 mr-1" />
            {task.priority}
          </Badge>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </CardContent>
  </Card>
);

const StatsCard = ({ title, value, color }: { title: string; value: number; color: string }) => (
  <Card>
    <CardContent className="flex flex-col items-center">
      <h2 className={`text-3xl ${color} font-bold`}>{value}</h2>
      <p className="dark:text-gray-300">{title}</p>
    </CardContent>
  </Card>
);

export default function TaskPage() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(STORAGE_KEY, []);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>('low');

  // Memoized handlers for better performance
  const handleAddTask = useCallback(() => {
    const trimmedText = newTaskText.trim();
    if (!trimmedText) return;

    const newTask: Task = {
      id: Date.now(),
      text: trimmedText,
      priority: newTaskPriority,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setNewTaskText('');
    setNewTaskPriority('low');
  }, [newTaskText, newTaskPriority, setTasks]);

  const toggleTask = useCallback((id: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const deleteTask = useCallback((id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTask();
    }
  }, [handleAddTask]);

  // Memoized computed values
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // Sort by completion status first
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then by priority
      return PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority];
    });
  }, [tasks]);

  const stats = useMemo((): TaskStats => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    return {
      total,
      completed,
      remaining: total - completed
    };
  }, [tasks]);

  return (
    <div className="p-4 md:p-10 flex w-full justify-center">
      <div className="max-w-4xl w-full flex gap-8 flex-col h-full">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p>Organize your study tasks by priority</p>
        </div>

        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex max-md:flex-col gap-2">
              <Input
                placeholder="Enter a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="New task text"
              />
              <div className="flex gap-2 items-center">
                <Select 
                  value={newTaskPriority} 
                  onValueChange={(value: Priority) => setNewTaskPriority(value)}
                >
                  <SelectTrigger className="w-1/2 md:w-34">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Priority</SelectLabel>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Button 
                  className="max-md:w-1/2" 
                  onClick={handleAddTask}
                  disabled={!newTaskText.trim()}
                >
                  <Plus />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <StatsCard title="Total Tasks" value={stats.total} color="text-blue-400" />
          <StatsCard title="Completed" value={stats.completed} color="text-green-400" />
          <StatsCard title="Remaining" value={stats.remaining} color="text-red-400" />
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}

          {tasks.length === 0 && (
            <Card>
              <CardContent className="p-4 text-center text-gray-500">
                No tasks yet. Add your first task above!
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
