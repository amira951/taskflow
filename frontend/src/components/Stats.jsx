export default function Stats({ stats }) {
  if (!stats) return null;
  return (
    <section className="card stats">
      <div className="stats-numbers">
        <div><strong>{stats.total}</strong><span>Total</span></div>
        <div><strong>{stats.todo}</strong><span>À faire</span></div>
        <div><strong>{stats.inProgress}</strong><span>En cours</span></div>
        <div><strong>{stats.done}</strong><span>Terminées</span></div>
      </div>
      <div className="progress"><div className="progress-bar" style={{ width: `${stats.progressPercent}%` }} /></div>
      <p className="progress-label">Avancement : {stats.progressPercent}%</p>
    </section>
  );
}
