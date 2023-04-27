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
  
(async () => {
    const audioFilePath = 'teste-whisper.wav';
    const resp = await transcribeAudio(audioFilePath);
    console.log('response', resp.data);
})();