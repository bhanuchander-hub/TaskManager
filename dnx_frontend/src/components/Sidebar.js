import React from 'react';
import styled from 'styled-components';
import { FaHome, FaTasks, FaUsers, FaEnvelope, FaCog } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 210px;
  background-color: #fff;
  height: 100vh;
  box-shadow: 2px 0 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #4f46e5;
  margin-bottom: 40px;
  user-select: none;
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #6b7280;
  font-weight: 600;
  font-size: 16px;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  &.active, &:hover {
    background-color: #eef2ff;
    color: #4f46e5;
  }

  svg {
    margin-right: 12px;
    font-size: 18px;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>DNX</Logo>
      <NavItem to="/" end><FaHome /> Overview</NavItem>
      <NavItem to="/tasks"><FaTasks /> Task</NavItem>
      <NavItem to="/mentors"><FaUsers /> Mentors</NavItem>
      <NavItem to="/messages"><FaEnvelope /> Message</NavItem>
      <NavItem to="/settings"><FaCog /> Settings</NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
