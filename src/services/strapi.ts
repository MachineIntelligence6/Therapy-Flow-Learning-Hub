import type { Article, Category, StrapiConfig } from '../types';
import blogImage from '../assets/Blog Image.png';

const STORAGE_KEY = 'learninghub_strapi_config';
const DEFAULT_API_URL = 'http://localhost:1337';

const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Getting Started with Therapy Flow',
    description: 'Whether you are a patient booking your first session or a therapist setting up your practice, learn the basics of navigating your portal, managing documents, and scheduling appointments.',
    slug: 'getting-started-with-therapy-flow',
    publishedAt: '2026-06-29T12:00:00.000Z',
    category: 'Getting Started',
    readTime: '5 min read',
    image: blogImage,
    breadcrumb: 'Home / Therapy Flow Learning Hub',
    sections: [
      {
        id: 101,
        tabLabel: 'Practitioner Profile',
        title: '1. Setting Up Your Practitioner Profile',
        description: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Before inviting clients, ensure your profile is fully complete. Go to Settings > Profile to add your bio, profile picture, certification details, and office address. A complete profile helps clients feel safe and build trust before their first session.' }]
          }
        ]
      },
      {
        id: 102,
        tabLabel: 'Availability',
        title: '2. Configuring Availability & Scheduling',
        description: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'Navigate to the Calendar tab to configure your weekly slots. You can set recurring hours, buffer times between sessions, and maximum appointments per day. We integrate directly with Google and Outlook calendars, meaning you will never be double-booked.' }]
          }
        ]
      },
      {
        id: 103,
        tabLabel: 'Client Intake',
        title: '3. Client Intake Forms & Onboarding',
        description: [
          {
            type: 'paragraph',
            children: [{ type: 'text', text: 'With our automated workflows, you can request digital signatures on HIPAA-compliant intake forms as soon as a client schedules their initial assessment. Choose from our standard template library or design custom questionnaires to capture symptoms, histories, and insurance details upfront.' }]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'The Patient Portal',
    description: 'Learn how to book virtual or in-person sessions, pay invoices, upload medical records, and message your practitioner securely.',
    slug: 'the-patient-portal',
    publishedAt: '2026-06-28T10:00:00.000Z',
    category: 'Patient Portal',
    readTime: '4 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 3,
    title: 'Therapist Dashboard & Client Management',
    description: 'Master your daily workflow. Learn how to add clients, review patient timelines, and manage treatment progress notes.',
    slug: 'therapist-dashboard-and-client-management',
    publishedAt: '2026-06-27T09:15:00.000Z',
    category: 'Dashboard',
    readTime: '6 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 4,
    title: 'Scheduling & Session Workflows',
    description: 'A complete guide to the therapist calendar, booking room availability, and using voice-to-text session notes templates.',
    slug: 'scheduling-and-session-workflows',
    publishedAt: '2026-06-26T14:30:00.000Z',
    category: 'Scheduling',
    readTime: '5 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 5,
    title: 'Billing & Invoicing',
    description: 'Track total balances, monitor collected payments, and manage pending invoices for insurance and private pay clients.',
    slug: 'billing-and-invoicing',
    publishedAt: '2026-06-25T11:45:00.000Z',
    category: 'Billing',
    readTime: '8 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 6,
    title: 'Content & Clinical Libraries',
    description: "Learn how to build and manage the platform's core resources, including standardized assessments, exercises, and questionnaires.",
    slug: 'content-and-clinical-libraries',
    publishedAt: '2026-06-24T08:00:00.000Z',
    category: 'Clinical',
    readTime: '7 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 7,
    title: 'User & Role Management',
    description: 'A guide to controlling system access. Learn how to add new staff, assign professional supervisor roles, and configure custom permissions.',
    slug: 'user-and-role-management',
    publishedAt: '2026-06-23T10:00:00.000Z',
    category: 'Access',
    readTime: '5 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 8,
    title: 'Compliance & Security Monitoring',
    description: 'Master your administrative dashboard to monitor HIPAA audit logs, track PHI access, and generate system security certificates.',
    slug: 'compliance-and-security-monitoring',
    publishedAt: '2026-06-22T12:00:00.000Z',
    category: 'Security',
    readTime: '9 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 9,
    title: 'System Settings & Data Integrity',
    description: 'Keep your system clean and optimized. Learn how to run duplication detection scans on client profiles and export practice data.',
    slug: 'system-settings-and-data-integrity',
    publishedAt: '2026-06-21T15:00:00.000Z',
    category: 'Settings',
    readTime: '6 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 10,
    title: 'Patient Account Setup & Verification',
    description: 'A walkthrough on sending verification links to patients, managing credential resets, and configuring MFA policies.',
    slug: 'patient-account-setup-and-verification',
    publishedAt: '2026-06-20T10:00:00.000Z',
    category: 'Patient Portal',
    readTime: '4 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 11,
    title: 'Intake Questionnaires & Custom Forms',
    description: 'Create customizable intake questionnaires. Map form fields directly into patient demographics database tables.',
    slug: 'intake-questionnaires-and-custom-forms',
    publishedAt: '2026-06-19T09:00:00.000Z',
    category: 'Clinical',
    readTime: '7 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 12,
    title: 'Multi-Location Scheduling & Room Allocations',
    description: 'Configure multiple clinic locations, assign therapists to physical rooms, and coordinate digital telehealth URLs.',
    slug: 'multi-location-scheduling',
    publishedAt: '2026-06-18T14:00:00.000Z',
    category: 'Scheduling',
    readTime: '5 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 13,
    title: 'Custom Superbills & Insurance Claims',
    description: 'Generate formatted superbills for out-of-network reimbursement. Export standard CMS-1500 claim sheets.',
    slug: 'custom-superbills-and-insurance-claims',
    publishedAt: '2026-06-17T11:00:00.000Z',
    category: 'Billing',
    readTime: '8 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 14,
    title: 'Outcome Measures & Progress Templates',
    description: 'Select standardized psychological assessments (like PHQ-9 and GAD-7) and assign them to patient queues.',
    slug: 'outcome-measures-templates',
    publishedAt: '2026-06-16T08:00:00.000Z',
    category: 'Clinical',
    readTime: '6 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 15,
    title: 'Supervisor Permissions & Caseload Oversight',
    description: 'Establish supervisor access guidelines. Review progress notes drafts and co-sign HIPAA clinical treatment logs.',
    slug: 'supervisor-permissions',
    publishedAt: '2026-06-15T10:00:00.000Z',
    category: 'Access',
    readTime: '5 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 16,
    title: 'HIPAA Log Auditing & Activity Records',
    description: 'Review full system records of client health records downloads, staff access audits, and clinical export logs.',
    slug: 'hipaa-log-auditing',
    publishedAt: '2026-06-14T12:00:00.000Z',
    category: 'Security',
    readTime: '9 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 17,
    title: 'Client Profile Deduplication Wizard',
    description: 'Resolve duplicate patient files. Sync appointment records, case logs, and bills into a unified history.',
    slug: 'client-profile-deduplication',
    publishedAt: '2026-06-13T15:00:00.000Z',
    category: 'Settings',
    readTime: '6 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 18,
    title: 'Setting Up Telehealth Video Sessions',
    description: 'Enable secure peer-to-peer web RTC video spaces. Manage virtual screensharing and secure group calls.',
    slug: 'setting-up-telehealth-video-sessions',
    publishedAt: '2026-06-12T10:00:00.000Z',
    category: 'Patient Portal',
    readTime: '4 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 19,
    title: 'Secure Client-Therapist Messaging Guides',
    description: 'Configure active messaging thresholds, secure out-of-office autorepliers, and attachment file scanners.',
    slug: 'secure-messaging-guides',
    publishedAt: '2026-06-11T09:00:00.000Z',
    category: 'Patient Portal',
    readTime: '7 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 20,
    title: 'E-Signature Requirements & Signing Queues',
    description: 'Assign digital signature requirements on clinic disclosure policies and practice authorization packets.',
    slug: 'e-signature-requirements',
    publishedAt: '2026-06-10T14:00:00.000Z',
    category: 'Clinical',
    readTime: '5 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 21,
    title: 'Integrating Stripe Payments & Processing Logs',
    description: 'Link your Stripe account. Setup automatic co-pay invoice runs and manage payment cards on file.',
    slug: 'integrating-stripe-payments',
    publishedAt: '2026-06-09T11:00:00.000Z',
    category: 'Billing',
    readTime: '8 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 22,
    title: 'Document Library Management & Caseload Folders',
    description: 'Organize files into clinic cabinet paths. Share exercises, media guides, and resources with clients.',
    slug: 'document-library-management',
    publishedAt: '2026-06-08T08:00:00.000Z',
    category: 'Clinical',
    readTime: '6 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 23,
    title: 'Password Complexity Policies & MFA Rules',
    description: 'Enforce practice-wide complexity schemas. Enforce authenticator-based multi-factor rules on admin profiles.',
    slug: 'password-complexity-policies',
    publishedAt: '2026-06-07T10:00:00.000Z',
    category: 'Security',
    readTime: '5 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 24,
    title: 'Automatic Email Reminders & SMS Prompts',
    description: 'Configure practice notifications. Schedule intake reminders, billing bills, and session check-ins.',
    slug: 'automatic-email-reminders',
    publishedAt: '2026-06-06T12:00:00.000Z',
    category: 'Settings',
    readTime: '9 min read',
    image: blogImage,
    sections: []
  },
  {
    id: 25,
    title: 'Data Export & Portability Guide',
    description: 'Generate standard encrypted XML packages of case notes, treatment plans, and billing histories.',
    slug: 'data-export-and-portability',
    publishedAt: '2026-06-05T15:00:00.000Z',
    category: 'Settings',
    readTime: '6 min read',
    image: blogImage,
    sections: []
  }
];

// Centralized fetch helper for Strapi endpoints
const apiFetch = async (endpoint: string, config: StrapiConfig): Promise<any> => {
  const baseUrl = config.apiUrl || DEFAULT_API_URL;
  const response = await fetch(`${baseUrl}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API request failed for ${endpoint}: ${response.statusText}`);
  }
  return response.json();
};

