import resumeTemplate from "../templates/resume.template.js";
import fs from "fs";

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

console.log("HTML generated");