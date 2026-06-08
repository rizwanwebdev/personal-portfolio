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
    subtitle: "Zero-Latency Real-Time State Syncer powering thousand-node clusters",
    challenge: "Traditional state synchronization relies on expensive REST polling or unbuffered socket streams. When scaled to thousands of active client nodes, database writes spike, leading to deadlocks, memory ingestion, and single-threaded event loop blocking in mainstream Node.js microservices.",
    solution: "We designed a multi-layer pub-sub channel mesh. Real-time streams are buffered instantly in a redundant Redis cache layer. Instead of writing every frame to Postgres, a queue consumer aggregates, structuralizes, and batch-inserts states in transactional frames down to 100ms intervals, safely insulating the persistent database node.",
    performanceMetrics: [
      { label: "Transit Latency", value: "< 0.8ms", desc: "Average message propagation delay across active nodes" },
      { label: "Throughput Capacity", value: "100k msg/s", desc: "Peak load handling with zero database connection timeouts" },
      { label: "Zero-Data Losses", value: "0.000%", desc: "Durable write guarantees via synchronized Redis memory caches" }
    ],
    architectureNodes: [
      { label: "Client Node JS/React", description: "Fires optimized binary frames via lightweight standard uWS WebSocket wrappers" },
      { label: "Redis State Ingestion", description: "Aggregates, filters, and marshalls real-time transient channel payloads in memory" },
      { label: "Batch Queue Broker", description: "Runs standard cron loops to structure and commit transactions in 100ms increments" },
      { label: "PostgreSQL Database", description: "Persists structural telemetry schemas cleanly with cluster optimized index lookups" }
    ]
  },
  "project-2": {
    id: "project-2",
    subtitle: "Standalone cryptographically insulated modular authentication microservice",
    challenge: "Securing distributed services typically results in high token verification delays, fragmented auth checks, and code vulnerability from hand-rolled session verification. We needed an independent, modular gateway verifying sub-millisecond sessions safely.",
    solution: "We engineered a highly optimized TypeScript microservice utilizing isolated RSA-256 validation pairs. The service completely decouples key-validation mechanics from user DB checks by persisting real-time revoked tokens in a Redis Bloom Filter, creating instant sub-microsecond revocation validation.",
    performanceMetrics: [
      { label: "Verification Latency", value: "< 0.12ms", desc: "Average delay introduced per API check" },
      { label: "Isolated Security Scoring", value: "100%", desc: "Comprehensive score in localized session leakage audits" },
      { label: "Max Parallel Resolutions", value: "25k / sec", desc: "Tested maximum stress-load token emissions under extreme fire" }
    ],
    architectureNodes: [
      { label: "External Requests Gate", description: "Leverages blazing quick CORS controls and sanitized JSON header checks" },
      { label: "Isolated RSA Check", description: "Performs instant cryptographic verification without launching database lookups" },
      { label: "Bloom Revocation Filter", description: "Checks lightweight Redis hashes in-memory to confirm session is still authorized" },
      { label: "Session Lifecycle Cache", description: "Handles double-rotating refresh token lifespans safely with custom DB backups" }
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
