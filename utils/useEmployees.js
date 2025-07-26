/*'use client';

import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const EmployeesContext = createContext(null);
const STORAGE_KEY = 'employees';

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setEmployees(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const value = useMemo(
    () => ({
      employees,
      create: (emp) => setEmployees((prev) => [...prev, emp]),
      update: (emp) =>
        setEmployees((prev) =>
          prev.map((e) => (String(e.id) === String(emp.id) ? emp : e))
        ),
      remove: (id) =>
        setEmployees((prev) => prev.filter((e) => String(e.id) !== String(id))),
    }),
    [employees]
  );

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const ctx = useContext(EmployeesContext);
  if (!ctx) throw new Error('useEmployees must be used inside EmployeesProvider');
  return ctx;
}
*/