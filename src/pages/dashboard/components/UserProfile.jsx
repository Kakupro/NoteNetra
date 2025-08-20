import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import AppIcon from '../../../components/AppIcon';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase';
import { collection, query, where, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';
import Input from '../../../components/ui/Input';
import { updateEmail, updatePassword, updateProfile, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser] = useAuthState(auth);
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState({});
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [reauthError, setReauthError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        // If no userId in params, assume it's the current user's profile for account settings
        if (currentUser) {
          setUserProfile({ id: currentUser.uid, email: currentUser.email, displayName: currentUser.displayName });
          setEditableProfile({ displayName: currentUser.displayName, email: currentUser.email });
          setLoading(false);
        } else {
          navigate('/login-page'); // Redirect if no user and no userId
        }
        return;
      }

      try {
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setUserProfile(data);
          setEditableProfile(data);
          setNewEmail(data.email || ''); // Initialize newEmail with current email
        } else {
          setError("User not found.");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, currentUser, navigate]);

  const handlePersonalMessage = async () => {
    if (!currentUser || !userProfile) return;

    const participants = [currentUser.uid, userProfile.id].sort();
    const existingChatQuery = query(
      collection(db, 'chats'),
      where('participants', '==', participants)
    );

    const querySnapshot = await getDocs(existingChatQuery);

    let chatId;
    if (!querySnapshot.empty) {
      chatId = querySnapshot.docs[0].id;
    } else {
      const newChatRef = await addDoc(collection(db, 'chats'), {
        participants: participants,
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
        lastMessageText: '',
      });
      chatId = newChatRef.id;
    }

    navigate(`/dashboard/private-chat/${chatId}`);
  };

  const reauthenticate = async () => {
    if (!currentUser || !currentPassword) {
      setReauthError("Please enter your current password.");
      return false;
    }
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, credential);
      setReauthError(null);
      return true;
    } catch (err) {
      console.error("Reauthentication error:", err);
      setReauthError("Incorrect current password. Please try again.");
      return false;
    }
  };

  const handleEditProfile = async () => {
    if (!currentUser) return;
    setIsEditing(true);
    setEmailVerificationSent(false);
    setVerificationError(null);
    setReauthError(null);
  };

  const handleSaveProfile = async () => {
    if (!currentUser || !userProfile) return;

    setReauthError(null);
    let needsReauth = false;

    if (newEmail && newEmail !== currentUser.email) {
      needsReauth = true;
    }
    if (newPassword) {
      needsReauth = true;
    }

    if (needsReauth) {
      const reauthenticated = await reauthenticate();
      if (!reauthenticated) {
        return;
      }
    }

    try {
      // Update Firestore document
      const userDocRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userDocRef, {
        displayName: editableProfile.displayName || null,
        shopAddress: editableProfile.shopAddress || null,
        aboutBusiness: editableProfile.aboutBusiness || null,
      });

      // Update Firebase Auth profile
      if (editableProfile.displayName && editableProfile.displayName !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: editableProfile.displayName });
      }
      if (newEmail && newEmail !== currentUser.email) {
        await updateEmail(currentUser, newEmail);
        setEmailVerificationSent(true); // Email changed, likely needs re-verification
        alert("Email updated! A verification email has been sent to your new address. Please verify it.");
      }
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
        alert("Password updated successfully!");
        setNewPassword(''); // Clear password field after successful update
        setCurrentPassword(''); // Clear current password
      }

      // Refresh current user state
      // await currentUser.reload(); // Not needed if useAuthState updates automatically or we navigate away

      setUserProfile(editableProfile); // Update display with new data from editable profile
      setIsEditing(false); // Exit edit mode
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile. " + err.message);
      if (err.code === 'auth/requires-recent-login') {
        setReauthError("This operation requires a recent login. Please log in again and retry.");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditableProfile(userProfile); // Revert changes
    setNewEmail(userProfile.email || ''); // Revert new email
    setNewPassword(''); // Clear new password
    setCurrentPassword(''); // Clear current password
    setIsEditing(false); // Exit edit mode
    setEmailVerificationSent(false); // Reset verification state
    setVerificationError(null);
    setReauthError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setNewEmail(value);
    } else if (name === 'password') {
      setNewPassword(value);
    } else if (name === 'currentPassword') {
      setCurrentPassword(value);
    } else {
      setEditableProfile(prev => ({ ...prev, [name]: value }));
    }
  };

  const pageTitle = (currentUser && userId === currentUser.uid) ? 'Account Settings' : 'User Profile';

  if (loading) {
    return <div className="flex items-center justify-center h-full text-foreground">Loading profile...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-full text-destructive">{error}</div>;
  }

  if (!userProfile) {
    return <div className="flex items-center justify-center h-full text-muted-foreground">No profile data.</div>;
  }

  const isCurrentUserProfile = currentUser && currentUser.uid === userProfile.id;

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {pageTitle}
            {isCurrentUserProfile && !isEditing && (
              <Button onClick={handleEditProfile}>
                <AppIcon name="Edit" className="mr-2" />
                Edit Profile
              </Button>
            )}
            {isCurrentUserProfile && isEditing && (
                <div className="flex space-x-2">
                    <Button variant="secondary" onClick={handleCancelEdit}>
                        Cancel
                    </Button>
                    <Button onClick={handleSaveProfile}>
                        Save Changes
                    </Button>
                </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {reauthError && (
                <div className="text-destructive text-sm">{reauthError}</div>
            )}
            {emailVerificationSent && verificationError && (
                <div className="text-destructive text-sm">{verificationError}</div>
            )}
            {emailVerificationSent && !verificationError && (
                <div className="text-green-500 text-sm">A verification email has been sent. Please check your inbox and click the link.</div>
            )}
            {isCurrentUserProfile && !currentUser?.emailVerified && !emailVerificationSent && (
                <div className="text-yellow-500 text-sm">
                    Your email address is not verified. Please verify to enable all account features.
                    <Button variant="link" onClick={handleEditProfile} className="ml-2 p-0 h-auto text-sm">
                        Verify Email
                    </Button>
                </div>
            )}
            {isCurrentUserProfile && emailVerificationSent && (
                <Button onClick={handleEditProfile} className="mt-2">
                    <AppIcon name="RefreshCw" className="mr-2" />
                    Re-send Verification Email
                </Button>
            )}
          <div>
            <p className="font-semibold">Username:</p>
            {isEditing ? (
                <Input
                    type="text"
                    name="displayName"
                    value={editableProfile.displayName || ''}
                    onChange={handleChange}
                    className="w-full"
                />
            ) : (
                <p>{userProfile.displayName || 'N/A'}</p>
            )}
          </div>
          <div>
            <p className="font-semibold">Email Address:</p>
            {isEditing ? (
                <Input
                    type="email"
                    name="email"
                    value={newEmail}
                    onChange={handleChange}
                    className="w-full"
                />
            ) : (
                <p>{userProfile.email}</p>
            )}
          </div>
          {isCurrentUserProfile && isEditing && (
            <>
                <div>
                    <p className="font-semibold">New Password:</p>
                    <Input
                        type="password"
                        name="password"
                        value={newPassword}
                        onChange={handleChange}
                        placeholder="Leave blank to keep current password"
                        className="w-full"
                    />
                </div>
                {(newEmail !== currentUser.email || newPassword) && (
                <div>
                    <p className="font-semibold">Current Password (required for email/password change):</p>
                    <Input
                        type="password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={handleChange}
                        className="w-full"
                    />
                </div>
                )}
            </>
          )}
          <div>
            <p className="font-semibold">Shop Address:</p>
            {isEditing ? (
                <Input
                    type="text"
                    name="shopAddress"
                    value={editableProfile.shopAddress || ''}
                    onChange={handleChange}
                    className="w-full"
                />
            ) : (
                <p>{userProfile.shopAddress || 'Not provided'}</p>
            )}
          </div>
          <div>
            <p className="font-semibold">About Business:</p>
            {isEditing ? (
                <Input
                    type="text"
                    name="aboutBusiness"
                    value={editableProfile.aboutBusiness || ''}
                    onChange={handleChange}
                    className="w-full"
                />
            ) : (
                <p>{userProfile.aboutBusiness || 'Not provided'}</p>
            )}
          </div>
          {!isCurrentUserProfile && (
            <div className="mt-6">
              <Button onClick={handlePersonalMessage}>
                <AppIcon name="MessageCircle" className="mr-2" />
                Message Personally
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
