export async function POST(req: Request) {
  try {
    const { serviceType, clientType, priceRange, language, extraDetails } =
      await req.json()

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY

    if (!apiKey) {
      console.error('[v0] Gemini API key is not set in environment variables')
      return Response.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      )
    }

    const languageInstructions = {
      Hindi:
        'Write in Hindi using professional terminology. Use Hindi business vocabulary. Format with clear section headers in Hindi.',
      English:
        'Write in professional English. Use formal business language. Format with clear section headers.',
      Hinglish:
        'Write in Hinglish (mixture of Hindi and English). Use natural code-switching between languages. This should feel conversational yet professional.',
    }

    const prompt = `You are an expert business proposal writer. Generate a professional, persuasive, and human-like proposal based on these details:

SERVICE TYPE: ${serviceType}
CLIENT TYPE: ${clientType}
BUDGET RANGE: ${priceRange}
ADDITIONAL DETAILS: ${extraDetails || 'Standard requirements'}

LANGUAGE: ${languageInstructions[language as keyof typeof languageInstructions] || languageInstructions.English}

INSTRUCTIONS:
- Write in a human-like, conversational yet professional tone
- Avoid robotic or templated language
- Be concise but impactful - every sentence should add value
- Include all these sections in this order: Executive Summary | Service Overview | Key Deliverables | Implementation Timeline | Investment & Pricing | Why Partner With Us
- Make it compelling and persuasive
- Keep total length between 300-500 words
- Use natural formatting with clear section breaks

IMPORTANT: The proposal should feel personal and tailored to THIS specific client request, not generic.`

    console.log(
      '[v0] Sending request to Gemini API with model: gemini-3-flash-preview'
    )

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.9,
          },
        }),
      }
    )

    console.log('[v0] Gemini API response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('[v0] Gemini API error:', errorData)

      const errorMessage =
        errorData?.error?.message ||
        errorData?.message ||
        `API Error: ${response.status} ${response.statusText}`

      return Response.json(
        {
          error: errorMessage,
          details: errorData,
        },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('[v0] Gemini API response received')

    const proposal =
      data.candidates?.[0]?.content?.parts?.[0]?.text || null

    if (!proposal) {
      console.error('[v0] No proposal text in response:', data)
      return Response.json(
        {
          error: 'No content generated from Gemini API',
          details: data,
        },
        { status: 500 }
      )
    }

    console.log('[v0] Proposal generated successfully')
    return Response.json({
      proposal,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('[v0] Error in generate-proposal route:', errorMessage)
    console.error('[v0] Full error:', error)

    return Response.json(
      {
        error: 'Failed to generate proposal: ' + errorMessage,
      },
      { status: 500 }
    )
  }
}
