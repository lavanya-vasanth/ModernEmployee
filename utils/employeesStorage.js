const STORAGE_KEY = 'employees';

// Define some default employee data if you want, otherwise use empty array
const defaultEmployees = [
  // Example default employee, or leave empty []
   {
    id: '1',
    name: 'John Doe',
   role: 'Developer',
    email: 'john@example.com',
     photo: '/Dhana.jpg'
   }
];

export function getEmployees() {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        // If nothing in localStorage, set defaultEmployees as initial data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEmployees));
        return defaultEmployees;
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      return defaultEmployees;
    }
  }

  // During SSR (server), return empty array or default
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
