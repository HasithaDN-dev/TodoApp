import { useEffect, useState } from "react";
import api from "../api/axios";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [stats, setStats] = useState({ pending: 0, done: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const load = async () => {
        try {
            setError("");
            const [todosResponse, statsResponse] = await Promise.all([
                api.get("/todos"),
                api.get("/todos/stats")
            ]);
            console.log("Todos received from API:", todosResponse.data);
            console.log("Number of todos:", todosResponse.data?.length);
            if (todosResponse.data?.length > 0) {
                console.log("First todo structure:", todosResponse.data[0]);
            }
            setTodos(todosResponse.data);
            setStats(statsResponse.data || { pending: 0, done: 0 });
        } catch (err) {
            setError("Failed to load todos. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { 
        load(); 
    }, []);

    const add = async (payload) => {
        try {
            setError("");
            await api.post("/todos", payload);
            await load();
        } catch (err) {
            setError("Failed to add todo. Please try again.");
            console.error(err);
        }
    };

    const toggle = async (todo) => {
        try {
            setError("");
            await api.put(`/todos/${todo.id}`, { completed: !todo.completed });
            await load();
        } catch (err) {
            setError("Failed to update todo. Please try again.");
            console.error(err);
        }
    };
    
    const remove = async (id) => {
        try {
            setError("");
            await api.delete(`/todos/${id}`);
            await load();
        } catch (err) {
            setError("Failed to delete todo. Please try again.");
            console.error(err);
        }
    };

    const completeOverdue = async () => {
        try {
            setError("");
            const iso = new Date().toISOString().slice(0, 19);
            const res = await api.post(`/todos/complete-overdue`, null, { 
                params: { dueBefore: iso } 
            });
            const affected = res.data?.affected ?? 0;
            alert(`Marked ${affected} overdue tasks as complete`);
            await load();
        } catch (err) {
            setError("Failed to complete overdue todos. Please try again.");
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
                        <div className="text-sm text-gray-600 mt-1">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                                Pending: {stats.pending || 0}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Done: {stats.done || 0}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={completeOverdue}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Complete Overdue
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {/* Create Form */}
            <TodoForm onAdd={add} />

            {/* Todo List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                    Your Tasks ({todos.length})
                </h2>
                {todos.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">No todos yet</div>
                        <div className="text-gray-500 text-sm">
                            Create your first todo above to get started!
                        </div>
                    </div>
                ) : (
                    <div>
                        {todos.map((todo) => (
                            <TodoItem 
                                key={todo.id} 
                                todo={todo} 
                                onToggle={toggle} 
                                onDelete={remove} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
