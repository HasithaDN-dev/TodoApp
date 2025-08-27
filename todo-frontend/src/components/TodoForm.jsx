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
        duedate: due ? new Date(due).toISOString().slice(0,19) : null,        
    });
    setTitle(""); setDesc(""); setDue("");
  };

  return (
    <form className="bg-white shadow-md rounded p-4 mb-4" onSubmit={submit}>
    <h3 className="text-lg font-semibold mb-2">Add Todo</h3>
    <input className="w-full border rounded px-2 py-1 mb-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
    <textarea className="w-full border rounded px-2 py-1 mb-2" placeholder="Description" row={2} value={desc} onChange={e=>setDesc(e.target.value)} />
    <input type="datetime-local" className="w-full border rounded px-2 py-1 mb-2" value={due} onChange={e=>setDue(e.target.value)} />
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" type="submit">Add</button>
    </form>
  );
}

