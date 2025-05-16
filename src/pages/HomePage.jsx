import React from 'react';
import '../styles/HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate('/create');
  };

  return (
    <div className="homepage-container">
      <h1 className="welcome-message">SakuMeへ</h1>
      <h1 className="welcome-message">ようこそ！</h1>
      <p className="description">
        スケジュールを新しく作成して、みんなで予定を調整しましょう。
      </p>
      <button className="create-button" onClick={handleCreateClick}>
        新規作成する
      </button>
    </div>
  );
}

export default HomePage;