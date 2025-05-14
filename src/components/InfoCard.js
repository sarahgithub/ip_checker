import React from 'react';

const InfoCard = ({ title, info }) => {
  if (!info || Object.keys(info).length === 0) return null;

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '1rem',
      marginBottom: '1.5rem',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    }}>
      <h2 style={{ marginBottom: '1rem', color: '#333' }}>{title}</h2>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.entries(info).map(([key, value]) => (
          <li key={key} style={{ marginBottom: '0.5rem' }}>
            <strong>{key}:</strong> {value || 'N/A'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfoCard;