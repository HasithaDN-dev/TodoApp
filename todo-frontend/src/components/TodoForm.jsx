import { useState } from 'react';
 
export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [due, setDue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if(!title.trim())  return;
    onAdd({
        title: title.trim(),
        description: desc.trim() || null,
        dueDate: due ? new Date(due).toISOString().slice(0,19) : null,        
    });
    setTitle(""); setDesc(""); setDue("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Add New Todo</h3>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="What needs to be done?" 
            value={title} 
            onChange={e=>setTitle(e.target.value)} 
            required 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            placeholder="Additional details (optional)" 
            rows={2} 
            value={desc} 
            onChange={e=>setDesc(e.target.value)} 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input 
            type="datetime-local" 
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
            value={due} 
            onChange={e=>setDue(e.target.value)} 
          />
        </div>
        
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium" 
          type="submit"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

