const fs = require('fs');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

  
async function transcribeAudio(fileName) {
    return await openai.createTranscription(
        fs.createReadStream(fileName),
        "whisper-1"
    );
}

async function translateToEnglish(fileName) {
    return await openai.createTranslation(
        fs.createReadStream(fileName),
        "whisper-1"
    );
}
  
(async () => {
    const audioFilePath = 'teste-whisper.wav';
    const transcriptionResponse = await transcribeAudio(audioFilePath);
    console.log('response', transcriptionResponse.data);
    
    const translationResponse = await translateToEnglish(audioFilePath);
    console.log('response', translationResponse.data);
})();