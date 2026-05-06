import React, { useEffect, useState } from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

export function SignInPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedRedirect = params.get('redirect') || '/port';
  const redirectTarget = requestedRedirect.startsWith('/') && !requestedRedirect.startsWith('//')
    ? requestedRedirect
    : '/port';
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowFallback(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  console.log("[SignInPage] Rendering SignIn component");
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 80px)', 
      width: '100%',
      padding: '24px',
      backgroundColor: '#0a0a0a' 
    }}>
      {!showFallback ? (
        <SignIn 
          routing="path" 
          path="/sign-in" 
          forceRedirectUrl={redirectTarget}
          fallbackRedirectUrl="/port"
          signUpForceRedirectUrl={redirectTarget}
          signUpFallbackRedirectUrl="/port"
        />
      ) : (
        <div style={{
          maxWidth: '420px',
          width: '100%',
          padding: '24px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.12)',
          background: 'rgba(10, 10, 10, 0.92)',
          color: '#fff',
          boxShadow: '0 24px 80px rgba(0,0,0,0.45)'
        }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem', marginBottom: '8px' }}>Sign in to NexusRoute</h1>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
            If the Clerk sign-in widget does not load, check that the Vercel environment has a valid
            <strong> VITE_CLERK_PUBLISHABLE_KEY</strong> and that the app domain is allowed in Clerk.
          </p>
        </div>
      )}
    </div>
  );
}
