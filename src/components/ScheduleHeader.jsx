import React, { useEffect, useState } from 'react';
import '../styles/ScheduleHeader.css';

const ScheduleHeader = ({ title, creatorName, description, showDescription, setShowDescription }) => {
  const [localNickName, setLocalNickName] = useState('');

  useEffect(() => {
    const savedName = localStorage.getItem('nickName');
    if (savedName) {
      setLocalNickName(savedName);
    }
  }, []);

  return (
    <header className="schedule-header">
      <div className="header-main">
        <h2 className="schedule-title">{title}</h2>
        <h2>{localNickName} さん</h2>
        <span className="creator">by {creatorName}</span>
      </div>

      <button
        className="description-toggle"
        onClick={() => setShowDescription((prev) => !prev)}
      >
        <img src="/assets/info.png" alt="info" className="info-icon" />
      </button>
      {showDescription && (
        <div className="description-popup">
          {description || '説明はありません'}
        </div>
      )}
    </header>
  );
};

export default ScheduleHeader;
