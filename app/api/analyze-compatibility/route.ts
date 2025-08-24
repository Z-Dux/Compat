import { OpenAI } from "openai"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})


export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { person1, person2 } = body

    const buildPersonDescription = (person: any, personNumber: number) => {
      const fields = []
      if (person.nickname) fields.push(`Nickname: ${person.nickname}`)
      if (person.zodiacSign) fields.push(`Zodiac: ${person.zodiacSign}`)
      if (person.bloodType) fields.push(`Blood Type: ${person.bloodType}`)
      if (person.mbti) fields.push(`MBTI: ${person.mbti}`)
      if (person.chineseZodiac) fields.push(`Chinese Zodiac: ${person.chineseZodiac}`)
      if (person.enneagram) fields.push(`Enneagram: ${person.enneagram}`)
      if (person.fourPillars) fields.push(`Four Pillars: ${person.fourPillars}`)
      if (person.kuseiKigaku) fields.push(`Kusei Kigaku: ${person.kuseiKigaku}`)
      if (person.rokuseiAstrology) fields.push(`Rokusei Astrology: ${person.rokuseiAstrology}`)
      if (person.sanmeigaku) fields.push(`Sanmeigaku: ${person.sanmeigaku}`)
      if (person.animalHoroscope) fields.push(`Animal Horoscope: ${person.animalHoroscope}`)

      return `Person ${personNumber} (${person.nickname}):\n${fields.join("\n")}`
    }

    const person1Description = buildPersonDescription(person1, 1)
    const person2Description = buildPersonDescription(person2, 2)

    const prompt = `You are a relationship compatibility analyst specializing in helping young people (teens to 30s) understand their romantic compatibility. Your tone should be honest, direct, and neutral. Do not favor positivity or encouragement; instead, provide a straightforward and realistic assessment, including both strengths and weaknesses as they truly are.

Analyze the compatibility between these two people using the provided information:

${person1Description}

${person2Description}

Guidelines for your analysis:
- Be honest and direct about both strengths and challenges
- Use cross-tabulation (combine different systems like "ENTP x Libra" or "Blood Type A x Enneagram 2")
- Do not sugarcoat or favor positive outcomes; if there are significant issues, state them clearly
- Write in a clear, neutral, and straightforward tone
- Avoid unnecessary encouragement or positivity
- Make it informative and suitable for sharing

For personal profiles: Write about 300 characters each, highlighting their key traits and what they bring to relationships.

For compatibility points: Provide exactly 7 strengths, including specific cross-tabulations and how their traits work together.

For caution points: Provide exactly 3 areas to watch, stated plainly and directly as challenges or incompatibilities.

For the percentage: Base it strictly on the overall harmony of their traits. (0-100%)

For the overall review: Write about 500 characters with a direct, honest conclusion about their potential together, including any major concerns or incompatibilities.

Return a JSON object with the following structure:
{
  person1Profile: string,
  person2Profile: string,
  compatibilityPoints: string[],
  cautionPoints: string[],
  overallPercentage: number,
  overallReview: string
}`

    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      messages: [
        {
          role: "system",
          content: "You are a relationship compatibility analyst. Respond only with valid JSON as described in the prompt.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

  const messageContent = completion.choices[0].message.content ?? "{}"
  const result = JSON.parse(messageContent)

    return Response.json({
      person1: {
        nickname: person1.nickname,
        profile: result.person1Profile,
      },
      person2: {
        nickname: person2.nickname,
        profile: result.person2Profile,
      },
      compatibilityPoints: result.compatibilityPoints,
      cautionPoints: result.cautionPoints,
      overallPercentage: result.overallPercentage,
      overallReview: result.overallReview,
    })
  } catch (error) {
    console.error("Error analyzing compatibility:", error)
    return Response.json({ error: "Failed to analyze compatibility" }, { status: 500 })
  }
}
