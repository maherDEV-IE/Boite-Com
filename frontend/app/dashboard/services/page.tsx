'use client';

import { DashboardServices } from '@/components/dashboard/services';

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Services</h1>
      <DashboardServices />
    </div>
  );
} 