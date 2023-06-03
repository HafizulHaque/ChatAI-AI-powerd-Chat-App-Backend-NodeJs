const { Configuration, OpenAIApi } = require('openai')
// const {OPENAI_API_KEY} = require('./env')
const OPENAI_API_KEY = process.env.API_KEY

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration)

// helper function
const getGptFeedback = async (conversation) => {

  const systemMsg = {
    role: "system",
    content: "Give 1 word reply if possible. If not possible then keep reply consized into maximum 30 words. Be humble in conversation"
  }


  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      systemMsg,
      ...conversation
    ],
  });
  return completion.data.choices[0].message
} 

module.exports = {
  getGptFeedback
};