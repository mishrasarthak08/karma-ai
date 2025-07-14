import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => { fetchTasks(); }, []);

  const fetchTasks = async () => {
    const res = await supabase.from("karma_tasks").select();
    setTasks(res.data || []);
  };

  const addTask = async () => {
    if (input.trim() === "") return;
    await supabase.from("karma_tasks").insert({ task: input });
    setInput("");
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl mb-4">K.A.R.M.A. Assistant</h1>
      <div className="mb-4">
        <input
          className="px-2 py-1 text-black"
          placeholder="New task…"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={addTask} className="ml-2 px-4 py-1 bg-blue-600">Add</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id} className="mb-2">{t.task} — <strong>{t.status}</strong></li>
        ))}
      </ul>
    </div>
  );
}
