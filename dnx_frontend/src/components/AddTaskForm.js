import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 20px auto;
  background: #fff;
  padding: 25px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
`;

const FormTitle = styled.h3`
  margin-bottom: 20px;
  color: #111827;
  font-weight: 700;
`;

const FormField = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  color: #111827;

  &:focus {
    outline: none;
    border-color: #4f46e5;
  }
`;

const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #4338ca;
  }
`;

const Message = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: ${props => (props.error ? 'red' : 'green')};
`;

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [progress, setProgress] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMessage('Title is required');
      return;
    }
    try {
      const newTask = {
        title,
        progress: Number(progress) || 0,
        timeLeft,
        image
      };
      const res = await axios.post('http://localhost:5000/api/tasks', newTask);
      setMessage('Task added successfully');
      setTitle('');
      setProgress('');
      setTimeLeft('');
      setImage('');
      if (onTaskAdded) {
        onTaskAdded(res.data.task);
      }
    } catch (error) {
      setMessage('Failed to add task');
    }
  };

  return (
    <FormContainer>
      <FormTitle>Add New Task</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Title</Label>
          <Input value={title} onChange={e => setTitle(e.target.value)} required />
        </FormField>
        <FormField>
          <Label>Progress (%)</Label>
          <Input type="number" min="0" max="100" value={progress} onChange={e => setProgress(e.target.value)} />
        </FormField>
        <FormField>
          <Label>Time Left</Label>
          <Input value={timeLeft} onChange={e => setTimeLeft(e.target.value)} />
        </FormField>
        <FormField>
          <Label>Image URL</Label>
          <Input value={image} onChange={e => setImage(e.target.value)} />
        </FormField>
        <Button type="submit">Add Task</Button>
      </form>
      {message && <Message error={message.includes('Failed')}>{message}</Message>}
    </FormContainer>
  );
};

export default AddTaskForm;
