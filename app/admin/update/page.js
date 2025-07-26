// /app/admin/update/page.js (server component)
import React, { Suspense } from 'react';
import UpdateEmployeeClient from './UpdateEmployeeClient';

export default function UpdateEmployeePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateEmployeeClient />
    </Suspense>
  );
}
