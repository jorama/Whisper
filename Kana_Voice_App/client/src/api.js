import axios from 'axios';

const SERVER_URL = 'http://localhost:3001';  // Adjust as needed if your server URL differs

// Function to send audio to the server and receive the transcription
export const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
        const response = await axios.post(`${SERVER_URL}/transcribe`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data.text;  // Returning the transcribed text
    } catch (error) {
        console.error('Error sending audio to server:', error);
        throw error;
    }
};

// Function to perform a search query using the transcribed text
export const searchNearbyFood = async (query) => {
    try {
        const response = await axios.get(`${SERVER_URL}/search`, { params: { query } });
        return response.data;  // Returning the search results
    } catch (error) {
        console.error('Error fetching search results:', error);
        throw error;
    }
};
