import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export const analyzeBioItem = async (query) => {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      // Force JSON response for easy parsing
      generationConfig: { responseMimeType: 'application/json' },
    })

    const prompt = `
      You are an expert metabolic scientist and keto coach.
      Analyze the substance: "${query}" in the context of Intermittent Fasting and a Ketogenic Diet.

      Return JSON ONLY with this structure:
      {
        "safeForFasting": boolean,
        "insulinSpike": number (0-100),
        "ketosisImpact": "Positive" | "Neutral" | "Negative" | "Paused",
        "verdict": "string (max 50 words, scientific but clear)",
        "icon": "string (FontAwesome6 icon name, e.g. 'glass-water', 'carrot', 'pills')"
      }
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the JSON
    return JSON.parse(text)
  } catch (error) {
    console.error('Gemini Error:', error)
    // Fallback error object
    return {
      safeForFasting: false,
      insulinSpike: 0,
      ketosisImpact: 'Neutral',
      verdict: 'AI Service Unavailable',
      icon: 'triangle-exclamation',
    }
  }
}
