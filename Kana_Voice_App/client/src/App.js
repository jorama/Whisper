import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';
import SearchResults from './SearchResults';
import { transcribeAudio, searchNearbyFood } from './api';

function App() {
    const [results, setResults] = useState([]);

    const handleAudioCaptured = async (audioBlob) => {
        try {
            const text = await transcribeAudio(audioBlob);
            const venues = await searchNearbyFood(text);
            setResults(venues);
        } catch (error) {
            console.error('Error processing commands:', error);
        }
    };

    return (
        <div className="App">
            <h1>Food Nearby Search</h1>
            <AudioRecorder onAudioCaptured={handleAudioCaptured} />
            <SearchResults venues={results} />
        </div>
    );
}

export default App;
