// utils/employeesStorage.js
const STORAGE_KEY = 'employees';

export function getEmployees() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(employeeData));
        return employeeData;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return employeeData;
    }
  }

  // Return empty array or default data during SSR
  return [];
}

export function saveEmployees(employees) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}
