/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  category: "AUTOMATION" | "CAD DESIGN" | "ROBOTICS" | "EMBEDDED SYSTEMS";
  client?: string;
  period: string;
  summary: string;
  problem: string;
  solution: string;
  technologies: string[];
  imageUrl: string;
  specifications: { label: string; value: string }[];
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; level: string; icon: string; description: string }[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  highlights: string[];
}

export interface ReferenceItem {
  name: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
}
