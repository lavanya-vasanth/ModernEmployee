// utils/employeesStorage.js
import { employeeData } from '../data/employees';

const STORAGE_KEY = 'employees';

export function getEmployees() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employeeData));
      return employeeData;
    }
  }
  return employeeData; // Fallback during SSR
}

export function saveEmployees(employees) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }
}
