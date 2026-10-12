import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, getStats, getTasks, patchStatus, updateTask } from './api';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import Stats from './components/Stats';
import './index.css';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState({ status: '', category: '' });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filter.status) params.status = filter.status;
      if (filter.category) params.category = filter.category;
      const [t, s] = await Promise.all([getTasks(params), getStats()]);
      setTasks(t); setStats(s); setApiError(null);
    } catch { setApiError("Impossible de contacter l'API. Le backend est-il démarré ?"); }
    finally { setLoading(false); }
  }, [filter]);

  useEffect(() => { load(); }, [load]);
  const handleCreate = async (task) => { await createTask(task); await load(); };
  const handleUpdate = async (task) => { await updateTask(editing.id, task); setEditing(null); await load(); };
  const handleStatus = async (id, status) => { await patchStatus(id, status); await load(); };
  const handleDelete = async (id) => { if (window.confirm('Supprimer cette tâche ?')) { await deleteTask(id); await load(); } };

  return (
    <div className="app">
      <header><h1>✅ TaskFlow</h1><p>Gestion de tâches — React + Spring Boot + PostgreSQL</p></header>
      {apiError && <p className="error card">{apiError}</p>}
      <Stats stats={stats} />
      {editing ? <TaskForm initial={editing} onSubmit={handleUpdate} onCancel={() => setEditing(null)} submitLabel="Enregistrer" /> : <TaskForm onSubmit={handleCreate} />}
      <section className="card filters">
        <label>Filtrer par statut
          <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="">Tous</option><option value="TODO">À faire</option><option value="IN_PROGRESS">En cours</option><option value="DONE">Terminées</option>
          </select>
        </label>
        <label>Catégorie <input value={filter.category} placeholder="ex: Travail" onChange={(e) => setFilter({ ...filter, category: e.target.value })} /></label>
      </section>
      {loading ? <p>Chargement…</p> : (
        <ul className="task-list">
          {tasks.length === 0 && <p className="empty">Aucune tâche. Ajoutes-en une 👆</p>}
          {tasks.map((t) => (<TaskItem key={t.id} task={t} onEdit={setEditing} onDelete={handleDelete} onStatusChange={handleStatus} />))}
        </ul>
      )}
    </div>
  );
}
