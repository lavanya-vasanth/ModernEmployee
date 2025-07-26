'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getEmployees, saveEmployees } from '../../../utils/employeesStorage';

export default function UpdateEmployee() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [form, setForm] = useState({ id: '', name: '', role: '', email: '', photo: '' });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const employees = getEmployees();
    const emp = employees.find(e => String(e.id) === String(id));
    if (emp) {
      setForm(emp);
      setPreview(emp.photo);
    } else {
      alert('Employee not found');
      router.push('/admin/dashboard');
    }
  }, [id, router]);

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
    const employees = getEmployees().map(emp => emp.id === form.id ? form : emp);
    saveEmployees(employees);
    router.push('/admin/dashboard');
  };

  return (
    <div className="page-wrapper">
      <div className="update-container">
        <h1>Update Employee</h1>
        <input className="form-input" value={form.id} disabled placeholder="ID" /><br />
        <input
          className="form-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        /><br />
        <input
          className="form-input"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          placeholder="Role"
        /><br />
        <input
          className="form-input"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        /><br />
        <input className="file-input" type="file" accept="image/*" onChange={handleFileChange} /><br />
        {preview && (
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            className="preview-img"
            unoptimized
          />
        )}<br />
        <button onClick={handleSubmit}>Update</button>
      </div>
    </div>
  );
}
