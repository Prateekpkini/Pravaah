// frontend/src/components/VoiceAssistant.js
import React, { useState, useEffect } from 'react';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
}

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    if (!recognition) return;
    setTranscript('');
    recognition.start();
    setListening(true);
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const speech = event.results[0][0].transcript;
      setTranscript(speech);
      handleCommand(speech.toLowerCase());
    };

    recognition.onend = () => {
      setListening(false);
    };
  }, []);

  const handleCommand = (command) => {
    if (command.includes('emergency')) {
      alert('🚨 Emergency Alert Triggered!');
    } else if (command.includes('logout')) {
      alert('Logging out staff...');
    } else if (command.includes('queue')) {
      alert('Showing patient queue...');
    }
    // Add more commands as needed
  };

  return (
    <div className="module-card">
      <h3>🎙️ Voice Assistant</h3>
      <button onClick={startListening} disabled={listening}>
        {listening ? 'Listening...' : 'Start Voice Command'}
      </button>
      <p>{transcript && `🗣️ You said: "${transcript}"`}</p>
    </div>
  );
}
