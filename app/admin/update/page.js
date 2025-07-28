'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getEmployees, saveEmployees } from '../../../utils/employeesStorage';

export default function UpdateEmployee({ searchParams }) {
  const router = useRouter();
  const id = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('id') 
    : null;

  const [form, setForm] = useState({ id: '', name: '', role: '', email: '', photo: '' });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!id) return;
    const employees = getEmployees();
    const employee = employees.find((e) => e.id === id);
    if (employee) {
      setForm(employee);
      setPreview(employee.photo);
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, photo: reader.result });
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const employees = getEmployees();
    const updated = employees.map((emp) => (emp.id === id ? form : emp));
    saveEmployees(updated);
    router.push('/admin/dashboard');
  };

  return (
    <div className="container">
      <h1>Update Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="id" value={form.id} onChange={handleChange} placeholder="ID" required />
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="role" value={form.role} onChange={handleChange} placeholder="Role" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Preview" width={100} height={100} />}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
