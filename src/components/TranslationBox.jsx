import React, { useState } from 'react';
import './TranslationBox.css';

const TranslationBox = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sourceLang, setSourceLang] = useState('eng_Latn');
  const [targetLang, setTargetLang] = useState('xho_Latn');

  const languages = [
    { code: 'eng_Latn', name: 'English' },
    { code: 'xho_Latn', name: 'Xhosa' },
    { code: 'zul_Latn', name: 'Zulu' },
    { code: 'afr_Latn', name: 'Afrikaans' },
    { code: 'sot_Latn', name: 'Southern Sotho' },
    { code: 'nso_Latn', name: 'Northern Sotho' },
    { code: 'tsn_Latn', name: 'Tswana' },
    { code: 'swh_Latn', name: 'Swahili' }
  ];

  const retryFetch = async (url, options, maxRetries = 3) => {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          return response;
        }
        const errorData = await response.text();
        lastError = new Error(`API Error (${response.status}): ${errorData} token is:  ${process.env.REACT_APP_VULAVULA_TOKEN}`);
        console.log('Errorv token is: ', process.env.REACT_APP_VULAVULA_TOKEN );
        // If it's an auth error, don't retry
        if (response.status === 401) {
          throw lastError;
        }
      } catch (error) {
        lastError = error;
        if (error.message.includes('401')) {
          throw error;
        }
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
    throw lastError;
  };

  const handleTranslation = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // Using example from documentation
      const payload = {
        "input_text": inputText,
        "source_lang": sourceLang,
        "target_lang": targetLang
      };

      console.log('Sending request with payload:', payload); // Debug log

      const response = await fetch('https://vulavula-services.lelapa.ai/api/v1/translate/process', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          // Try with their example token format
          'X-CLIENT-TOKEN': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWFmMmQxYWYtNzVkYi00YjUwLTk2ZjktMDExZTU2OWFjMmE4Iiwia2V5Y2hhaW5faWQiOiIzMjk4NjE4MC03YWUwLTRjYjYtOWI4NS05ZmE0ZTE4Y2Y3ZGQiLCJwcm9qZWN0X2lkIjoiMDYyMjliZGMtZTExMS00ZDdkLWFiNmUtOWEwOWQ5YzQ2YjNiIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDMtMjRUMDY6NDI6MjkuMTg1MzYyIn0.LJzo31feViLQbzTBkLGpBIzAXFvtUnRUnQXC5ZOwAOs' || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOWFmMmQxYWYtNzVkYi00YjUwLTk2ZjktMDExZTU2OWFjMmE4Iiwia2V5Y2hhaW5faWQiOiIzMjk4NjE4MC03YWUwLTRjYjYtOWI4NS05ZmE0ZTE4Y2Y3ZGQiLCJwcm9qZWN0X2lkIjoiMDYyMjliZGMtZTExMS00ZDdkLWFiNmUtOWEwOWQ5YzQ2YjNiIiwiY3JlYXRlZF9hdCI6IjIwMjUtMDMtMjRUMDY6NDI6MjkuMTg1MzYyIn0.LJzo31feViLQbzTBkLGpBIzAXFvtUnRUnQXC5ZOwAOs'
        },
        body: JSON.stringify({
          input_text: inputText,
          source_lang: sourceLang,
          target_lang: targetLang
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText); // Debug log
        throw new Error(`API Error (${response.status}): ${errorText}`);
      }

      const data = await response.json();
      console.log('API Success Response:', data); // Debug log

      if (data && data.translation && data.translation[0]) {
        setResponse(data.translation[0].translation_text);
        
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setError(`${error.message}\n\nPlease follow these steps to get a valid token:\n1. Visit https://docs.lelapa.ai/\n2. Sign up for an account\n3. Generate an API token from your dashboard`);
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  // ... rest of the imports and code remains the same ...

  return (
    <div className="translation-box">
      <div className="token-status">
        <p>API Token Status: {process.env.REACT_APP_VULAVULA_TOKEN ? '✓ Token Set' : '✗ No Token Found'}</p>
      </div>

      <div className="language-selector">
        <div className="select-container">
          <label>From:</label>
          <select 
            value={sourceLang} 
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div className="select-container">
          <label>To:</label>
          <select 
            value={targetLang} 
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-container">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate..."
          rows={4}
        />
        <button 
          onClick={handleTranslation}
          disabled={loading || !inputText.trim()}
          className={loading ? 'loading' : ''}
        >
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </div>

      <div className="response-area">
        {error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : response ? (
          <div className="response-container">
            <h3>Translation Result:</h3>
            <div className="translation-result">
              <div className="original-text">
                <h4>Original Text ({languages.find(l => l.code === sourceLang)?.name}):</h4>
                <p>{inputText}</p>
              </div>
              <div className="translated-text">
                <h4>Translated Text ({languages.find(l => l.code === targetLang)?.name}):</h4>
                <p>{response}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TranslationBox; 