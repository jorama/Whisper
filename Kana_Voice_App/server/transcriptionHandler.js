const whisper = require('whisper');
const fs = require('fs');

const model = whisper.loadModel('base');

async function transcribeAudio(filePath) {
    try {
        const result = await model.transcribe(filePath);
        fs.unlinkSync(filePath); // Clean up file after transcription
        return result.text;
    } catch (error) {
        console.error('Error in transcription:', error);
        throw error;
    }
}

module.exports = { transcribeAudio };
