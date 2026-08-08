import type { WebDictionary } from "../dictionary";

export const en: WebDictionary = {
  meta: { siteName: "Existcode" },
  nav: {
    home: "Home",
    services: "Services",
    pricing: "Pricing",
    blog: "Blog",
    news: "News",
    contact: "Contact"
  },
  rail: {
    overview: "Overview",
    services: "Services",
    pricing: "Pricing",
    blog: "Blog",
    news: "News",
    trackOrder: "Track Order",
    contact: "Contact",
    contactUs: "Contact Us",
    whatsapp: "WhatsApp",
    email: "Email",
    phone: "Phone"
  },
  footer: {
    rights: "PT Existcode Digital Kreasi. All rights reserved.",
    about: "About Us",
    contact: "Contact"
  },
  home: {
    badge: "Your Software Development Partner",
    heroTitle: "We Build the Digital Products Your Business Needs",
    heroSubtitle:
      "From web applications and mobile to cloud infrastructure — Existcode helps turn ideas into products you can rely on.",
    ctaPricing: "View Pricing",
    ctaServices: "Explore Services",
    featuredServices: "Featured Services",
    popularPlan: "Popular Plan",
    latestArticles: "Latest Articles",
    seeAll: "See All"
  },
  services: {
    title: "Our Services",
    subtitle: "End-to-end digital solutions for your business — from web and mobile to cloud infrastructure.",
    loadError: "Failed to load the services list. Please try again later.",
    notFound: "Service not found.",
    backToList: "Back to services",
    relatedPlans: "Related Plans",
    noPlansCta: "Discuss Your Needs"
  },
  pricing: {
    title: "Pricing & Plans",
    subtitle: "Transparent plans tailored to your business needs. Need something more specific? Get in touch.",
    loadError: "Failed to load pricing. Please try again later.",
    mostPopular: "Most Popular",
    choosePlan: "Choose Plan",
    contactUs: "Contact Us",
    oneTime: "one-time",
    perMonth: "/month",
    perYear: "/year",
    contactPrice: "Contact Us"
  },
  blog: {
    title: "Blog",
    subtitle: "Tips, case studies, and technology insights from the Existcode team.",
    categories: "Categories",
    allArticles: "All Articles",
    noArticles: "No articles in this category yet.",
    loadError: "Failed to load articles.",
    minRead: "min read",
    notFound: "Article not found.",
    backToList: "Back to Blog",
    by: "By"
  },
  news: {
    title: "News",
    subtitle: "The latest updates from Existcode.",
    loadError: "Failed to load news.",
    notFound: "News item not found.",
    backToList: "Back to News",
    types: {
      announcement: "Announcement",
      milestone: "Milestone",
      press: "Press",
      product_update: "Product Update"
    }
  },
  contact: {
    title: "Contact",
    subtitle: "Have a project or a question? Send us a message and our team will get back to you shortly.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    phoneOptional: "Phone (optional)",
    subject: "Subject",
    subjectOptional: "Subject (optional)",
    message: "Message",
    messagePlaceholder: "Tell us what you need...",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message sent",
    successMessage: (name, email) => `Thank you, ${name}. Our team will reach out to you shortly via ${email}.`,
    errorTitle: "Failed to send message",
    errorMessage: "Please check the details you entered and try again."
  },
  about: {
    title: "About Us",
    intro1:
      "Existcode is a software development studio that helps businesses build digital products — from websites and mobile apps to cloud infrastructure. We believe great technology comes from close collaboration between technical teams and a deep understanding of client business needs.",
    intro2:
      "Since our founding, dozens of clients across industries have trusted us to turn their ideas into real, reliable products that grow alongside their business.",
    statProjects: "Projects Completed",
    statClients: "Happy Clients",
    statYears: "Years of Experience",
    statTeam: "Team Members",
    valuesTitle: "Our Values",
    valueTransparentTitle: "Transparent",
    valueTransparentBody: "Honest communication and regular progress updates on every project.",
    valueQualityTitle: "High Quality",
    valueQualityBody: "Clean, tested code built to be relied on for the long haul.",
    valueSustainableTitle: "Sustainable",
    valueSustainableBody: "Support doesn't stop at launch — we're your long-term partner."
  },
  order: {
    title: "Order",
    subtitle: "Fill in the details below to order your chosen plan. Our team will reach out once payment is confirmed.",
    plan: "Plan",
    selectPlan: "Select a plan",
    fullName: "Full Name",
    email: "Email",
    whatsapp: "WhatsApp Number",
    company: "Company Name",
    companyOptional: "Company Name (optional)",
    notes: "Project Notes",
    notesOptional: "Project Notes (optional)",
    notesPlaceholder: "Tell us about your project...",
    submit: "Place Order",
    processing: "Processing...",
    errorTitle: "Failed to create order",
    errorFallback: "Please check your details and try again.",
    summaryTitle: "Order Summary",
    summarySelectPrompt: "Select a plan to see the summary.",
    total: "Total"
  },
  orderLookup: {
    title: "Track Order",
    subtitle: "Enter your order number (format: ORD-XXXXXXXX-XXXXXX) to check the payment status.",
    placeholder: "ORD-20260806-ABC123",
    submit: "Track Order"
  },
  payment: {
    title: "Payment",
    orderNumber: "Order Number",
    statusUnpaid: "Awaiting Payment",
    statusPaid: "Paid",
    totalDue: "Total Due",
    dueDate: "Payment due date",
    bankTransfer: "Bank Transfer",
    bankName: "Bank",
    accountNumber: "Account Number",
    accountHolder: "Account Holder",
    confirmTitle: "Confirm Payment",
    confirmHint: "Already transferred? Confirm it below.",
    confirmNotePlaceholder: "Note (optional): bank & transfer time",
    confirmButton: "Confirm Payment",
    confirming: "Processing...",
    confirmedTitle: "Payment Confirmed",
    confirmedMessage: "Thank you! Our team will reach out shortly to kick off the project.",
    backHome: "Back to Home",
    notFoundTitle: "Order not found",
    trackOther: "Track a different order",
    confirmError: "Failed to confirm payment. Please try again."
  },
  theme: {
    switcherLabel: "Theme",
    modalTitle: "Customize Appearance",
    modalSubtitle: "Set the site's theme, accent color, and layout to your liking.",
    sectionMode: "Base Theme",
    sectionAccent: "Accent Color",
    sectionLayout: "Page Layout",
    lockedNotice: "This site's theme is locked by the admin and can't be changed.",
    muteOn: "Sound On",
    muteOff: "Sound Off",
    reset: "Reset Defaults",
    apply: "Apply"
  }
};
