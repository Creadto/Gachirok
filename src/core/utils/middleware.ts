import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { signIn } from 'next-auth/react';
import { cookies } from 'next/headers';
 // Adjust the path according to your structure

export async function middleware(req: Request) {
    const cookieStore = cookies();
    const csrfToken = cookieStore.get('next-auth.csrf-token')?.value;

  // Check if the session exists
  if (!csrfToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next(); // Continue to the requested resource
}

// Specify the paths for which this middleware should run
export const config = {
  matcher: ['/api/auth/token'], // Apply this middleware to the token route
};