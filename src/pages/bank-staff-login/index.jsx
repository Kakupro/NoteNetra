import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AppIcon from '../../components/AppIcon';
import CustomLogo from '../../components/ui/CustomLogo';

const BankStaffLoginPage = () => {
  const [email, setEmail] = useState('killnoymous@gmail.com');
  const [password, setPassword] = useState('Kaku@009');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const CONFIGURED_ADMIN_EMAIL = 'killnoymous@gmail.com';

  // If already signed in and has admin role, redirect to /admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        const isConfiguredAdmin = (user.email?.toLowerCase() === CONFIGURED_ADMIN_EMAIL);
        if ((snap.exists() && snap.data().role === 'admin') || isConfiguredAdmin) {
          navigate('/admin', { replace: true });
        }
      } catch (_) {
        // ignore
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const isConfiguredAdminInput = (normalizedEmail === CONFIGURED_ADMIN_EMAIL);
      let signedInUser;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
        signedInUser = userCredential.user;
      } catch (err) {
        if (err.code === 'auth/user-not-found') {
          // Seed ONLY the configured admin account if it doesn't exist
          if (isConfiguredAdminInput) {
            const created = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
            signedInUser = created.user;
            await setDoc(doc(db, 'users', signedInUser.uid), {
              email: signedInUser.email,
              role: 'admin',
              createdAt: new Date(),
              displayName: signedInUser.email?.split('@')[0] || null,
            });
          } else {
            throw err; // do not auto-create admins for other emails
          }
        } else {
          throw err;
        }
      }

      const userDocRef = doc(db, 'users', signedInUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        const isConfiguredSignedIn = (signedInUser.email?.toLowerCase() === CONFIGURED_ADMIN_EMAIL);
        await setDoc(
          userDocRef,
          { email: signedInUser.email, role: isConfiguredSignedIn ? 'admin' : 'user', createdAt: new Date() },
          { merge: true }
        );
      }

      // Ensure the configured admin email always has admin role
      if (signedInUser.email?.toLowerCase() === CONFIGURED_ADMIN_EMAIL) {
        await setDoc(userDocRef, { role: 'admin' }, { merge: true });
      }

      const role = (await getDoc(userDocRef)).data()?.role;
      if (role === 'admin' || signedInUser.email?.toLowerCase() === CONFIGURED_ADMIN_EMAIL) {
        navigate('/admin', { replace: true });
      } else {
        setError('Access Denied: Only bank staff (admins) can log in here.');
        await auth.signOut();
      }
    } catch (err) {
      console.error("Login error:", err.message);
      if (err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many login attempts. Please try again later.');
      } else {
        setError(`Login failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-xl shadow-lg border border-border">
        <div className="text-center">
          <CustomLogo design="custom" showText className="mx-auto h-12 w-auto mb-4" />
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Bank Staff Login
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your admin account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">
              <AppIcon name="AlertCircle" className="inline mr-1" size={16} />
              {error}
            </p>
          )}

          <div>
            <Button
              type="submit"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <AppIcon name="Loader" className="animate-spin mr-2" size={20} />
              ) : (
                <AppIcon name="LogIn" className="mr-2" size={20} />
              )}
              {loading ? 'Logging in...' : 'Sign in as Staff'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankStaffLoginPage;
