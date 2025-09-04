import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  gap: 20px;
  overflow-x: auto;
`;

const Card = styled.div`
  min-width: 250px;
  background: #f9fafb;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  flex-shrink: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 140px;
  border-radius: 12px;
  object-fit: cover;
`;

const Title = styled.h3`
  font-size: 16px;
  margin: 10px 0 5px;
`;

const Subtitle = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 0 0 10px;
`;

const ProgressBar = styled.div`
  background: #e0e7ff;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 5px;
`;

const Progress = styled.div`
  height: 100%;
  background: #6366f1;
  width: ${props => props.width}%;
  transition: width 0.3s ease;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
`;

const TaskInterface = ({ tasks, title }) => {
  return (
    <section>
      <h2 style={{ marginBottom: '15px' }}>{title}</h2>
      <Container>
        {tasks.map((task, idx) => (
          <Card key={idx}>
            <Image src={task.image} alt={task.title} />
            <Title>{task.title}</Title>
            <Subtitle>{task.subtitle || 'UI/UX Design'}</Subtitle>
            <div>Progress</div>
            <ProgressBar>
              <Progress width={task.progress} />
            </ProgressBar>
            <Footer>
              <div>{task.time || task.timeLeft}</div>
              <div>{task.progress}%</div>
            </Footer>
          </Card>
        ))}
      </Container>
    </section>
  );
};

export default TaskInterface;
