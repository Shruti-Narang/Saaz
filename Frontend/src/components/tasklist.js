import React from 'react';

export default function TaskList({ tasks, onUpdateStatus }) {
  if (!tasks.length) return <p>No tasks found.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            border: '1px solid #ccc',
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor:
              task.status === 'done' ? '#d4edda' : '#f8d7da',
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: <strong>{task.status}</strong></p>
          {task.status !== 'done' && (
            <button onClick={() => onUpdateStatus(task.id, 'done')}>
              Mark as Done
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
