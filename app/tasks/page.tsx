"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Circle, CheckCircle, Trash2, Flag } from "lucide-react"; // Import necessary icons
import { useState, useMemo } from "react"; // Import useState and useMemo
import { Badge } from "@/components/ui/badge"; // Import Badge component

interface Task {
  id: number;
  text: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'low' | 'medium' | 'high'>('low'); // Default priority

  const handleAddTask = () => {
    if (newTaskText.trim() === '') {
      return; // Don't add empty tasks
    }

    const newTask: Task = {
      id: Date.now(), // Simple unique ID
      text: newTaskText,
      priority: newTaskPriority,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskText(''); // Clear input
    setNewTaskPriority('low'); // Reset priority select
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Helper to get priority color class
  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/30 ';
      case 'medium':
        return 'bg-yellow-500/30 ';
      case 'low':
      default:
        return 'bg-green-500/30';
    }
  };

  // Sort tasks by priority (high > medium > low) and then by completion status (incomplete first)
  const sortedTasks = useMemo(() => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return [...tasks].sort((a, b) => {
      // Sort by completion status (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      // Then sort by priority
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }, [tasks]);


  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const remainingTasks = totalTasks - completedTasks;


  return (
    <div className="p-10 flex w-full justify-center">
      <div className="max-w-4xl w-full flex gap-8  flex-col h-full">

        {/* heading */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold">Task Manager</h1>
          <p>Organize your study tasks by priority</p>
        </div>

        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter a new task..."
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                onKeyPress={(e) => { // Allow adding task on Enter key press
                  if (e.key === 'Enter') {
                    handleAddTask();
                  }
                }}
              />
              {/* Fix: Cast value to the correct type for setNewTaskPriority */}
              <Select value={newTaskPriority} onValueChange={(value) => setNewTaskPriority(value as 'low' | 'medium' | 'high')}>
                <SelectTrigger className="w-34">
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
              <Button onClick={handleAddTask}><Plus /></Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid  grid-cols-3 gap-3">
          <Card>
            <CardContent className="flex flex-col items-center">
              <h2 className="text-3xl text-blue-400 font-bold">{totalTasks}</h2>
              <p className="dark:text-gray-300">Total Tasks</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex  flex-col items-center">
            <h2 className="text-3xl text-green-400 font-bold">{completedTasks}</h2>
            <p className="dark:text-gray-300">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center">
            <h2 className="text-3xl text-red-400 font-bold">{remainingTasks}</h2>
            <p className="dark:text-gray-300">Remaining</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
        {/* Render the list of tasks */}
        {sortedTasks.map((task) => (
          <Card key={task.id} className={`${task.completed ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" onClick={() => toggleTask(task.id)}>
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5" />
                    )}
                  </Button>
                  <span className={`${task.completed ? "line-through" : ""}`}>{task.text}</span> {/* Use task.text */}
                  <Badge className={getPriorityColor(task.priority)}>
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Show message if no tasks */}
        {tasks.length === 0 && (
          <div>
            <Card>
              <CardContent className="p-4 text-center text-gray-500">No tasks yet. Add your first task above!</CardContent>
            </Card>
          </div>
        )}

        </div> {/* Closing div for space-y-3 */}

      </div> {/* Closing div for max-w-4xl */}
    </div> 
  )
}
