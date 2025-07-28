'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEmployees, saveEmployees } from '../../../utils/employeesStorage';

export default function CreateEmployee() {
  const router = useRouter();
  const [form, setForm] = useState({ id: '', name: '', role: '', email: '', photo: '' });
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photo: reader.result }));
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.id || !form.name || !form.role || !form.email || !form.photo) {
      alert('Please fill all fields');
      return;
    }
    const updated = [...getEmployees(), form];
    saveEmployees(updated);
    router.push('/admin/dashboard');
  };

  return (
    <div className="create-employee">
      <h1>Create Employee</h1>
      <input placeholder="ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
      <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="Preview" className="preview" />}
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
}
