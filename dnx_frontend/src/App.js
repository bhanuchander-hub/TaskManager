import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExploreTask from './components/ExploreTask';

const Content = styled.div`
  margin-left: 240px; /* width of Sidebar */
`;

function App() {
  return (
    <Router>
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<ExploreTask />} />
          <Route path="/mentors" element={<div style={{ padding: 20 }}>Mentors page coming soon.</div>} />
          <Route path="/messages" element={<div style={{ padding: 20 }}>Messages page coming soon.</div>} />
          <Route path="/settings" element={<div style={{ padding: 20 }}>Settings page coming soon.</div>} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