// Helper to calculate reading time based on content block words count
const calculateReadingTime = (content: any, sections: any[] | undefined): string => {
  let wordCount = 0;

  const countWords = (text: string) => {
    if (!text) return;
    wordCount += text.trim().split(/\s+/).filter(Boolean).length;
  };

  const countWordsInNode = (node: any) => {
    if (!node) return;
    if (node.type === 'text' && typeof node.text === 'string') {
      countWords(node.text);
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(countWordsInNode);
    }
  };

  if (content) {
    if (Array.isArray(content)) {
      content.forEach(countWordsInNode);
    } else if (typeof content === 'string') {
      countWords(content);
    }
  }

  if (sections && Array.isArray(sections)) {
    sections.forEach(sec => {
      if (sec.title) countWords(sec.title);
      if (sec.description) {
        if (Array.isArray(sec.description)) {
          sec.description.forEach(countWordsInNode);
        } else if (typeof sec.description === 'string') {
          countWords(sec.description);
        }
      }
    });
  }

  if (wordCount === 0) {
    return '3 min read'; // Fallback default
  }

  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
};

// Helper to map Strapi responses (V4/V5 compliant) to frontend Article models
const mapStrapiEntryToArticle = (item: any, config: StrapiConfig): Article => {
  const id = item.id;
  const attrs = item.attributes ? item.attributes : item;

  // 1. Image parsing (points cleanly to Cloudflare R2 media paths or local uploads)
  let imageUrl = blogImage;
  if (attrs.Card_Image) {
    const media = attrs.Card_Image.data ? attrs.Card_Image.data : attrs.Card_Image;
    if (media) {
      const mediaAttrs = media.attributes ? media.attributes : media;
      const url = mediaAttrs.url;
      if (url) {
        imageUrl = url.startsWith('/') ? `${config.apiUrl}${url}` : url;
      }
    }
  } else if (attrs.thumbnail) {
    // Backward compatibility fallback for thumbnail
    const media = attrs.thumbnail.data ? attrs.thumbnail.data : attrs.thumbnail;
    if (media) {
      const mediaAttrs = media.attributes ? media.attributes : media;
      const url = mediaAttrs.url;
      if (url) {
        imageUrl = url.startsWith('/') ? `${config.apiUrl}${url}` : url;
      }
    }
  }

  // 2. Reading time parsing (fallback to auto-calculated if blank/zero)
  let readTime = '5 min read';
  const content = attrs.Content || attrs.content || null;
  const rawSections = attrs.Sections || attrs.sections || undefined;
  
  const readingTimeValue = attrs.Reading_Time !== undefined && attrs.Reading_Time !== null ? attrs.Reading_Time : 
                           attrs.reading_time !== undefined && attrs.reading_time !== null ? attrs.reading_time :
                           attrs.readingTime !== undefined && attrs.readingTime !== null ? attrs.readingTime :
                           undefined;

  if (readingTimeValue !== undefined && readingTimeValue !== null && readingTimeValue !== 0) {
    readTime = `${readingTimeValue} min read`;
  } else {
    readTime = calculateReadingTime(content, rawSections);
  }

  // 3. Date parsing
  const publishedAt = attrs.Publish_Date || attrs.publishedAt || new Date().toISOString();

  // 5. Sections dynamic zone parsing for backward compatibility
  const sections = rawSections ? rawSections.map((sec: any) => {
    let blogFileUrl = '';
    const blogFile = sec.blogFile || sec.blog_file;
    if (blogFile) {
      const fileMedia = blogFile.data ? blogFile.data : blogFile;
      if (fileMedia && (fileMedia.attributes || fileMedia.url)) {
        const fileAttrs = fileMedia.attributes ? fileMedia.attributes : fileMedia;
        const url = fileAttrs.url;
        if (url) {
          blogFileUrl = url.startsWith('/') ? `${config.apiUrl}${url}` : url;
        }
      }
    }
    return {
      id: sec.id,
      tabLabel: sec.tabLabel || sec.tab_label || sec.title || 'Section',
      title: sec.title || '',
      description: sec.description || [],
      blogFileUrl
    };
  }) : [];

  return {
    id,
    title: attrs.title || '',
    description: attrs.Description || attrs.description || attrs.intro || '',
    slug: attrs.slug || '',
    publishedAt,
    category: attrs.Category_Tag || attrs.category || 'General',
    readTime,
    image: imageUrl,
    breadcrumb: attrs.breadcrumb || 'Home / Therapy Flow Learning Hub',
    isFeatured: !!attrs.Is_Featured,
    content,
    sections: sections.length > 0 ? sections : undefined
  };
};

