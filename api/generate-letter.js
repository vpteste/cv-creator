/**
 * API Route for generating a cover letter.
 * This is a serverless function.
 * 
 * When deployed to a host like Vercel or Netlify, this file will become an API endpoint
 * accessible at `/api/generate-letter`.
 */

// This function simulates a call to an AI service.
// In a real-world scenario, you would replace this with a call to OpenAI, Perplexity, Google AI, etc.
async function getAiGeneratedLetter(prompt) {
  // IMPORTANT: Replace this with your actual AI API call.
  // Example using a hypothetical AI SDK:
  //
  // import { AI } from 'ai-provider';
  // const ai = new AI({ apiKey: process.env.AI_API_KEY });
  // const response = await ai.completions.create({ model: 'text-davinci-003', prompt });
  // return response.choices[0].text;

  console.log("--- SIMULATING AI CALL ---");
  console.log("Prompt:", prompt);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const simulatedText = `Madame, Monsieur,\n\nSuite à votre annonce, je vous adresse ma candidature pour le poste de ${prompt.jobTitle}.
Travailler chez ${prompt.companyName} serait pour moi une opportunité formidable de mettre à profit mes compétences.\n\n${prompt.additionalInfo || 'Je suis particulièrement motivé par les défis techniques et l'innovation.'}\n\nJe me tiens à votre disposition pour un entretien.\n\nVeuillez agréer, Madame, Monsieur, mes salutations distinguées.`;

  return simulatedText;
}


export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { jobTitle, companyName, additionalInfo } = request.body;

    if (!jobTitle || !companyName) {
      return response.status(400).json({ message: 'Missing required fields: jobTitle and companyName' });
    }

    // Construct a detailed prompt for the AI
    const prompt = {
      jobTitle,
      companyName,
      additionalInfo
    };

    // Get the generated letter body from the AI service
    const letterBody = await getAiGeneratedLetter(prompt);

    // Send the successful response back to the frontend
    response.status(200).json({ letter: letterBody });

  } catch (error) {
    console.error("Error in generate-letter function:", error);
    response.status(500).json({ message: 'Internal Server Error' });
  }
}
