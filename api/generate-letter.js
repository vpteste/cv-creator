/**
 * API Route for generating a cover letter.
 * This is a serverless function.
 */

// This function simulates a call to an AI service.
async function getAiGeneratedLetter(prompt) {
  // IMPORTANT: In a real app, replace this with a call to an actual AI service (OpenAI, Google AI, etc.)
  // and secure your API key using environment variables.
  console.log("--- SIMULATING AI CALL ---");
  console.log("Prompt:", prompt);

  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // The syntax error was here. Using double quotes for the fallback string to fix it.
  const fallbackText = "Je suis particulièrement motivé par les défis techniques et l'innovation.";
  const additionalInfo = prompt.additionalInfo || fallbackText;

  const simulatedText = `Madame, Monsieur,\n\nSuite à votre annonce, je vous adresse ma candidature pour le poste de ${prompt.jobTitle}.\nTravailler chez ${prompt.companyName} serait pour moi une opportunité formidable de mettre à profit mes compétences.\n\n${additionalInfo}\n\nJe me tiens à votre disposition pour un entretien.\n\nVeuillez agréer, Madame, Monsieur, mes salutations distinguées.`;

  return simulatedText;
}

export default async (request, context) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { jobTitle, companyName, additionalInfo } = await request.json();

    if (!jobTitle || !companyName) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const prompt = { jobTitle, companyName, additionalInfo };
    const letterBody = await getAiGeneratedLetter(prompt);

    return new Response(JSON.stringify({ letter: letterBody }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error in generate-letter function:", error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
