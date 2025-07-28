'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getEmployees, saveEmployees } from '../../../utils/employeesStorage';

function UpdateEmployeeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [form, setForm] = useState({ id: '', name: '', role: '', email: '', photo: '' });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const employees = getEmployees();
    const emp = employees.find((e) => String(e.id) === String(id));
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
    if (!form.name || !form.role || !form.email || !form.photo) {
      alert('Please fill all fields');
      return;
    }
    const employees = getEmployees().map((emp) => (emp.id === form.id ? form : emp));
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
        {preview && <img src={preview} alt="Preview" className="preview-img" />}<br />
        <button onClick={handleSubmit}>Update</button>
      </div>

      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url('/create1.jpg') no-repeat center center/cover;
          background-attachment: fixed;
          padding: 20px;
        }

        .update-container {
          width: 100%;
          max-width: 900px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          text-align: center;
        }

        h1 {
          margin-bottom: 20px;
          color: #333;
          font-size: 2rem;
        }

        .form-input {
          width: 100%;
          height: 50px;
          padding: 10px 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border 0.3s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          border-color: #e11d48;
        }

        .file-input {
          width: 100%;
          margin: 10px 0;
        }

        .preview-img {
          margin-top: 10px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid #eee;
          object-fit: cover;
        }

        button {
          margin-top: 16px;
          padding: 12px 30px;
          background-color: #e11d48;
          color: #fff;
          border: none;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #be123c;
        }

        @media (max-width: 500px) {
          .update-container {
            padding: 20px;
            max-width: 95%;
          }
          .form-input {
            height: 45px;
          }
        }
      `}</style>
    </div>
  );
}

export default function UpdateEmployee() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateEmployeeContent />
    </Suspense>
  );
}
