import { GoogleGenAI } from "@google/genai";
import * as z from "zod";
import dotenv from "dotenv";
import puppeteer from "puppeteer";
import resumeTemplate from "../templates/resume.template.js";

dotenv.config();

// JSON Schema for interview report
const interviewReportJsonSchema = {
  type: "object",
  properties: {
    matchScore: {
      type: "number",
      description: "The match score between 0 and 100 indicating how well the candidate's resume and self-description match the job description"
    },
    technicalQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "The technical question that can be asked in the interview" },
          intention: { type: "string", description: "The intention behind the question" },
          answer: { type: "string", description: "How to answer the technical question" }
        },
        required: ["question", "intention", "answer"]
      },
      description: "An array of technical questions that can be asked in the interview"
    },
    behavioralQuestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string", description: "The behavioral question that can be asked in the interview" },
          intention: { type: "string", description: "The intention behind the question" },
          answer: { type: "string", description: "How to answer the behavioral question" }
        },
        required: ["question", "intention", "answer"]
      },
      description: "An array of behavioral questions that can be asked in the interview"
    },
    skillGaps: {
      type: "array",
      items: {
        type: "object",
        properties: {
          skill: { type: "string", description: "The skill that the candidate is lacking" },
          severity: { type: "string", enum: ["low", "medium", "hard"], description: "The severity of the skill gap" }
        },
        required: ["skill", "severity"]
      },
      description: "An array of skill gaps that the candidate has"
    },
    preparationPlan: {
      type: "array",
      items: {
        type: "object",
        properties: {
          day: { type: "integer", description: "The day of the preparation plan" },
          focus: { type: "string", description: "The focus of the preparation plan for that day" },
          tasks: {
            type: "array",
            items: { type: "string" },
            description: "The tasks to be completed on that day"
          }
        },
        required: ["day", "focus", "tasks"]
      },
      description: "An array of preparation plans for the candidate"
    },
    title: {
      type: "string",
      description: "The title of the job for which the interview report is generated"
    }
  },
  required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan", "title"]
};

const interviewReportSchema = z.fromJSONSchema(interviewReportJsonSchema);
const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY });

async function generateInterviewReport({ resume, jobDescription, selfDescription }) {

  const prompt = `
You are an expert interview coach. Analyze the following candidate information and job description to create a comprehensive interview preparation report.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF-DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Based on this information, provide a detailed interview preparation report with:
1. A match score (0-100) indicating how well the candidate fits the role
2. Specific technical questions that could be asked
3. Behavioral questions for the interview
4. Skill gaps and their severity
5. A week-long preparation plan
6. A short job title for the report

Respond with valid JSON only, matching the schema exactly.
`;

  const response = await client.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: interviewReportJsonSchema
    }
  });

  let parsedJson;
  try {
    parsedJson = JSON.parse(response.text);
  } catch (err) {
    throw new Error(`AI did not return valid JSON: ${err.message}`);
  }

  const report = interviewReportSchema.parse(parsedJson);
  return report;
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ]
    })

    try {
        const page = await browser.newPage()

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0"
        })

        await page.emulateMediaType("print")

        await page.evaluate(() => {
            const resume = document.querySelector(".resume")

            if (!resume) return

            const printableHeight = 1050
            const scale = Math.max(
                Math.min(1, printableHeight / resume.scrollHeight),
                0.72
            )

            resume.style.zoom = scale
            resume.style.width = `${100 / scale}%`
        })

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            pageRanges: "1"
        })

        return pdfBuffer
    } finally {
        await browser.close()
    }
}


async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
      name: z.string(), phone: z.string(), email: z.string(), github: z.string(), linkedin: z.string(),
      objective: z.string(),
      education: z.object({ degree: z.string(), college: z.string(), year: z.string(), cgpa: z.string(), class12: z.string(), class10: z.string() }),
      skills: z.array(z.object({ category: z.string(), items: z.array(z.string()) })),
      projects: z.array(z.object({ name: z.string(), tech: z.string(), points: z.array(z.string()) })),
      achievements: z.array(z.string()), leadership: z.string(), languages: z.array(z.string())
    })

    const prompt = `Create structured resume data for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

              Return JSON matching the schema exactly. Tailor the content to the job description, write concise human-sounding content, and keep it suitable for one A4 page. Use standard resume sections and plain text. Preserve exact phone, email, GitHub, and LinkedIn URLs when present; do not invent links. Use no more than 3 concise bullets per project and prioritize measurable achievements. Do not return HTML or Markdown.
                    `

    const response = await client.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: z.toJSONSchema(resumePdfSchema),
        }
    })


    const resumeData = resumePdfSchema.parse(JSON.parse(response.text));
    const pdfBuffer = await generatePdfFromHtml(resumeTemplate(resumeData))

    return pdfBuffer

}


export { generateInterviewReport,generateResumePdf };

    
