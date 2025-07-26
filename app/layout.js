import './globals.css';
import { EmployeesProvider } from '../utils/EmployeesContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EmployeesProvider>{children}</EmployeesProvider>
      </body>
    </html>
  );
}
