export interface KeyFeatureItem {
  title: string;
  description: string;
  tag?: string;
}

export interface TechStackGroup {
  category: string;
  skills: string[];
}

export interface ArchitectureLayerItem {
  layer: string;
  title: string;
  description: string;
  tech: string;
}

export interface WorkflowStepItem {
  step: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  categoryBadge: string;
  categoryBadgeBg: string;
  version: string;
  subtitle: string;
  roleTimeline: string;
  status: string;
  liveUrl: string;
  githubUrl: string;

  // 1. Hero & Meta
  heroTags?: string[];

  // 2. Project Overview
  overview: string;
  overviewSummary: string;

  // 3. Problem Statement
  problemTitle: string;
  problemBody: string;
  problemPoints: string[];

  // 4. Solution
  solutionTitle: string;
  solutionBody: string;
  solutionPoints: string[];

  // 5. Key Features
  keyFeatures: KeyFeatureItem[];

  // 6. Screenshots & Gallery
  previewImage: string;
  galleryCaption: string;

  // 7. Technologies Used
  techStack: TechStackGroup[];
  techPills: { label: string; bg: string }[];

  // 8. System Architecture
  architectureOverview: string;
  architectureLayers: ArchitectureLayerItem[];

  // 9. How It Works
  howItWorks: WorkflowStepItem[];

  // 10. My Role & Contributions
  myRole: string;
  contributions: string[];
}
