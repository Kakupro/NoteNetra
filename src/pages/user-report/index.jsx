import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AppIcon from '../../components/AppIcon';

const UserReportPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) {
          setError('Missing user id');
          setLoading(false);
          return;
        }
        const ref = doc(db, 'users', userId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUser({ id: snap.id, ...snap.data() });
        } else {
          setError('User not found');
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading user details...</div>;
  }
  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 pt-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">User Details</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <AppIcon name="ArrowLeft" className="mr-2" /> Back
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="text-foreground break-all">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{user.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-foreground">{user.displayName || user.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="text-foreground">{user.role || 'user'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">CIBIL Score</p>
                <p className="text-foreground">{user.cibilScore ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shop Address</p>
                <p className="text-foreground">{user.shopAddress || 'N/A'}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-muted-foreground">About Business</p>
                <p className="text-foreground whitespace-pre-wrap">{user.aboutBusiness || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Created At</p>
                <p className="text-foreground">{user.createdAt?.toDate ? user.createdAt.toDate().toLocaleString() : (user.createdAt || 'N/A')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="outline" disabled={!user.email} onClick={() => window.location.href = `mailto:${user.email}`}>
              <AppIcon name="Mail" className="mr-2" /> Contact
            </Button>
            <Button className="w-full" variant="outline" onClick={() => navigate(`/dashboard/user-profile/${user.id}`)}>
              <AppIcon name="User" className="mr-2" /> View Public Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserReportPage;
