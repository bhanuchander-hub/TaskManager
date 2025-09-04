import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
`;

const Header = styled.header`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Layout = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) 360px;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Card = styled.div`
  background-color: ${props => (props.dark ? '#000' : '#fff')};
  color: ${props => (props.dark ? '#fff' : '#000')};
  padding: 15px;
  border-radius: 8px;
  box-shadow: ${props => (props.dark ? 'none' : '0 2px 4px rgba(0,0,0,0.1)')};
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 80%;
`;

const RunningTaskCard = styled(Card)`
  background: linear-gradient(180deg, #0b1020 0%, #0e1426 100%);
  color: #e5e7eb;
  padding: 18px;

  h2 {
    font-size: 14px;
    font-weight: 600;
    color: #9ca3af;
    margin: 0 0 8px 0;
  }

  .big {
    font-size: 40px;
    font-weight: 700;
    color: #ffffff;
    margin: 0;
  }

  .meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #9ca3af;
    font-size: 12px;
  }
`;

const ActivityCard = styled(Card)`
  padding: 20px;
  h2 {
    font-size: 14px;
    font-weight: 600;
    color: #6b7280;
    margin: 0 0 8px 0;
  }
  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  .badge {
    font-size: 12px;
    background: #eef2ff;
    color: #4f46e5;
    border-radius: 9999px;
    padding: 2px 8px;
    font-weight: 600;
  }
  .chart {
    height: 80px;
    background: linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%);
    border: 1px solid #e5e7eb;
    border-radius: 8px;
  }
`;

const ProgressBar = styled.div`
  background-color: #e0e7ff;
  height: 8px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: ${props => (props.purple ? '#a78bfa' : '#3b82f6')};
  width: ${props => `${Math.min(100, Math.max(0, Number(props.width) || 0))}%`};
`;

const MentorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Grid = styled.div`
  display: grid;
  gap: 20px;
  align-items: stretch;
  grid-template-columns: 1fr;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TwoColGrid = styled.div`
  display: grid;
  gap: 20px;
  align-items: stretch;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const RightRail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CalendarCard = styled(Card)`
  padding: 0;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #eef2ff;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  padding: 16px;
`;

const Day = styled.div`
  background: #f9fafb;
  border-radius: 8px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6b7280;
`;

