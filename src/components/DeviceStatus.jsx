import React, { useEffect, useState } from 'react';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';

const DeviceStatus = ({ deviceId }) => {
  const [status, setStatus] = useState('unknown');
  const [lastOnline, setLastOnline] = useState(null);

  useEffect(() => {
    // Use the hardcoded device ID for now, or pass it as a prop from a higher component
    const currentDeviceId = deviceId || "8Z642cHB2pXTGv8BnCbrzMYGWz23"; // Fallback to a default if not provided

    if (!currentDeviceId) return;

    const deviceStatusRef = ref(database, `devices/${currentDeviceId}/status`);
    const deviceLastOnlineRef = ref(database, `devices/${currentDeviceId}/last_online`);

    const unsubscribeStatus = onValue(deviceStatusRef, (snapshot) => {
      const newStatus = snapshot.val();
      setStatus(newStatus ? newStatus : 'offline');
    });

    const unsubscribeLastOnline = onValue(deviceLastOnlineRef, (snapshot) => {
      const timestamp = snapshot.val();
      setLastOnline(timestamp ? new Date(timestamp) : null);
    });

    return () => {
      unsubscribeStatus();
      unsubscribeLastOnline();
    };
  }, [deviceId]); // Re-run effect if deviceId prop changes

  return (
    <div className="flex items-center space-x-2 text-sm">
      <span
        className={`w-3 h-3 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}
      ></span>
      <span className="text-dark-text-primary">
        Device Status: {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      {lastOnline && status === 'offline' && (
        <span className="text-dark-text-muted">
          (Last online: {lastOnline.toLocaleString()})
        </span>
      )}
    </div>
  );
};

export default DeviceStatus;
