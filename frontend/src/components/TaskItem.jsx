import { STATUS_LABELS, PRIORITY_LABELS } from '../constants';
export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  const late = task.dueDate && task.status !== 'DONE' && new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);
  return (
    <li className={`task ${task.status.toLowerCase()}`}>
      <div className="task-main">
        <h3>{task.title}</h3>
        {task.description && <p className="desc">{task.description}</p>}
        <div className="badges">
          <span className={`badge p-${task.priority.toLowerCase()}`}>{PRIORITY_LABELS[task.priority]}</span>
          {task.category && <span className="badge cat">{task.category}</span>}
          {task.dueDate && <span className={`badge ${late ? 'late' : ''}`}>📅 {task.dueDate}{late ? ' (en retard)' : ''}</span>}
        </div>
      </div>
      <div className="task-actions">
        <select value={task.status} onChange={(e) => onStatusChange(task.id, e.target.value)}>
          {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <button className="btn" onClick={() => onEdit(task)}>✏️</button>
        <button className="btn danger" onClick={() => onDelete(task.id)}>🗑</button>
      </div>
    </li>
  );
}
