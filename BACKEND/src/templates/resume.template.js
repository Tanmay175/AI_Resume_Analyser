const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const safeUrl = (value = "") => {
    const text = String(value).trim();
    const match = text.match(/(?:https?:\/\/)?(?:www\.)?(?:github\.com|linkedin\.com)\/[^\s)\]}>,]+/i);
    if (!match) return "";

    const url = /^https?:\/\//i.test(match[0]) ? match[0] : `https://${match[0]}`;
    return escapeHtml(url.replace(/[.,;:]+$/, ""));
};

const contactLink = (label, value) => {
    if (!value) return "";
    const url = safeUrl(value);
    return url ? `<a href="${url}">${escapeHtml(label)}</a>` : escapeHtml(value);
};

const resumeTemplate = (data) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <style>

        @page {
            size: A4;
            margin: 8mm 10mm;
        }

        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: #111;
            font-size: 9pt;
            line-height: 1.12;
        }

        .resume {
            width: 100%;
        }

        /* HEADER */

        .header {
            text-align: center;
            margin-bottom: 5px;
        }

        .name {
            font-size: 19px;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .contact {
            font-size: 8pt;
        }

        a { color: #111; text-decoration: underline; }

        /* SECTIONS */

        .section {
            margin-top: 5px;
        }

        .section-title {
            font-size: 10pt;
            font-weight: bold;
            border-bottom: 1px solid #222;
            padding-bottom: 2px;
            margin-bottom: 3px;
        }

        /* GENERAL */

        p {
            margin: 1px 0;
        }

        ul {
            margin: 1px 0;
            padding-left: 15px;
        }

        li {
            margin-bottom: 1px;
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
            margin-bottom: 3px;
        }

        .project-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            font-weight: bold;
        }

        .project-tech {
            font-weight: normal;
            font-size: 8pt;
        }

        .project ul {
            margin-top: 1px;
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
            ${escapeHtml(data.name)}
        </div>

        <div class="contact">
            ${escapeHtml(data.phone)}${data.phone && data.email ? " | " : ""}
            ${escapeHtml(data.email)}${data.email && data.github ? " | " : ""}
            ${contactLink("GitHub", data.github)}${data.github && data.linkedin ? " | " : ""}
            ${contactLink("LinkedIn", data.linkedin)}
        </div>

    </div>


    <!-- OBJECTIVE -->

    <div class="section">

        <div class="section-title">
            Summary
        </div>

        <p>
            ${escapeHtml(data.objective)}
        </p>

    </div>


    <!-- EDUCATION -->

    <div class="section">

        <div class="section-title">
            Education
        </div>

        <div class="education-row">

            <span>
                ${escapeHtml(data.education.degree)}
            </span>

            <span>
                ${escapeHtml(data.education.year)}
            </span>

        </div>

        <p>
            ${escapeHtml(data.education.college)}
            ${data.education.cgpa ? ` | ${escapeHtml(data.education.cgpa)}` : ""}
        </p>

        <p>
            ${data.education.class12 ? `Class 12: ${escapeHtml(data.education.class12)}` : ""}
            ${data.education.class12 && data.education.class10 ? " | " : ""}
            ${data.education.class10 ? `Class 10: ${escapeHtml(data.education.class10)}` : ""}
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
                    ${escapeHtml(skill.category)}:
                </strong>

                ${skill.items.map(escapeHtml).join(", ")}

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
                        ${escapeHtml(project.name)}
                    </span>

                    <span class="project-tech">
                        ${escapeHtml(project.tech)}
                    </span>

                </div>

                <ul>

                    ${project.points.map(point => `

                        <li>
                            ${escapeHtml(point)}
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
                    ${escapeHtml(item)}
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
            ${escapeHtml(data.leadership)}
        </p>

    </div>


    <!-- LANGUAGES -->

    <div class="section">

        <div class="section-title">
            Languages
        </div>

        <p>
            ${data.languages.map(escapeHtml).join(", ")}
        </p>

    </div>

</div>

</body>
</html>
`;

export default resumeTemplate;