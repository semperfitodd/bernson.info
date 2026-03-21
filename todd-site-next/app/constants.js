import { faCalendarAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

const URLS = {
  linkedin: 'https://www.linkedin.com/in/todd-bernson/',
  github:   'https://github.com/semperfitodd',
  email:    'mailto:todd@bernsonfamily.com',
  calendly: 'https://calendly.com/todd-bernson',
}

export const CALENDLY_URL = URLS.calendly

export const NAV_ITEMS = [
  { id: 'about',    label: 'About' },
  { id: 'expertise',label: 'Expertise' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'articles', label: 'Articles' },
  { id: 'contact',  label: 'Contact' },
]

export const SOCIAL_LINKS = [
  { href: URLS.linkedin, icon: faLinkedin,    label: 'LinkedIn' },
  { href: URLS.github,   icon: faGithub,      label: 'GitHub' },
  { href: URLS.email,    icon: faEnvelope,    label: 'Email' },
  { href: URLS.calendly, icon: faCalendarAlt, label: 'Schedule a call' },
]

export const CONTACT_LINKS = [
  { label: 'LinkedIn',                          href: URLS.linkedin, external: true },
  { label: 'Schedule a Call',                   href: URLS.calendly, external: true },
  { label: URLS.email.replace('mailto:', ''),   href: URLS.email,    external: false },
  { label: 'GitHub',                            href: URLS.github,   external: true },
]

export const FOOTER_LINKS = [
  { label: 'LinkedIn', href: URLS.linkedin },
  { label: 'GitHub',   href: URLS.github },
  { label: 'Email',    href: URLS.email },
]

export const EXPERTISE_AREAS = [
  {
    category: 'Artificial Intelligence',
    items: ['Agentic AI Systems', 'MLOps & Model Deployment', 'LLM Integration', 'Voice AI & Synthesis', 'Real-Time Inference', 'Responsible AI'],
  },
  {
    category: 'Cloud Architecture',
    items: ['AWS (12 Certifications)', 'Multi-Cloud Strategy', 'Serverless Architecture', 'Kubernetes & EKS', 'Infrastructure as Code', 'Cost Optimization'],
  },
  {
    category: 'Technical Leadership',
    items: ['Engineering Team Development', 'Enterprise Architecture', 'DevOps & CI/CD', 'Security & Compliance', 'Fortune 500 Delivery', 'Technical Strategy'],
  },
]

export const IMPACT_STATS = [
  { value: '30+', label: 'Cloud Certifications' },
  { value: '3×',  label: 'AWS Ambassador Award Winner' },
  { value: '#1',  label: 'North America Ambassador' },
  { value: '52+', label: 'Open Source Repos' },
]

export const SPEAKING_TALKS = [
  { event: 'AWS Summit', title: 'Real-Time AI Data Enrichment for Legacy Workloads in AWS' },
  { event: 'AWS Summit', title: 'COBOL in the Cloud' },
  { event: 'AWS Summit', title: 'Self-hosted AI model application development' },
  { event: 'AWS Summit', title: 'Enhancing Security Compliance for Mainframe Migrations on AWS' },
]

export const OPEN_SOURCE_PROJECTS = [
  {
    name: 'agentic_ai',
    description: 'Production-grade, application-first agentic AI system for sprint intelligence with deterministic workflows, AI analysis, and web/mobile delivery.',
    topics: ['Agentic AI', 'AWS', 'Step Functions', 'React', 'SwiftUI'],
    url: `${URLS.github}/agentic_ai`,
  },
  {
    name: 'dreamcanvas',
    description: 'Self-hosted image generation pipeline using Stable Diffusion on AWS. Containerized with Docker, deployed via Terraform.',
    topics: ['Docker', 'AWS', 'Stable Diffusion', 'Terraform'],
    url: `${URLS.github}/dreamcanvas`,
  },
  {
    name: 'voice_clone',
    description: 'Real-time, self-hosted voice synthesis platform built with Tortoise TTS, Flask, Kubernetes, ArgoCD, and Terraform on AWS.',
    topics: ['Voice AI', 'Kubernetes', 'Terraform', 'Flask', 'AWS'],
    url: `${URLS.github}/voice_clone`,
  },
]
