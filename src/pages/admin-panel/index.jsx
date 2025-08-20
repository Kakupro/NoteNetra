import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import AppIcon from '../../components/AppIcon';

const AdminPanel = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          const emailIsConfiguredAdmin = (user.email === 'killnoymous@gmail.com');
          if ((userDocSnap.exists() && userDocSnap.data().role === 'admin') || emailIsConfiguredAdmin) {
            setIsAdmin(true);
            fetchUsers();
          } else {
            setIsAdmin(false);
            setLoading(false);
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          setError("Failed to check admin status.");
          setLoading(false);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersCollectionRef = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(u => 
    u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading Admin Panel...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500 text-lg">Error: {error}</div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-2xl text-red-600">
        <AppIcon name="AlertTriangle" size={48} className="mb-4" />
        Access Denied: You do not have administrator privileges.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8 pt-24">
      <h1 className="text-3xl font-bold text-foreground mb-8">Admin Panel</h1>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search by name, email, or user ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <Card key={u.id} className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{u.displayName || u.email?.split('@')[0] || 'N/A'}</h2>
                <p className="text-sm text-muted-foreground"><strong>User ID:</strong> {u.id}</p>
                <p className="text-sm text-muted-foreground"><strong>Email:</strong> {u.email || 'N/A'}</p>
                <p className="text-sm text-muted-foreground"><strong>CIBIL Score:</strong> {u.cibilScore || 'N/A'}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.location.href = `mailto:${u.email}`}
                  disabled={!u.email}
                >
                  <AppIcon name="Mail" className="mr-2" />
                  Contact
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => window.location.href = `/admin/user/${u.id}`}
                >
                  <AppIcon name="Eye" className="mr-2" />
                  View Details
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;