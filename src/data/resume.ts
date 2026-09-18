export const RESUME = {
  name: 'Janak Narendra Vasani',
  firstName: 'Janak',
  lastName: 'Vasani',
  email: 'janaknvasani@gmail.com',
  phone: '+91 8169253446',
  linkedin: 'https://www.linkedin.com/in/janak-vasani-3306b2314?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  linkedinLabel: 'linkedin.com/in/janak-vasani-3306b2314',
  github: 'https://github.com/CodebyJanak',
  githubLabel: 'github.com/CodebyJanak',
  resumeUrl: '/Janak_Resume.pdf',
  summary:
    'Computer engineering diploma student who builds full-stack and terminal-based tools end to end, from backend architecture to deployment. Publishes open-source packages to PyPI and is interested in backend systems, real-time infrastructure, and applied AI.',
  education: {
    college: 'Shri Bhagubhai Mafatlal Polytechnic Engineering College',
    location: 'Mumbai, India',
    degree: 'Diploma in Computer Engineering',
    years: '2024 - 2027',
    result: 'Semester 4 Result: 90.56%',
  },
  skills: [
    { category: 'Languages', items: ['C/C++', 'Java', 'Python', 'JavaScript', 'HTML/CSS'] },
    { category: 'Frameworks & Tools', items: ['React', 'Node.js', 'Git & GitHub', 'Docker'] },
    { category: 'Databases', items: ['MySQL', 'PostgreSQL'] },
    {
      category: 'Systems',
      items: ['Linux', 'CI/CD Pipelines', 'Cloud', 'DevOps', 'Networking & System Administration'],
    },
    {
      category: 'AI & Other',
      items: ['Agentic AI', 'Generative AI', 'Prompt Engineering', 'Backend Development', 'UI/UX', 'Flutter/Go'],
    },
  ],
  projects: [
    {
      name: 'trmsg',
      title: 'Terminal-Based Messaging Platform',
      repo: 'https://github.com/CodebyJanak/trmsg',
      repoLabel: 'github.com/CodebyJanak/trmsg',
      points: [
        'Designed a terminal-native chat client in Python using Click for the CLI layer and WebSockets for persistent, low-latency connections between users.',
        'Packaged and published successive releases of the tool to PyPI as features were added and issues were fixed.',
        'Wrote about the build process and shared usage guidance with other developers through posts on LinkedIn.',
      ],
      stack: ['Python', 'Click', 'WebSockets'],
    },
    {
      name: 'Mesh',
      title: 'Live Streaming Platform',
      repo: 'https://github.com/CodebyJanak/Mesh',
      repoLabel: 'github.com/CodebyJanak/Mesh',
      points: [
        'Built a live streaming platform across five development phases, integrating LiveKit for video delivery and Socket.IO for real-time chat alongside each stream.',
        'Designed the backend on Node.js with Supabase for auth and storage, later replacing Prisma with raw PostgreSQL queries to fix compatibility issues and cut dependency overhead.',
        'Implemented the React frontend to handle stream state, viewer counts, and chat synchronization across concurrent sessions.',
      ],
      stack: ['React', 'Node.js', 'Supabase', 'PostgreSQL', 'LiveKit', 'Socket.IO'],
    },
    {
      name: 'Panic Button',
      title: 'Live News Intelligence Platform',
      repo: 'https://github.com/CodebyJanak/PanicButton',
      repoLabel: 'github.com/CodebyJanak/PanicButton',
      points: [
        'Built a live news aggregation platform that pulls from multiple sources and surfaces potential bias in coverage.',
        'Designed a canvas-based NewsRadar visualization to represent story clusters and source distribution in real time.',
        'Integrated Gemini AI for content analysis and redesigned the interface with a glassmorphism aesthetic in a v5 release.',
        'Deployed and maintained the application on Render.',
      ],
      stack: ['JavaScript', 'Gemini AI', 'Canvas API', 'Render'],
    },
  ],
} as const;

export type Resume = typeof RESUME;
