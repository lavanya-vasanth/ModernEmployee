'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getEmployees, saveEmployees } from '../../../utils/employeesStorage';

export default function AdminDashboard() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter(emp => emp.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="header-container">
        <h1>Admin Dashboard</h1>
        <Link href="/admin/create">
          <button className="create-btn">Create Employee</button>
        </Link>
      </div>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            <Image
              src={emp.photo}
              alt={`Photo of ${emp.name}`}
              width={100}
              height={100}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              unoptimized
            />
            <div><strong>{emp.name}</strong></div>
            <div className="id">ID: {emp.id}</div>
            <div className="role">{emp.role}</div>
            <div className="email">{emp.email}</div>
            <Link href={`/admin/update?id=${emp.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(emp.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
