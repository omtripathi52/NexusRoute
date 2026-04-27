import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useLocation } from 'react-router-dom';

export function SignInPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const requestedRedirect = params.get('redirect') || '/port';
  console.log("[SignInPage] Rendering SignIn component");
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#0a0a0a' 
    }}>
      <SignIn 
        routing="path" 
        path="/sign-in" 
        forceRedirectUrl={requestedRedirect}
        fallbackRedirectUrl="/port"
        signUpForceRedirectUrl={requestedRedirect}
        signUpFallbackRedirectUrl="/port"
      />
    </div>
  );
}
