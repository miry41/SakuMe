import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import ErrorPage from './pages/ErrorPage';
import Create from './pages/Create';

const ScheduleWrapper = () => {
  const { scheduleId } = useParams();
  return <SchedulePage scheduleId={scheduleId} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/s/:scheduleId" element={<ScheduleWrapper />} />

        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;