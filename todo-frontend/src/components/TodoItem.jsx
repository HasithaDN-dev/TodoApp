export default function TodoItem({ todo, onToggle, onDelete}) {
    return (
        <div className={`flex justify-between items-center p-3 rounded shadow mb-2 ${todo.completed ? "bg-green-50" : "bg-white"}`}>
            <div className="flex items-center space-x-2">
                <input type="checkbox" checked={todo.completed} onChange={()=>onToggle(todo)} />
                <div className="font-medium">{todo.title}</div>
                {todo.description && <div className="text-gray-500 text-sm">{todo.description}</div>}
                {todo.dueDate && <div className="text-gray-400 text-xs">Due: {todo.dueDate.replace('T',' ')}</div>}
            </div>
            <div className="flex space-x-2">
                <button onClick={()=>onToggle(todo)} className="border px-2 py-1 rounded text-sm">{todo.completed ? "Undo" : "Complete"}</button>
                <button onClick={()=>onDelete(todo.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm">Delete</button>
            </div>
        </div>
    );
}