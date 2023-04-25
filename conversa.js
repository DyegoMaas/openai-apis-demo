const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const conversationTopic = 'O que é necessário para ser um escritor'; // Altere para o tema desejado
const maxTurns = 20; // x perguntas e respostas para cada pessoa

async function chat(messages) {
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.8,
      max_tokens: 150,
   //   n: 1,
    });
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error during API call:', error);
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

async function runConversation() {
  let systemMessage = { role: 'system', content: `O tema de hoje é "${conversationTopic}". Converse sobre o tema, sempre adicionando uma pergunta depois de responder educadamente. Discorde ocasionalmente. Restrinja a resposta completa a 150 caracteres.` };
  let messages = [systemMessage];
  let turnCount = 0;

  // Inicie a conversa com uma pergunta do user1
  const user1InitialQuestion = `Me conte o que você acha sobre "${conversationTopic}"?`;
  messages.push({ role: 'user', content: user1InitialQuestion });
  turnCount++;

  console.log(`Conversa completa:\n`);
  messages.forEach((message, index) => {
    console.log(`(${message.role}) ${message.content}\n`);
  });

  while (turnCount < maxTurns) {
    const role = turnCount % 2 === 0 ? 'user' : 'assistant';
    const newMessageContent = await chat(messages);
    messages.push({ role, content: newMessageContent });
    turnCount++;

    console.log(`(${role}) ${newMessageContent}\n`);
    await delay(300);
  }

  console.log('Fim da conversa.')
}

runConversation();
