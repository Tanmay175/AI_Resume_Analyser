import { generateInterviewReport } from "./ai.service.js";
const resume = `
Name: Rahul Sharma
Email: rahul.sharma@gmail.com
Phone: +91 9876543210
Location: Bangalore, India

Education:
B.Tech in Computer Science and Engineering
ABC Institute of Technology
2022 - 2026
CGPA: 8.6/10

Technical Skills:
- Programming: C++, JavaScript, Python
- Frontend: HTML, CSS, React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB, MySQL
- Tools: Git, GitHub, Postman, Docker
- Concepts: Data Structures and Algorithms, REST APIs, OOP, DBMS

Projects:

1. AI Resume Analyzer
- Built a full-stack resume analysis application using React, Node.js, Express and MongoDB.
- Integrated Google's Gemini API to analyze resumes against job descriptions.
- Implemented REST APIs for user authentication and resume analysis.
- Created a responsive frontend using React and Tailwind CSS.

2. Real-Time Chat Application
- Developed a real-time chat application using React, Node.js, Express and Socket.IO.
- Implemented user authentication and private messaging.
- Used MongoDB to store users and messages.

3. E-Commerce Website
- Built an e-commerce frontend using React and JavaScript.
- Implemented product search, filtering, cart management and pagination.
- Created reusable React components to improve maintainability.

Experience:
Software Development Intern
XYZ Technologies
May 2025 - July 2025
- Developed REST APIs using Node.js and Express.js.
- Fixed frontend bugs and implemented new React components.
- Worked with MongoDB for storing application data.
- Used Git and GitHub for version control.

Achievements:
- Solved 350+ problems on LeetCode.
- Participated in multiple coding contests.
- Ranked among the top students in the department.

Soft Skills:
- Problem solving
- Communication
- Teamwork
- Time management
`;

const selfDescription = `
I am a Computer Science student interested in software development and artificial intelligence.
I enjoy building full-stack applications and solving data structures and algorithms problems.
I have experience with React, Node.js, Express.js, MongoDB and REST APIs.

Recently, I have started working with Generative AI and APIs such as Google's Gemini API.
I want to improve my understanding of AI-powered applications and eventually work as a software engineer
where I can combine my web development and AI skills.

I consider problem solving to be one of my strongest abilities.
I enjoy learning new technologies, building projects and understanding how systems work internally.
I am comfortable working independently as well as in a team.
`;

const jobDescription = `
Software Engineer Intern

Company: TechNova Solutions

We are looking for a Software Engineer Intern to join our engineering team.

Responsibilities:
- Develop and maintain web applications using React.js and Node.js.
- Build and consume REST APIs.
- Work with databases such as MongoDB and MySQL.
- Write clean, maintainable and reusable code.
- Debug and troubleshoot application issues.
- Collaborate with other developers and participate in code reviews.
- Use Git and GitHub for version control.
- Learn and integrate new technologies when required.

Requirements:
- Currently pursuing a Bachelor's degree in Computer Science or a related field.
- Strong knowledge of JavaScript.
- Experience with React.js and Node.js.
- Understanding of REST API development.
- Basic knowledge of MongoDB or SQL.
- Understanding of Git and GitHub.
- Good problem-solving and communication skills.
- Knowledge of Data Structures and Algorithms is preferred.

Nice to Have:
- Experience with Docker.
- Experience building full-stack applications.
- Familiarity with Generative AI or AI APIs.
- Experience with Socket.IO or real-time applications.

What We Value:
- Strong learning ability.
- Good problem-solving skills.
- Ability to work in a team.
- Passion for software development.
`;

try {

  const report = await generateInterviewReport({
    resume,
    selfDescription,
    jobDescription
  });

  console.log(
    JSON.stringify(report, null, 2)
  );

} catch (error) {

  console.error("ERROR:", error);

}

export { resume, selfDescription, jobDescription };