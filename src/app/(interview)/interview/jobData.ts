import {JobInfo} from "@/app/(interview)/interview/[id]/page";

export const jobInfo: JobInfo = {
    id: '1',
    name: "React Developer – Digital Postal Services",
    company: "Indian Post Digital Transformation Unit",
    description: `
We are seeking a talented **React.js Developer** to join our mission of modernizing India's postal infrastructure. As a part of the **Digital Post Office Initiative**, you will build responsive and accessible UIs for systems like digital mail tracking, eKYC portals, parcel automation dashboards, and rural fintech services. 

💡 You'll collaborate with backend engineers, UI/UX teams, and system integrators to craft powerful web tools used by millions. Experience in accessibility, performance tuning, and secure coding is highly preferred.

  `,
    createdAt: new Date(),

    rounds: [
        {
            name: "Screening Round",
            description: `
This initial round filters candidates based on basic technical knowledge, communication skills, and role-fit.
It may include:
- Resume walkthrough
- Basic HTML, CSS, JS, and Git questions
- Project discussion & motivation
- Work authorization, availability, and salary expectations
      `,
            avgDuration: 900 // 15 minutes
        },

        {
            name: "Frontend Technical Round",
            description: `
In-depth React.js + JS round with live coding (JS/TS). You will be asked to:
- Create a simple form/dashboard with React.
- Show understanding of hooks, state, effects, props drilling vs context.
- Discuss accessibility practices, responsive design, and optimization.
- Solve UI bugs or improve code readability.
      `,
            avgDuration: 1800 // 30 minutes
        },

        {
            name: "System Design & Integration",
            description: `
This round focuses on integration into large systems like postal services:
- Discuss API integration, auth layers, and caching strategies.
- Design a frontend for a real-time parcel tracking system.
- How to sync data between low-connectivity POs and central DB?
- Demonstrate architectural decisions (folder structure, scalability).
      `,
            avgDuration: 2700 // 45 minutes
        },

        {
            name: "Behavioral & Culture Fit",
            description: `
Assesses candidate's alignment with team ethics and work culture:
- Past team conflict resolution
- Working under pressure
- Collaborating with non-tech stakeholders (postal workers, clerks)
- Honesty, work integrity, and public-service mindset
      `,
            avgDuration: 1500 // 25 minutes
        },

        {
            name: "Final Managerial Round",
            description: `
Discussion with CTO or senior manager about:
- Long-term vision
- Project priorities
- Willingness for on-site deployments (especially rural projects)
- Open discussion + salary negotiation
      `,
            avgDuration: 1200 // 20 minutes
        }
    ]
};
