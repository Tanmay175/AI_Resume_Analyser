import resumeTemplate from "../templates/resume.template.js";
import fs from "fs";
import puppeteer from "puppeteer";

const data = {

    name: "Tanmay Saha",

    phone: "93947 31516",

    email: "sahatanmay108@gmail.com",

    github: "GitHub",

    linkedin: "LinkedIn",

    objective:
        "Computer Science student focused on full-stack development and Data Structures and Algorithms, with hands-on experience building MERN applications, REST APIs, authentication systems, third-party API integrations, and machine learning models.",

    education: {
        degree: "Bachelor of Technology in Computer Science and Engineering",
        college: "Jorhat Engineering College",
        year: "Expected 2028",
        cgpa: "CGPA: 7.8",
        class12: "86%",
        class10: "94%"
    },

    skills: [

        {
            category: "Programming Languages",
            items: ["C", "C++", "Java", "Python"]
        },

        {
            category: "Web Development",
            items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"]
        },

        {
            category: "Backend Development",
            items: ["Node.js", "Express.js", "REST API Development"]
        },

        {
            category: "Database Management",
            items: ["MongoDB", "SQL"]
        },

        {
            category: "Machine Learning & Data Analysis",
            items: ["PyTorch", "NumPy", "Pandas", "Matplotlib"]
        },

        {
            category: "Tools & Platforms",
            items: ["Git", "GitHub", "Docker", "Linux", "Postman"]
        }

    ],

    projects: [

        {
            name: "Student Profile and Leaderboard System",
            tech: "MERN, JWT, GitHub API, LeetCode API",

            points: [
                "Developed a full-stack platform for managing student profiles, coding activity, and technical performance with separate student and professor roles.",
                "Implemented role-based authentication and authorization using JSON Web Tokens, protected routes, and middleware validation.",
                "Integrated GitHub and LeetCode APIs to retrieve coding statistics, contribution activity, and problem-solving data."
            ]
        },

        {
            name: "PGFindr – PG Accommodation Discovery and Booking Platform",
            tech: "MERN, JWT, MongoDB, REST APIs",

            points: [
                "Developed a real-world accommodation platform connecting students with PG owners through separate role-based interfaces.",
                "Implemented JWT authentication, protected routes, PG listing management, search, filtering, and availability tracking.",
                "Built student booking workflows and owner-side booking management with booking status tracking."
            ]
        },

        {
            name: "Sugarcane Leaf Disease Detection using ConvNeXtV2",
            tech: "Python, PyTorch, ConvNeXtV2",

            points: [
                "Fine-tuned ConvNeXtV2 to classify sugarcane leaf images into five categories: Healthy, Mosaic, RedRot, Rust, and Yellow.",
                "Audited a dataset of 2,311 images, removing 210 duplicates and eliminating cross-class data leakage before training.",
                "Applied image augmentation and model evaluation techniques, achieving 97.85% test accuracy and 97.86% F1-score."
            ]
        }

    ],

    achievements: [
        "Solved 250+ problems on LeetCode covering Data Structures and Algorithms."
    ],

    leadership:
        "Google Developer Groups on Campus (GDGC) – Management Team Member",

    languages: [
        "English",
        "Hindi",
        "Assamese",
        "Bengali"
    ]
};

const html = resumeTemplate(data);

fs.writeFileSync(
    "test-resume.html",
    html
);

console.log("HTML generated: test-resume.html");

// Standalone PDF generation — deliberately duplicated here rather than
// imported from ai.service.js, so this test never needs GEMINI_API_KEY
// or touches the real API path. Delete this file once the template is
// verified and wired into ai.service.js's generateResumePdf().
async function generateTestPdf() {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: "10mm",
                bottom: "10mm",
                left: "12mm",
                right: "12mm"
            }
        });

        fs.writeFileSync("test-resume.pdf", pdfBuffer);
        console.log("PDF generated: test-resume.pdf");
    } finally {
        await browser.close();
    }
}

generateTestPdf();