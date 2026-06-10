import { Project, SkillCategory, ExperienceItem } from "./types";

export const profileDetails = {
  name: "Rizwan",
  handle: "@rizwanwebdev",
  title: "Full-Stack Developer",
  avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtArsx6htSZwg-3cz_YDCuDNiS2xi2sWS2YZcQzBYm-dewUYaLVr9V6q5vqSF1EaRGNtBmeUweFZtj4Mnoha6bDEGe8SElF3kVYZOxtX0vicX24ybGdqyuX5CLmvIUGvBrVapr7Je5TG3pj0RDVIWK3lPBe38V8EE2o-HM2dYByjO2fTpgU2xoG-0jBORl9NAl9gmpxTbTCQrl4CqFP-AZ2Y_wHxWLaCiRqyY8K_VTtzJ6mNyORqh-o-uOeKWuZRhgE16_vXDPwPE",
  deskImgUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9vflnI0-ekvEyaxeCAPWL7LRfjQlpOgooBn8DPds0fJZ6xp8trhgqof5E01TFM9xSfxLQsm5YpDuLYjKVXDJqUI_LWFOKXUW5ER8LfBNQstikyp225n0gl8CLc7rdo_eTgLYSXrYldm_7ZxtTEAdibuvQJDoLb1mIC6FKgNPqfvbB-2SOTgl31HmjCEk7ENv82l1iiiA-0BMvIsP8mhZ9O4YLaBZa_bvfo5aItDAH2M-N8v0zBRPijOxSgpPIRLNlgDromY2ZarM",
  emailAddress: "hey@rizwan.one",
  location: "Remote / Worldwide",
  bioHeadline: "Building modern web applications with Node.js, React, Next.js, and a focus on clean architecture. I turn complex problems into hand-crafted digital solutions.",
  missionPara1: "Full-Stack Developer with experience building modern web applications using Node.js, React, Next.js, TypeScript, PostgreSQL, and MongoDB.",
  missionPara2: "I enjoy designing and developing scalable, high-performance applications with a strong focus on clean architecture, maintainable code, and user experience. Currently focused on building products that deliver real value to users.",
  status: "Open to opportunities & collaborations",
  philosophy: "Solving complex problems by building products that deliver real value. Clean architecture isn't a luxury; it's the foundation."
};

export const skillsCategories: SkillCategory[] = [
  {
    title: "Frontend & Architecture",
    description: "Crafting responsive, performant interfaces using the modern React ecosystem.",
    skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
    iconName: "Layers",
    isCore: true
  },
  {
    title: "Back-End",
    description: "Robust server-side logic, high throughput servers, and multi-layered database schema design.",
    skills: ["Node.js", "PostgreSQL", "Redis", "MongoDB", "Express.js"],
    iconName: "Database"
  },
  {
    title: "APIs & Web Architecture",
    description: "Designing modern, secure RESTful systems, contract-first structures, and bulletproof middleware auth.",
    skills: ["REST APIs", "GraphQL", "OAuth2", "JWT", "WebSockets"],
    iconName: "Cpu"
  },
  {
    title: "DevOps",
    description: "Linux administration, version control branching, and containerized automated deployment flows.",
    skills: ["Linux", "Git", "Docker", "CI/CD", "Cloud Serverless"],
    iconName: "Terminal"
  }
];

export const recentProjects: Project[] = [
  {
    id: "project-1",
    title: "Cooking Art",
    description: "A simple and practical collection of cooking recipes and tips for home chefs.",
    tech: ["REACT.JS", "REST APIs"],
    imageUrl: "https://raw.githubusercontent.com/rizwanwebdev/screenshots/refs/heads/main/cooking-art16-9-2.png",
    codeUrl: "https://github.com/rizwanwebdev/cooking-art",
    liveUrl: "https://cookingart.vercel.app"
  },
  {
    id: "project-2",
    title: "Movies Explorer",
    description: "A web app to explore movies, view details, and discover new films.",
    tech: ["TYPESCRIPT", "REACT.JS", "TMDB API"],
    imageUrl: "https://raw.githubusercontent.com/rizwanwebdev/screenshots/refs/heads/main/movies-explorer16-9.png",
    codeUrl: "https://github.com/rizwanwebdev/movies-explorer",
    liveUrl: "https://moviesmesh.vercel.app"
  }
];

export const labNotes = [
  {
    date: "Jun 2026",
    title: "Deep-Dive: Designing Redundant High-Performance Caching Layers",
    tech: "Redis + PG",
    readTime: "4 min read"
  },
  {
    date: "May 2026",
    title: "How I Optimised JWT Checking Middleware to Less Than 0.4ms overhead",
    tech: "TypeScript",
    readTime: "7 min read"
  },
  {
    date: "Apr 2026",
    title: "The Case for Simple PostgreSQL Indexes over Overengineered Search Engines",
    tech: "PostgreSQL",
    readTime: "5 min read"
  }
];

