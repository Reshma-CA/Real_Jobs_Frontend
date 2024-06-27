import React from 'react';
import { toast } from 'react-toastify';

const Testing = () => {
  const notify = () => {
    toast.success('Success Notification!');
    toast.error('Error Notification!');
  };

  return (
    <div>
      <h1>React Toastify Example</h1>
      <button onClick={notify}>Show Notifications</button>
    </div>
  );
};

export default Testing;
