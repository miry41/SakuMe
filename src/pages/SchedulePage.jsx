import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import ScheduleHeader from '../components/ScheduleHeader';
import Calendar from '../components/Calendar'; // 新しいコンポーネントをインポート
import Participants from '../components/Participants';

import '../styles/SchedulePage.css'; // 自作スタイル用

const SchedulePage = ({ scheduleId }) => {
  const navigate = useNavigate();
  const [scheduleData, setScheduleData] = useState(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const scheduleRef = doc(db, 'schedules', scheduleId);
        const docSnap = await getDoc(scheduleRef);

        if (!docSnap.exists() || docSnap.data().deleted) {
          navigate('/error');
        } else {
          setScheduleData(docSnap.data());
        }
      } catch (e) {
        navigate('/error');
      }
    };

    fetchSchedule();
  }, [scheduleId, navigate]);

  if (!scheduleData) return <p>読み込み中...</p>;

  const { title, description, creatorName, startDate, endDate } = scheduleData;

  const calendarEvents = [
    {
      title: '調整対象期間',
      start: startDate,
      end: new Date(new Date(endDate).getTime() + 86400000).toISOString().split('T')[0],
      display: 'background',
      backgroundColor: '#d0f0fd',
    },
  ];

  return (
    <div className="schedule-page">
      {/* ヘッダー部分 */}
      <ScheduleHeader
        title={title}
        creatorName={creatorName}
        description={description}
        showDescription={showDescription}
        setShowDescription={setShowDescription}
      />

      {/* カレンダー部分 */}
      <Calendar startDate={startDate} calendarEvents={calendarEvents} />

      {/* イベント参加者リスト */}
      <Participants scheduleId={scheduleId} />
    </div>
  );
};

export default SchedulePage;
