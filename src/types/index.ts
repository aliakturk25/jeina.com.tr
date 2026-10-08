export interface IntegrationPackage {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  priceMonthly: number;
  priceAnnualMonthly: number;
  description: string;
  marketplaceCount: string;
  syncSpeed: string;
  orderLimit: string;
  warehouseModule: string;
  priceProtection: string;
  commissionAnalysis: string;
  supportLevel: string;
  features: string[];
}

export interface DynamicPageBlock {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'faq' | 'form';
  title?: string;
  subtitle?: string;
  content?: string;
  items?: { title: string; desc: string; badge?: string }[];
}

export interface DynamicPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  heroBadge?: string;
  heroTitle: string;
  heroSubtitle: string;
  targetMarketplace?: string;
  blocks: DynamicPageBlock[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DemoLead {
  id: string;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  monthlyOrders: string;
  marketplaces: string[];
  interestedPackage?: string;
  notes?: string;
  status: 'Yeni' | 'Arandı' | 'Demo Yapıldı' | 'Satışa Döndü' | 'İptal';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  enableTelegramNotification: boolean;
}
