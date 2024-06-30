"use client";
import React, { useEffect } from 'react';

const GooglePicker = ({ onSelect }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => loadGapi();
    document.body.appendChild(script);
  }, []);

  const loadGapi = () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
          scope: 'https://www.googleapis.com/auth/drive.file',
        })
        .then(() => {
          console.log('GAPI initialized');
        })
        .catch((error) => {
          console.error('Error initializing GAPI:', error);
        });
    });
  };

  const handleAuthClick = () => {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(() => {
        createPicker();
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const createPicker = () => {
    const picker = new window.google.picker.PickerBuilder()
      .addView(window.google.picker.ViewId.DOCS)
      .setOAuthToken(window.gapi.auth.getToken().access_token)
      .setDeveloperKey('YOUR_DEVELOPER_KEY')
      .setCallback((data) => {
        if (data[window.google.picker.Response.ACTION] === window.google.picker.Action.PICKED) {
          const doc = data[window.google.picker.Response.DOCUMENTS][0];
          onSelect(doc);
        }
      })
      .build();
    picker.setVisible(true);
  };

  return (
    <div>
      <button onClick={handleAuthClick} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
        Open Google Drive
      </button>
    </div>
  );
};

export default GooglePicker;