const HelpCenter = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const Button = styled.button`
  background-color: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
`;

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  const mentorAvatarUrls = [
    'https://i.postimg.cc/JzNzrft6/Post-Design.jpg',
    'https://i.postimg.cc/mDzDst9M/Nailed-it.jpg'
  ];
  const baseMentors = (data.mentors ?? []).map(m => ({ ...m }));
  // Ensure the two featured avatars are always shown first
  let mentorList = baseMentors;
  if (mentorList.length === 0) {
    mentorList = [
      { name: 'Mentor', tasks: 0, rating: 0, reviews: 0, avatar: mentorAvatarUrls[0] },
      { name: 'Mentor', tasks: 0, rating: 0, reviews: 0, avatar: mentorAvatarUrls[1] },
    ];
  } else if (mentorList.length === 1) {
    mentorList[0] = { ...mentorList[0], avatar: mentorList[0].avatar || mentorAvatarUrls[0] };
    mentorList.push({ name: 'Mentor', tasks: 0, rating: 0, reviews: 0, avatar: mentorAvatarUrls[1] });
  } else {
    mentorList = mentorList.map((m, idx) => {
      if (idx === 0) return { ...m, avatar: m.avatar || mentorAvatarUrls[0] };
      if (idx === 1) return { ...m, avatar: m.avatar || mentorAvatarUrls[1] };
      return m;
    });
  }

  return (
    <Container>
      <Header>Hi, Chandu Sai! Let's finish your task today!</Header>
      <Layout>
        <div>
          <Grid>
           
            <RunningTaskCard>
              <h2>Running Task</h2>
              <p className="big">{data.runningTask?.count ?? 0}</p>
              <div className="meta">
                <span>{data.runningTask?.progress ?? 0}%</span>
                <span>100 Task</span>
              </div>
              <div style={{ height: 80 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={(data.runningTask && data.runningTask.history) || [
                    { name: 'S', value: 40 },
                    { name: 'M', value: 65 },
                    { name: 'T', value: 50 },
                    { name: 'W', value: 70 },
                    { name: 'T', value: 55 },
                    { name: 'F', value: 75 },
                    { name: 'S', value: 60 }
                  ]}>
                    <YAxis hide domain={[0, 100]} />
                    <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1f2937', color: '#e5e7eb' }} cursor={{ stroke: '#1f2937' }} />
                    <Line type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </RunningTaskCard>

          
            <ActivityCard>
              <div className="toolbar">
                <h2>Activity</h2>
                <span className="badge">This Week</span>
              </div>
              <div className="chart" style={{ height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={(data.activity && data.activity.history) || [
                    { name: 'S', value: 1 },
                    { name: 'M', value: 3 },
                    { name: 'T', value: 2 },
                    { name: 'W', value: 4 },
                    { name: 'T', value: 3 },
                    { name: 'F', value: 3 },
                    { name: 'S', value: 2 }
                  ]}>
                    <YAxis hide />
                    <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </ActivityCard>
          </Grid>
  
          
          <Section>
            <h2>Monthly Mentors</h2>
            <TwoColGrid>
              {mentorList?.map((mentor, idx) => (
                <MentorCard key={idx}>
                  {mentor.avatar ? (
                    <img src={mentor.avatar} alt={mentor.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#d1d5db', borderRadius: '50%' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{mentor.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{mentor.tasks} Task</p>
                    <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>{mentor.rating} ★ ({mentor.reviews} Reviews)</p>
                  </div>
                  <Button style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}>+ Follow</Button>
                </MentorCard>
              ))}
            </TwoColGrid>
          </Section>

         
          <Section>
            <h2>Upcoming Task</h2>
            <TwoColGrid>
              {data.upcomingTasks?.map((task, idx) => (
                <Card key={idx}>
                  <img
                    src={task.image || `https://picsum.photos/seed/${encodeURIComponent(task.title || idx)}/400/240`}
                    alt="Task"
                    style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '6px' }}
                  />
                  <p>{task.title}</p>
                  <ProgressBar>
                    <Progress width={Number(task.progress) || 0} purple />
                  </ProgressBar>
                  <p>{Number(task.progress) || 0}%</p>
                  <p>{task.timeLeft}</p>
                </Card>
              ))}
            </TwoColGrid>
          </Section>

      
          <HelpCenter>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#111827', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: 12 }}>?</div>
            <p style={{ margin: '0 0 4px 0', fontWeight: 600 }}>Help Center</p>
            <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: 12 }}>Having trouble in learning, please contact us for more questions.</p>
            <Button>Go To Help Center</Button>
          </HelpCenter>
        </div>

        
        <RightRail>
        
          <CalendarCard>
            <CalendarHeader>
              <span style={{ fontWeight: 700 }}>July 2022</span>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button style={{ background: '#eef2ff', color: '#4f46e5' }}>{'<'}</Button>
                <Button style={{ background: '#eef2ff', color: '#4f46e5' }}>{'>'}</Button>
              </div>
            </CalendarHeader>
            <CalendarGrid>
              {[...Array(28)].map((_, i) => (
                <Day key={i}>{i + 1}</Day>
              ))}
            </CalendarGrid>
          </CalendarCard>

        
          <Card>
            <h2>Task Today</h2>
            {data.taskToday?.image ? (
              <img src={data.taskToday.image} alt="Task" style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '6px' }} onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://picsum.photos/seed/tasktoday/600/400'; }} />
            ) : (
              <img src={'https://picsum.photos/seed/tasktoday/600/400'} alt="Task" style={{ width: '100%', height: '128px', objectFit: 'cover', borderRadius: '6px' }} />
            )}
            <p style={{ margin: 0 }}>{data.taskToday?.title ?? '—'}</p>
            <ProgressBar>
              <Progress width={data.taskToday?.progress ?? 0} />
            </ProgressBar>
            <p style={{ margin: 0 }}>{data.taskToday?.progress ?? 0}%</p>
            <p style={{ margin: 0 }}>{data.taskToday?.time ?? ''}</p>
          </Card>

          
          <Card>
            <h2>Detail Task</h2>
            <p>{data.detailTask}</p>
            <Button>Go To Detail</Button>
          </Card>
        </RightRail>
      </Layout>
    </Container>
  );
};

export default Dashboard;