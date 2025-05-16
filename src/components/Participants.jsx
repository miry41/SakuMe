import React, { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';

function Participants({ scheduleId }) {
  const [nickNames, setNickNames] = useState([]);

  const getNickNames = async () => {
    const participantsRef = collection(db, 'schedules', scheduleId, 'participants');
    const querySnapshot = await getDocs(participantsRef);

    const names = querySnapshot.docs
      .map(doc => doc.data().nickName)
      .filter(nick => nick !== undefined);

    setNickNames(names); 
  };

  useEffect(() => {
    if (scheduleId) {
      getNickNames();
    }
  }, [scheduleId]);

  const handleAddParticipant = async () => {
    const newNickName = prompt('参加者の名前を入力してください');
    if (newNickName) {
      try {
        await addDoc(collection(db, 'schedules', scheduleId, 'participants'), {
          nickName: newNickName,
          joinedAt: serverTimestamp(),
        });
        setNickNames((prev) => [...prev, newNickName]);
      } catch (error) {
        console.error('参加者の追加に失敗しました:', error);
      }
    }
  };

  // リストアイテムをクリックしたときに発火する関数
  const handleNickNameClick = (nickName) => {
    console.log(`参加者 ${nickName} がクリックされました`);
    localStorage.setItem('nickName', nickName);
  };

  return (
    <div>
      <h3>
        Participants:
        <button
          className="add-participant-button"
          onClick={handleAddParticipant}
        >
          追加
        </button>
      </h3>
      <ul>
        {nickNames.map((nick, index) => (
          <li
            key={index}
            onClick={() => handleNickNameClick(nick)} // クリックイベントを追加
            style={{ cursor: 'pointer' }} // 見た目をクリック可能に
          >
            {nick}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Participants;