export const strapiService = {
  getConfig(): StrapiConfig {
    const envApiUrl = import.meta.env.VITE_STRAPI_API_URL;
    const envEnabled = import.meta.env.VITE_STRAPI_ENABLED;

    if (envApiUrl !== undefined || envEnabled !== undefined) {
      return {
        apiUrl: envApiUrl || DEFAULT_API_URL,
        isEnabled: envEnabled === 'true' || envEnabled === true
      };
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse Strapi config', e);
      }
    }
    return { apiUrl: DEFAULT_API_URL, isEnabled: false };
  },

  saveConfig(config: StrapiConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },

  async testConnection(apiUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${apiUrl}/api/learning-hubs?pagination[pageSize]=1`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      return response.ok;
    } catch (e) {
      console.warn('Strapi connection test failed:', e);
      return false;
    }
  },

  async getCategories(): Promise<Category[]> {
    return [
      { id: 1, name: 'All', slug: 'all' },
      { id: 2, name: 'Customization', slug: 'customization' },
      { id: 3, name: 'Communication', slug: 'communication' },
      { id: 4, name: 'Security', slug: 'security' },
      { id: 5, name: 'Benefits', slug: 'benefits' },
      { id: 6, name: 'FAQs', slug: 'faqs' }
    ];
  },

  async getFeaturedArticle(): Promise<Article | null> {
    const config = this.getConfig();
    if (!config.isEnabled) {
      return MOCK_ARTICLES.length > 0 ? MOCK_ARTICLES[0] : null;
    }

    try {
      const json = await apiFetch('/api/learning-hubs?filters[Is_Featured][$eq]=true&populate=*', config);
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return mapStrapiEntryToArticle(json.data[0], config);
      }
      return null;
    } catch (e) {
      console.error('Failed fetching featured article from Strapi, falling back to mock.', e);
      return MOCK_ARTICLES.length > 0 ? MOCK_ARTICLES[0] : null;
    }
  },

  async getArticles(): Promise<Article[]> {
    const config = this.getConfig();
    if (!config.isEnabled) {
      return MOCK_ARTICLES;
    }

    try {
      const json = await apiFetch('/api/learning-hubs?populate=*', config);
      if (json.data && Array.isArray(json.data)) {
        return json.data.map((item: any) => mapStrapiEntryToArticle(item, config));
      }
      return MOCK_ARTICLES;
    } catch (e) {
      console.error('Failed fetching learning hubs from Strapi, falling back to mock.', e);
      return MOCK_ARTICLES;
    }
  },

  async getArticleBySlug(slug: string): Promise<Article | null> {
    const config = this.getConfig();
    if (!config.isEnabled) {
      const mock = MOCK_ARTICLES.find(a => a.slug === slug);
      return mock || null;
    }

    try {
      const json = await apiFetch(`/api/learning-hubs?filters[slug][$eq]=${slug}&populate=*`, config);
      if (json.data && Array.isArray(json.data) && json.data.length > 0) {
        return mapStrapiEntryToArticle(json.data[0], config);
      }
      return null;
    } catch (e) {
      console.error(`Failed fetching details for slug ${slug}, falling back to mock.`, e);
      const mock = MOCK_ARTICLES.find(a => a.slug === slug);
      return mock || null;
    }
  }
};
