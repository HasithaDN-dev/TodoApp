export default function TodoItem({ todo, onToggle, onDelete }) {
    console.log("TodoItem received todo:", todo);
    
    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            return date.toLocaleString();
        } catch {
            return dateString.replace('T', ' ');
        }
    };

    return (
        <div className={`p-4 rounded-lg shadow-sm border mb-3 ${
            todo.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
        }`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    <input 
                        type="checkbox" 
                        checked={todo.completed || false} 
                        onChange={() => onToggle(todo)}
                        className="mt-1"
                    />
                    <div className="flex-1">
                        <div className={`font-medium ${
                            todo.completed ? "line-through text-gray-500" : "text-gray-900"
                        }`}>
                            {todo.title}
                        </div>
                        {todo.description && (
                            <div className="text-gray-600 text-sm mt-1">
                                {todo.description}
                            </div>
                        )}
                        {todo.dueDate && (
                            <div className="text-gray-400 text-xs mt-2">
                                Due: {formatDate(todo.dueDate)}
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex space-x-2 ml-4">
                    <button 
                        onClick={() => onToggle(todo)} 
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                            todo.completed 
                                ? "border border-gray-300 text-gray-600 hover:bg-gray-50" 
                                : "border border-green-500 text-green-600 hover:bg-green-50"
                        }`}
                    >
                        {todo.completed ? "Undo" : "Complete"}
                    </button>
                    <button 
                        onClick={() => onDelete(todo.id)} 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}