import Link from 'next/link';
import React from 'react'

async function Home() {
  const user = false;
  return (
    <div className='max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6 text-white'>Team Access Control Demo</h1>
      <p className='text-slate-300 mb-8'>
        This demo showcases Next.js 16 access control features with role-based permissions.
      </p>
      <div className='grid md: grid-cols-2 gap-6 mb-8'>
        <div className='bg-slate-800 p-6 border border-slate-700 rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>Features Demonstrated</h3>
          <ul className='list-disc list-inside space-y-1 text-sm text-slate-300'>
            <li>Role-based access control (RBC)</li>
            <li>Route protection with middleware</li>
            <li>Server-side permission checks</li>
            <li>Client-side permission hooks</li>
            <li>Dynamic route access</li>
          </ul>
        </div>
        <div className='bg-slate-800 p-6 border border-slate-700 rounded-lg'>
          <h3 className='font-semibold mb-3 text-white'>User Roles</h3>
          <ul className='list-disc list-inside space-y-1 text-sm text-slate-300'>
            <li><strong className='text-purple-400'>Super Admin: </strong>Full system access</li>
            <li><strong className='text-green-400'>Admin: </strong>User & team management</li>
            <li><strong className='text-yellow-400'>Manager: </strong>Team specific management</li>
            <li><strong className='text-blue-400'>User: </strong>Basic dashboard</li>
          </ul>
        </div>
      </div>
      {
        user ? (
          <div className='bg-green-900/30 border border-green-600 rounded-lg p-4'>
            <p className='text-green-300'>Welcome back, <strong>Bishal</strong>! you aer logged in as{" "}<strong className='text-green-200'>USER</strong></p>
            <Link href="/dashboard" className='inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>Go to Dashboard</Link>
          </div>
        ) : (
          <div className='bg-blue-900/30 border border-blue-600 rounded-lg p-4'>
            <p className='text-slate-300 mb-3'>You are not logged in.</p>
            <div className='space-x-3'>
              <Link href="/login" className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'>Login</Link>
              <Link href="/register" className='px-4 py-2 border border-slate-600 text-slate-300 rounded hover:bg-slate-700 transition-colors'>Register</Link>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Home;