export interface CaseStudyData {
  id: string;
  subtitle: string;
  challenge: string;
  solution: string;
  performanceMetrics: { label: string; value: string; desc: string }[];
  architectureNodes: { label: string; description: string }[];
}

export const caseStudies: Record<string, CaseStudyData> = {
  "project-1": {
    id: "project-1",
    subtitle: "High-Performance Recipe Explorer with REST API integration",
    challenge: "Home chefs need a fast, reliable way to search for recipes without dealing with cluttered interfaces or slow load times that disrupt their cooking flow.",
    solution: "We engineered a clean React front-end that interfaces with a streamlined REST API. The application utilizes intelligent state management and responsive design to ensure recipes load instantly, even on mobile devices in the kitchen.",
    performanceMetrics: [
      { label: "Load Time", value: "< 0.5s", desc: "Average time to interactive for recipe detail pages" },
      { label: "API Latency", value: "120ms", desc: "Average response time from the remote recipe endpoint" },
      { label: "Mobile Usage", value: "85%", desc: "Perfectly optimized for mobile kitchen usage scenarios" }
    ],
    architectureNodes: [
      { label: "React Frontend", description: "Provides a responsive, accessible UI for browsing and saving recipes" },
      { label: "REST API Gateway", description: "Serves recipe data efficiently with payload optimization and filtering" },
      { label: "State Management", description: "Handles complex UI state for category filtering and search queries" },
      { label: "Asset Delivery", description: "Serves high-resolution food imagery via global CDN with lazy loading" }
    ]
  },
  "project-2": {
    id: "project-2",
    subtitle: "Real-time Movie Discovery Platform leveraging TMDB API",
    challenge: "Building a cinematic browsing experience requires handling massive amounts of high-resolution images, deeply nested API data, and complex search queries without degrading client-side performance.",
    solution: "We built a robust TypeScript-driven architecture using React to render dynamic movie catalog pages while fetching and normalizing user data on the client side, significantly boosting initial load speeds and search responsiveness.",
    performanceMetrics: [
      { label: "LCP", value: "1.2s", desc: "Largest Contentful Paint optimized for image-heavy poster grids" },
      { label: "TypeScript", value: "100%", desc: "Full type safety across complex third-party API responses" },
      { label: "API Calls", value: "-40%", desc: "Reduction in external API requests through strategic local caching" }
    ],
    architectureNodes: [
      { label: "TypeScript Logic", description: "Ensures type safety across complex TMDB API movie and cast responses" },
      { label: "TMDB Integration", description: "Seamlessly fetches, debounces, and normalizes movie metadata and imagery" },
      { label: "Dynamic Routing", description: "Handles thousands of movie detail pages and genre filters efficiently" },
      { label: "Image Optimization", description: "Automatically scales and compresses movie posters on the fly via TMDB" }
    ]
  }
};

export const fiverrGigs = [
  {
    id: "gig-1",
    title: "I will design and develop optimized fullstack web applications with clean architecture using React, Next.js and Node.js Node.",
    sellerName: "Rizwan Dev",
    sellerLevel: "Level 2 Certified Developer",
    averageRating: "5.0",
    totalReviews: "148",
    priceStartingAt: 150,
    tags: ["fiverr web developer", "fivver web devloper", "web developer", "fullstack website", "nextjs", "nodejs", "pakistan dev", "system architect"],
    packages: {
      basic: {
        name: "Blueprint Shell",
        price: 150,
        deliveryTime: "3 Days Delivery",
        description: "Core logic prototype and data schema. Includes 1 high-fidelity structural screen, normalized schema blueprints, and 3 key API endpoint routes.",
        features: ["1 Page / View", "Database Schema Design", "Clean Structured API Router", "Custom Unit Testing Scaffold"]
      },
      standard: {
        name: "Interactive Full-Scale Build",
        price: 455,
        deliveryTime: "7 Days Delivery",
        description: "Comprehensive multi-view interactive fullstack system. Includes up to 5 clean responsive views, robust auth routers, persistent database storage, and complete layout panels.",
        features: ["5 Custom Pages", "Advanced Token Authentication", "Complex Interactive Dashboards", "Fully Integrated API & DB Layers", "10 Days Bug Maintenance Support"]
      },
      premium: {
        name: "Distributed Enterprise Architecture",
        price: 950,
        deliveryTime: "12 Days Delivery",
        description: "Ultimate distributed high-scale platform. Features heavy Redis caching layers, WebSockets live streaming channels, hardened microservice modules, and automated CI/CD containerization blueprints.",
        features: ["Unlimited Views / Modules", "Distributed Redis/WS Integration", "Hardened Identity Authentication Gateway", "Custom Microservice Split-up Layouts", "30 Days Extensive Dev Ops Audits"]
      }
    }
  }
];
