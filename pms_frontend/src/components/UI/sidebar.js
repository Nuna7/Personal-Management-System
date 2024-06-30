import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
  return (
    <aside className="sidebar">
      <button className="close-sidebar" onClick={onClose}>×</button>
      <nav>
        <ul className="sidebar-nav">
          <li><Link to="/" onClick={onClose}>Home</Link></li>
          <li><Link to="/analytic" onClick={onClose}>Analytics</Link></li>
          <li><Link to="/news" onClick={onClose}>News</Link></li>
          <li><Link to="/goal" onClick={onClose}>Goal</Link></li>
          <li><Link to="/task" onClick={onClose}>Task</Link></li>
          <li><Link to="/productivity" onClick={onClose}>Productivity</Link></li>
        </ul>
      </nav>
    </aside>
  );
}


export default Sidebar;
