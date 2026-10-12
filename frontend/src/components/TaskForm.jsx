import { useEffect, useState } from 'react';
import { STATUS_LABELS, PRIORITY_LABELS } from '../constants';
const EMPTY = { title: '', description: '', dueDate: '', status: 'TODO', priority: 'MEDIUM', category: '' };

export default function TaskForm({ initial, onSubmit, onCancel, submitLabel = 'Ajouter' }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState(null);
  useEffect(() => { setForm(initial ? { ...EMPTY, ...initial, dueDate: initial.dueDate ?? '' } : EMPTY); }, [initial]);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError('Le titre est obligatoire'); return; }
    try { await onSubmit({ ...form, dueDate: form.dueDate || null }); setError(null); if (!initial) setForm(EMPTY); }
    catch (err) { setError(err?.response?.data?.message || 'Erreur lors de enregistrement'); }
  };
  return (
    <form className="card task-form" onSubmit={submit}>
      <h2>{initial ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
      {error && <p className="error">{error}</p>}
      <input name="title" placeholder="Titre *" value={form.title} onChange={change} maxLength={120} />
      <textarea name="description" placeholder="Description" rows={3} value={form.description ?? ''} onChange={change} />
      <div className="row">
        <label>Échéance <input type="date" name="dueDate" value={form.dueDate ?? ''} onChange={change} /></label>
        <label>Statut <select name="status" value={form.status} onChange={change}>{Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        <label>Priorité <select name="priority" value={form.priority} onChange={change}>{Object.entries(PRIORITY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>
        <label>Catégorie <input name="category" placeholder="Travail, Perso…" value={form.category ?? ''} onChange={change} /></label>
      </div>
      <div className="actions">
        <button type="submit" className="btn primary">{submitLabel}</button>
        {onCancel && <button type="button" className="btn" onClick={onCancel}>Annuler</button>}
      </div>
    </form>
  );
}
