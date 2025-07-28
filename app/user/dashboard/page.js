'use client';
import { useEffect, useState } from 'react';
import { getEmployees } from '../../../utils/employeesStorage';

export default function UserDashboard() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />

      <ul>
        {filteredEmployees.length > 0 ? (
          filteredEmployees.map((emp) => (
            <li key={emp.id} className="employee-card">
              <img
                src={emp.photo}
                alt={`Photo of ${emp.name}`}
                width={100}
                height={100}
                className="employee-photo"
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="employee-info">
                <strong>{emp.name}</strong>
                <div>ID: {emp.id}</div>
                <div>{emp.role}</div>
                <div>{emp.email}</div>
              </div>
            </li>
          ))
        ) : (
          <li>No employees found.</li>
        )}
      </ul>
    </div>
  );
}