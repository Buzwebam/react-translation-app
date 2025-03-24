import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './VoiceTranslator.css';

const VoiceTranslator = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('');

  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      handleTranslation();
    }
  }, [transcript]);

  const handleTranslation = async () => {
    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: transcript })
      });

      const data = await response.json();
      
      // Get the most likely intent
      const intent = data[0].probabilities[0].intent;
      
      // Generate response based on intent
      let responseText = '';
      if (intent === 'greeting') {
        responseText = 'Molo! Ndingakunceda njani namhlanje?';
      } else if (intent === 'goodbye') {
        responseText = 'Sala kakuhle!';
      }

      setResponse(responseText);
      
      // Speak the response
      const speech = new SpeechSynthesisUtterance(responseText);
      speech.lang = 'xh';
      window.speechSynthesis.speak(speech);

    } catch (error) {
      console.error('Translation error:', error);
      setResponse('Error processing translation');
    }
  };

  // ... rest of the component remains the same ...
};

export default VoiceTranslator; 