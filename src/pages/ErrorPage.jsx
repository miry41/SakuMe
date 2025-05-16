import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate('/');
    }, 10000);

    return () => {
      clearTimeout(redirectTimeout);
      clearInterval(timer);
    };
  }, [navigate]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>⚠️ エラーが発生しました</h2>
      <p>{countdown}秒後にホームに戻ります…</p>
      <button onClick={handleBack} style={{ marginTop: '1rem' }}>
        今すぐ戻る
      </button>
    </div>
  );
};

export default ErrorPage;
