import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(request, response) {
  // 1. Only accept POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. Check for API Key
  if (!process.env.GOOGLE_API_KEY) {
    return response.status(500).json({ error: 'Google API key not configured.' });
  }

  try {
    // 3. Extract text from request body (Vercel automatically parses JSON)
    const { text } = request.body;
    if (!text) {
      return response.status(400).json({ error: 'Text to improve is required.' });
    }

    // 4. Instantiate the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // 5. Define the prompt
    const prompt = `Réécris les tâches suivantes d'une description de poste en une liste de points (bullet points) professionnels et percutants pour un CV. Chaque point doit commencer par un verbe d'action fort. Le résultat doit être une chaîne de caractères HTML contenant des balises <ul> et <li>. Ne retourne que le HTML, sans introduction ni phrase supplémentaire. Le texte à améliorer est : "${text}"`;

    // 6. Call the AI model
    const result = await model.generateContent(prompt);
    const aiResponse = await result.response;
    const improvedText = await aiResponse.text();

    // 7. Return the improved text
    return response.status(200).json({ improvedText });

  } catch (error) {
    console.error('Error calling Google AI API:', error);
    return response.status(500).json({ error: `An error occurred: ${error.message}` });
  }
}
