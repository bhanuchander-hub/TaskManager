import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AddTaskForm from './AddTaskForm';

const Container = styled.div`
  padding: 30px 40px;
  background-color: #f5f7fa;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #111827;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #374151;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(220px,1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskImage = styled.img`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 15px;
`;

const TaskTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #111827;
  margin-bottom: 12px;
  text-align: center;
`;

const ProgressBarContainer = styled.div`
  background-color: #e0e7ff;
  border-radius: 12px;
  width: 100%;
  height: 12px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  background-color: ${props => (props.purple ? '#a78bfa' : '#3b82f6')};
  width: ${props => props.width}%;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.p`
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 6px;
`;

const TimeText = styled.p`
  font-size: 12px;
  color: #9ca3af;
`;

const ExploreTask = () => {
  const [data, setData] = useState({ timeLimit: [], newTasks: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('http://localhost:5000/api/tasks');
      setData(res.data.exploreTasks || { timeLimit: [], newTasks: [] });
    } catch (e) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskAdded = async (newTask) => {
    // Optimistic update
    setData(prev => ({ ...prev, newTasks: [newTask, ...(prev.newTasks || [])] }));
    // Re-fetch to ensure backend consistency (since backend prepends)
    loadTasks();
  };

  return (
    <Container>
      <Header>Explore Task</Header>

      <AddTaskForm onTaskAdded={handleTaskAdded} />

      {loading && <div>Loading tasks…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <Section>
        <SectionTitle>Time Limit</SectionTitle>
        <Grid>
          {(data.timeLimit || []).map((task, idx) => (
            <Card key={idx}>
              <TaskImage src={task.image || `https://picsum.photos/200/300?random=${idx}`} alt="Task" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://picsum.photos/seed/tl${idx}/400/240`; }} />
              <TaskTitle>{task.title}</TaskTitle>
              <ProgressBarContainer>
                <ProgressBar width={task.progress} />
              </ProgressBarContainer>
              <ProgressText>{task.progress}%</ProgressText>
              <TimeText>{task.time}</TimeText>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section>
        <SectionTitle>New Task</SectionTitle>
        <Grid>
          {(data.newTasks || []).map((task, idx) => (
            <Card key={idx}>
              {task.image ? (
                <TaskImage src={task.image} alt="Task" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://picsum.photos/seed/new${idx}/400/240`; }} />
              ) : (
                <div style={{ width: '100%', height: 140, background: '#e5e7eb', borderRadius: 12, marginBottom: 15 }} />
              )}
              <TaskTitle>{task.title}</TaskTitle>
              <ProgressBarContainer>
                <ProgressBar width={task.progress} purple />
              </ProgressBarContainer>
              <ProgressText>{task.progress}%</ProgressText>
              <TimeText>{task.timeLeft}</TimeText>
            </Card>
          ))}
        </Grid>
      </Section>
    </Container>
  );
};

export default ExploreTask;
