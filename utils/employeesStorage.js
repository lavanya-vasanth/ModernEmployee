// utils/employeesStorage.js
const STORAGE_KEY = 'employees';

const defaultEmployees = [
  {
    id: '1',
    name: 'John Doe',
    role: 'Developer',
    email: 'john@example.com',
    photo: '/Dhana.jpg', // make sure this image is inside the 'public' folder
  },
];

export function getEmployees() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEmployees));
        return defaultEmployees;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return defaultEmployees;
    }
  }
  // For SSR return empty array
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
