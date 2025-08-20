import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import FirebaseAuth from '../../components/FirebaseAuth';
import { 
  db, 
  storage, 
  functions, 
  messaging, 
  analytics, 
  remoteConfig, 
  performance 
} from '../../firebase.js';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';
import { httpsCallable } from 'firebase/functions';
import { logEvent } from 'firebase/analytics';
import { getValue, fetchAndActivate } from 'firebase/remote-config';
import { trace } from 'firebase/performance';

const FirebaseDemo = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [remoteConfigValue, setRemoteConfigValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load notes from Firestore
    loadNotes();
    
    // Load remote config
    loadRemoteConfig();
    
    // Log page view to analytics
    logEvent(analytics, 'page_view', {
      page_title: 'Firebase Demo',
      page_location: window.location.href
    });
  }, []);

  const loadNotes = async () => {
    try {
      const notesQuery = query(
        collection(db, 'notes'), 
        orderBy('createdAt', 'desc'), 
        limit(10)
      );
      const querySnapshot = await getDocs(notesQuery);
      const notesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(notesData);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setLoading(true);
    try {
      // Start performance trace
      const addNoteTrace = trace(performance, 'add_note');
      addNoteTrace.start();

      await addDoc(collection(db, 'notes'), {
        text: newNote,
        createdAt: new Date(),
        userId: 'demo-user'
      });

      addNoteTrace.stop();
      
      // Log event to analytics
      logEvent(analytics, 'note_added', {
        note_length: newNote.length
      });

      setNewNote('');
      loadNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setUploadedFiles(prev => [...prev, {
        name: file.name,
        url: downloadURL,
        uploadedAt: new Date()
      }]);

      // Log file upload to analytics
      logEvent(analytics, 'file_uploaded', {
        file_name: file.name,
        file_size: file.size
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRemoteConfig = async () => {
    try {
      await fetchAndActivate(remoteConfig);
      const welcomeMessage = getValue(remoteConfig, 'welcome_message');
      setRemoteConfigValue(welcomeMessage.asString());
    } catch (error) {
      console.error('Error loading remote config:', error);
    }
  };

  const testCloudFunction = async () => {
    try {
      // This would call a Cloud Function if you have one deployed
      // const testFunction = httpsCallable(functions, 'testFunction');
      // const result = await testFunction();
      console.log('Cloud Functions would be called here');
    } catch (error) {
      console.error('Error calling cloud function:', error);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg-primary py-8">
      <Helmet>
        <title>Firebase Demo - NoteNetra</title>
        <meta name="description" content="Demo of Firebase services integration" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-dark-text-primary mb-4">
            Firebase Services Demo
          </h1>
          <p className="text-xl text-dark-text-secondary">
            Explore all the Firebase services integrated in your app
          </p>
        </div>

        {/* Remote Config Demo */}
        {remoteConfigValue && (
          <div className="bg-dark-bg-card border border-dark-border-accent rounded-lg p-4 mb-8">
            <h3 className="text-lg font-semibold text-dark-text-accent mb-2">
              Remote Config Message
            </h3>
            <p className="text-dark-text-primary">{remoteConfigValue}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Authentication Demo */}
          <div className="bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary p-6">
            <h2 className="text-2xl font-bold mb-4 text-dark-text-primary">
              🔐 Authentication
            </h2>
            <FirebaseAuth />
          </div>

          {/* Firestore Demo */}
          <div className="bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary p-6">
            <h2 className="text-2xl font-bold mb-4 text-dark-text-primary">
              📝 Firestore Database
            </h2>
            <form onSubmit={addNote} className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                  className="flex-1 px-3 py-2 border border-dark-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-dark-accent-primary bg-dark-bg-input text-dark-text-primary"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-dark-accent-primary text-dark-text-primary rounded-md hover:bg-dark-accent-hover disabled:opacity-50 transition-colors"
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </form>
            
            <div className="space-y-2">
              {notes.map(note => (
                <div key={note.id} className="p-3 bg-dark-bg-tertiary rounded-md border border-dark-border-primary">
                  <p className="text-dark-text-primary">{note.text}</p>
                  <p className="text-sm text-dark-text-muted">
                    {note.createdAt?.toDate?.()?.toLocaleString() || 'Just now'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Storage Demo */}
          <div className="bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary p-6">
            <h2 className="text-2xl font-bold mb-4 text-dark-text-primary">
              📁 Cloud Storage
            </h2>
            <input
              type="file"
              onChange={handleFileUpload}
              className="mb-4 text-dark-text-primary"
              accept="image/*,.pdf,.doc,.docx"
            />
            
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="p-3 bg-dark-bg-tertiary rounded-md border border-dark-border-primary">
                  <p className="font-medium text-dark-text-primary">{file.name}</p>
                  <a 
                    href={file.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-dark-accent-primary hover:text-dark-accent-hover text-sm transition-colors"
                  >
                    View File
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Other Services Demo */}
          <div className="bg-dark-bg-card rounded-lg shadow-lg border border-dark-border-primary p-6">
            <h2 className="text-2xl font-bold mb-4 text-dark-text-primary">
              🚀 Other Services
            </h2>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-dark-text-primary mb-2">Analytics</h4>
                <p className="text-sm text-dark-text-secondary mb-2">
                  Page views and custom events are automatically logged
                </p>
                <button
                  onClick={() => logEvent(analytics, 'button_clicked', { button_name: 'demo_button' })}
                  className="px-4 py-2 bg-green-600 text-dark-text-primary rounded-md hover:bg-green-700 text-sm transition-colors"
                >
                  Test Analytics Event
                </button>
              </div>

              <div>
                <h4 className="font-semibold text-dark-text-primary mb-2">Performance</h4>
                <p className="text-sm text-dark-text-secondary mb-2">
                  Performance traces are automatically created for key actions
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-dark-text-primary mb-2">Cloud Functions</h4>
                <p className="text-sm text-dark-text-secondary mb-2">
                  Ready to call your deployed Cloud Functions
                </p>
                <button
                  onClick={testCloudFunction}
                  className="px-4 py-2 bg-purple-600 text-dark-text-primary rounded-md hover:bg-purple-700 text-sm transition-colors"
                >
                  Test Cloud Function
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirebaseDemo;
