import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import '../styles/create.css';

function Create() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeRange, setTimeRange] = useState({ start: '', end: '' });
  const [timeUnit, setTimeUnit] = useState('30');
  const [ttl, setTtl] = useState(30);
  const [creatorName, setCreatorName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert('開始日は終了日より前にしてください');
      return;
    }

    if (!title || !creatorName || !startDate || !endDate || !timeUnit) {
      alert('必須項目をすべて入力してください');
      return;
    }

    if (timeRange.start && timeRange.end && timeRange.start >= timeRange.end) {
      alert('開始時間は終了時間より前にしてください');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'schedules'), {
        title,
        description,
        startDate,
        endDate,
        timeRange,
        timeUnit,
        ttl: Number(ttl) || 30,
        creatorName,
        createdAt: serverTimestamp(),
      });
      
    // localStorage に保存
    localStorage.setItem('nickName', creatorName);

    // participants サブコレクションに追加
    await addDoc(collection(db, 'schedules', docRef.id, 'participants'), {
      nickName: creatorName,
      joinedAt: serverTimestamp(),
    });

    // 作成後にページ遷移
    navigate(`/s/${docRef.id}`);
  } catch (error) {
    console.error('スケジュールの作成に失敗しました:', error);
    alert('スケジュールの作成に失敗しました。もう一度お試しください。');
  }
};

  return (
    <div className="create-container">
      <h1 className="create-title">新しいスケジュールを作成</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>
          タイトル（必須）:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          説明（任意）:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          作成者の名前（必須）:
          <input
            type="text"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
            required
          />
        </label>
        <label>
          調整対象期間（必須）:
          <div className="date-range">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <span>～</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </label>
        <label>
          1日の時間範囲（任意）:
          <div className="time-range">
            <select
              value={timeRange.start}
              onChange={(e) =>
                setTimeRange((prev) => ({ ...prev, start: e.target.value }))
              }
            >
              <option value="">開始時間を選択</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i}:00`}>
                  {`${i}:00`}
                </option>
              ))}
            </select>
            <span>～</span>
            <select
              value={timeRange.end}
              onChange={(e) =>
                setTimeRange((prev) => ({ ...prev, end: e.target.value }))
              }
            >
              <option value="">終了時間を選択</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i}:00`}>
                  {`${i}:00`}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label>
          時間単位（必須）:
          <select
            value={timeUnit}
            onChange={(e) => setTimeUnit(e.target.value)}
            required
          >
            <option value="30">30分単位</option>
            <option value="60">1時間単位</option>
          </select>
        </label>
        <label>
          保存期間（TTL）:
          <input
            type="number"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
            min="1"
            max="90"
          />
          <small>この日数が過ぎると自動的に削除されます（デフォルト: 30日）</small>
        </label>
        <button type="submit" className="create-button">
          作成する
        </button>
      </form>
    </div>
  );
}

export default Create;