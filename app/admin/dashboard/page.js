// app/admin/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';          // Import Image component
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
      <h1>Admin Dashboard</h1>
      <Link href="/admin/create">
        <button>Create Employee</button>
      </Link>

      <ul>
        {employees.map(emp => (
          <li key={emp.id} style={{ marginBottom: '20px' }}>
            <Image
              src={emp.photo}
              alt={`Photo of ${emp.name}`}
              width={100}
              height={100}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
            />
            <div><strong>{emp.name}</strong></div>
            <div>ID: {emp.id}</div>
            <div>{emp.role}</div>
            <div>{emp.email}</div>
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
