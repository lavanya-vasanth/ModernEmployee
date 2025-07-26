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

      <style jsx>{`
       .create-employee {
         max-width: 800px; 
         height:500px;
         margin: 40px auto;
         padding: 20px 30px;
         background: rgba(255, 255, 255, 0.85);
         border-radius: 12px;
         box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
         text-align: center;
         font-family: 'Poppins', sans-serif;
         width: 100%; 
}


        .create-employee h1 {
          font-size: 1.8rem;
          color: #333;
          margin-bottom: 20px;
        }

        .create-employee input {
          display: block;
          width: 750px;
          height: 50px;
          padding: 10px 12px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .create-employee input:focus {
          outline: none;
          border-color: #ff00a6ff;
        }

        .create-employee .preview {
          margin: 100px ;
          width:100px;
          height: 100px;
          border-radius: 100%;
          border: 2px solid #ddd;
          object-fit: cover;
        }

        .create-employee button {
          background-color: #3bf6f0ff;
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

      `}</style>

      {/* Global styles for body background */}
      <style jsx global>{`
        body {
          background-image: url('/create1.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          min-height: 100vh;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}
