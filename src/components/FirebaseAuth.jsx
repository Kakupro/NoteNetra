import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const FirebaseAuth = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          createdAt: new Date(),
          displayName: user.email.split('@')[0]
        });
      } else {
        // Sign in
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary">
        <h2 className="text-2xl font-bold mb-4 text-green-400">Welcome!</h2>
        <p className="mb-4 text-dark-text-secondary">You are signed in as: <strong className="text-dark-text-primary">{user.email}</strong></p>
        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 text-dark-text-primary py-2 px-4 rounded hover:bg-red-700 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary">
      <h2 className="text-2xl font-bold mb-6 text-center text-dark-text-primary">
        {isSignUp ? 'Create Account' : 'Sign In'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-500/50 text-red-400 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-text-secondary mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-dark-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent-primary bg-dark-bg-input text-dark-text-primary"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-dark-text-secondary mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-dark-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent-primary bg-dark-bg-input text-dark-text-primary"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-dark-accent-primary text-dark-text-primary py-2 px-4 rounded hover:bg-dark-accent-hover transition-colors"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-dark-accent-primary hover:text-dark-accent-hover text-sm transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default FirebaseAuth;
