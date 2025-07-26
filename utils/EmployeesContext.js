'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { employeeData } from '../data/employees';

const EmployeesContext = createContext(null);

export function EmployeesProvider({ children }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('employees');
    if (stored) {
      setEmployees(JSON.parse(stored));
    } else {
      setEmployees(employeeData); 
    }
  }, []);

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees]);

  const create = (newEmp) => {
    setEmployees((prev) => [...prev, newEmp]);
  };

  const update = (updatedEmp) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === updatedEmp.id ? updatedEmp : emp))
    );
  };

  const remove = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  return (
    <EmployeesContext.Provider value={{ employees, create, update, remove }}>
      {children}
    </EmployeesContext.Provider>
  );
}

export function useEmployees() {
  const context = useContext(EmployeesContext);
  if (!context) throw new Error('useEmployees must be used inside EmployeesProvider');
  return context;
}
