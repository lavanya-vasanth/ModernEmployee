'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getEmployees, saveEmployees } from '../../../utils/employeesStorage';

export default function UpdateEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({ id: '', name: '', role: '', email: '', photo: '' });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const employees = getEmployees();
    const employee = employees.find(emp => emp.id === id);
    if (employee) {
      setForm(employee);
      setPreview(employee.photo);
    }
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, photo: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = () => {
    if (!form.id || !form.name || !form.role || !form.email || !form.photo) {
      alert('Please fill all fields');
      return;
    }
    const employees = getEmployees();
    const updated = employees.map(emp => (emp.id === id ? form : emp));
    saveEmployees(updated);
    router.push('/admin/dashboard');
  };

  return (
    <div className="update-employee">
      <h1>Update Employee</h1>
      <input placeholder="ID" value={form.id} readOnly />
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="preview" />}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
