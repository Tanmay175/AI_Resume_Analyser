const resumeTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <style>

        @page {
            size: A4;
            margin: 10mm 12mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #111;
            font-size: 9.5pt;
            line-height: 1.2;
        }

        .resume {
            width: 100%;
        }

        /* HEADER */

        .header {
            text-align: center;
            margin-bottom: 7px;
        }

        .name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .contact {
            font-size: 8.5pt;
        }

        /* SECTIONS */

        .section {
            margin-top: 7px;
        }

        .section-title {
            font-size: 10.5pt;
            font-weight: bold;
            border-bottom: 1px solid #222;
            padding-bottom: 2px;
            margin-bottom: 4px;
        }

        /* GENERAL */

        p {
            margin: 2px 0;
        }

        ul {
            margin-top: 2px;
            margin-bottom: 2px;
            padding-left: 16px;
        }

        li {
            margin-bottom: 2px;
        }

        /* EDUCATION */

        .education-row {
            display: flex;
            justify-content: space-between;
            font-weight: bold;
        }

        /* SKILLS */

        .skill-row {
            margin: 2px 0;
        }

        /* PROJECTS */

        .project {
            margin-bottom: 5px;
        }

        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-weight: bold;
        }

        .project-tech {
            font-weight: normal;
            font-size: 8.5pt;
        }

        .project ul {
            margin-top: 2px;
        }

        /* AVOID BAD PAGE BREAKS */

        .section,
        .project {
            break-inside: avoid;
            page-break-inside: avoid;
        }

    </style>
</head>

<body>

<div class="resume">

    <!-- HEADER -->

    <div class="header">

        <div class="name">
            ${data.name}
        </div>

        <div class="contact">
            ${data.phone} —
            ${data.email} —
            ${data.github} —
            ${data.linkedin}
        </div>

    </div>


    <!-- OBJECTIVE -->

    <div class="section">

        <div class="section-title">
            Objective
        </div>

        <p>
            ${data.objective}
        </p>

    </div>


    <!-- EDUCATION -->

    <div class="section">

        <div class="section-title">
            Education
        </div>

        <div class="education-row">

            <span>
                ${data.education.degree}
            </span>

            <span>
                ${data.education.year}
            </span>

        </div>

        <p>
            ${data.education.college}
            &nbsp;&nbsp;
            ${data.education.cgpa}
        </p>

        <p>
            Class 12: ${data.education.class12}
            &nbsp;&nbsp;
            Class 10: ${data.education.class10}
        </p>

    </div>


    <!-- TECHNICAL SKILLS -->

    <div class="section">

        <div class="section-title">
            Technical Skills
        </div>

        ${data.skills.map(skill => `

            <div class="skill-row">

                <strong>
                    ${skill.category}:
                </strong>

                ${skill.items.join(", ")}

            </div>

        `).join("")}

    </div>


    <!-- PROJECTS -->

    <div class="section">

        <div class="section-title">
            Projects
        </div>

        ${data.projects.map(project => `

            <div class="project">

                <div class="project-header">

                    <span>
                        ${project.name}
                    </span>

                    <span class="project-tech">
                        ${project.tech}
                    </span>

                </div>

                <ul>

                    ${project.points.map(point => `

                        <li>
                            ${point}
                        </li>

                    `).join("")}

                </ul>

            </div>

        `).join("")}

    </div>


    <!-- ACHIEVEMENTS -->

    <div class="section">

        <div class="section-title">
            Achievements
        </div>

        <ul>

            ${data.achievements.map(item => `

                <li>
                    ${item}
                </li>

            `).join("")}

        </ul>

    </div>


    <!-- LEADERSHIP -->

    <div class="section">

        <div class="section-title">
            Leadership & Activities
        </div>

        <p>
            ${data.leadership}
        </p>

    </div>


    <!-- LANGUAGES -->

    <div class="section">

        <div class="section-title">
            Languages
        </div>

        <p>
            ${data.languages.join(", ")}
        </p>

    </div>

</div>

</body>
</html>
`;

export default resumeTemplate;