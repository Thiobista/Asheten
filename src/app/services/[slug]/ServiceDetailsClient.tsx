"use client";

import featuresData from "@/components/Features/featuresData";
import { notFound } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function ServiceDetailsClient({ slug }: { slug: string }) {
  const service = featuresData.find((f) => f.slug === slug);
  const { t } = useLanguage();
  if (!service) return notFound();

  const isTourTravel = slug === "tour-and-travel-services";
  const isImportExport = slug === "import-and-export";
  const isWholesaleRetail = slug === "wholesale-and-retail-trade";
  const isRepairServices = slug === "repair-services";
  const isHotelRestaurant = slug === "hotel-and-restaurant-services";
  const isBusinessSolutions = slug === "business-solutions";

  // The following content blocks mirror the server file, but we will translate at render-time via t()
  const tourTravelContent = {
    overview: {
      title: "Discover Ethiopia and Beyond",
      description:
        "At ASHETEN INVESTMENT ONE MEMBER PLC, we specialize in creating unforgettable travel experiences. Whether you're exploring the rich cultural heritage of Ethiopia or planning international adventures, our expert team ensures seamless, memorable journeys tailored to your preferences.",
    },
    services: [
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        title: "Inbound Tours",
        description:
          "Explore Ethiopia's breathtaking landscapes, ancient historical sites, and diverse cultures. From the rock-hewn churches of Lalibela to the Simien Mountains, we curate authentic Ethiopian experiences.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        ),
        title: "Outbound Tours",
        description:
          "Plan your international adventures with our outbound travel services. We handle all aspects of international travel, from visa processing to accommodation booking and itinerary planning.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        title: "Cultural Tours",
        description:
          "Immerse yourself in Ethiopia's rich cultural heritage. Experience traditional ceremonies, visit local communities, and discover the unique customs and traditions that make Ethiopia special.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        title: "Business Travel",
        description:
          "Streamlined corporate travel solutions for professionals. We manage business trips, conference attendance, and corporate retreats with efficiency and professionalism.",
      },
    ],
    destinations: [
      "Lalibela - Rock-Hewn Churches",
      "Axum - Ancient Kingdom",
      "Gondar - Royal Enclosure",
      "Simien Mountains National Park",
      "Danakil Depression",
      "Omo Valley - Cultural Diversity",
      "Bale Mountains National Park",
      "Lake Tana & Blue Nile Falls",
    ],
    features: [
      "Expert local guides and multilingual support",
      "Customized itineraries tailored to your interests",
      "24/7 customer support during your journey",
      "Competitive pricing with transparent costs",
      "Hand-picked accommodations and dining options",
      "Comprehensive travel insurance options",
      "Visa assistance and documentation support",
      "Safe and reliable transportation",
    ],
    gallery: [
      { src: "/images/tour-travel/tour-01.jpg", alt: "Burj Al Arab and Jumeirah Beach Dubai", caption: "Burj Al Arab and Jumeirah Beach, Dubai" },
      { src: "/images/tour-travel/tour-02.jpg", alt: "Dubai skyline at dusk with Burj Khalifa", caption: "Dubai skyline at dusk with Burj Khalifa" },
      { src: "/images/tour-travel/tour-03.jpg", alt: "Dubai city skyline with Burj Khalifa", caption: "Dubai city skyline with Burj Khalifa" },
      { src: "/images/tour-travel/tour-04.jpg", alt: "Atlantis The Palm resort Dubai", caption: "Atlantis, The Palm resort on Palm Jumeirah, Dubai" },
      { src: "/images/tour-travel/tour-05.jpg", alt: "Ain Dubai Ferris wheel Dubai", caption: "Ain Dubai Ferris wheel and city skyline, Dubai" },
      { src: "/images/tour-travel/tour-06.jpg", alt: "Dubai port with cruise ships", caption: "Dubai port with cruise ships and city skyline" },
    ] as { src: string; alt: string; caption: string }[],
    process: [
      { step: "01", title: "Consultation", description: "Share your travel preferences, budget, and interests with our travel experts." },
      { step: "02", title: "Itinerary Design", description: "We create a customized itinerary that matches your needs and expectations." },
      { step: "03", title: "Booking & Confirmation", description: "We handle all bookings, confirmations, and necessary documentation." },
      { step: "04", title: "Travel & Support", description: "Enjoy your journey with our continuous support and assistance throughout." },
    ],
  };

  const hotelRestaurantContent = {
    overview: {
      title: "Excellence in Hospitality Services",
      description:
        "Premium hotel and restaurant operations combining Ethiopian hospitality with modern standards for memorable guest experiences.",
    },
    services: [
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
        title: "Hotel Management",
        description:
          "Front office, housekeeping, guest services, and facility operations to ensure smooth stays and satisfaction.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        ),
        title: "Restaurant Operations",
        description:
          "Menu planning, kitchen management, service excellence, and quality control for outstanding dining.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        title: "Event Management",
        description:
          "End-to-end planning and execution for conferences, weddings, and corporate functions.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "Quality Assurance",
        description:
          "Hygiene, safety, and service standards with continuous audits and training.",
      },
    ],
    amenities: [
      "Comfortable Accommodations",
      "Fine Dining Restaurants",
      "Conference Facilities",
      "Event Spaces",
      "Recreation Areas",
      "Business Services",
      "Wi-Fi & Connectivity",
      "Parking Facilities",
      "24/7 Reception",
      "Room Service",
    ],
    features: [
      "Experienced hospitality professionals",
      "Authentic Ethiopian and international cuisine",
      "Modern facilities with traditional charm",
      "Personalized guest services",
      "Competitive pricing and value packages",
    ],
    process: [
      { step: "01", title: "Consultation", description: "We discuss your needs, preferences, and special requirements." },
      { step: "02", title: "Reservation & Planning", description: "We handle reservations, confirm details, and prepare for arrival or event." },
      { step: "03", title: "Service Delivery", description: "Our team provides exceptional service throughout your stay or event." },
      { step: "04", title: "Follow-up", description: "We follow up to ensure satisfaction and welcome feedback." },
    ],
  };

  const businessSolutionsContent = {
    overview: {
      title: "Strategic Business Consulting & Support",
      description:
        "Comprehensive consulting to help companies grow in Ethiopia with strategy, market insights, and operational excellence.",
    },
    services: [
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
        ),
        title: "Strategic Planning",
        description:
          "Goal setting, opportunity identification, and actionable roadmaps for growth.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 2 0 002 2z" />
          </svg>
        ),
        title: "Market Analysis",
        description:
          "Research to understand trends, competition, and customer needs for informed decisions.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        ),
        title: "Operational Excellence",
        description:
          "Process optimization to boost efficiency, reduce costs, and improve productivity.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Financial Consulting",
        description:
          "Budgeting, analysis, and capital planning to support sound investments.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        title: "Business Development",
        description:
          "Growth strategies, partnerships, and new revenue streams to expand reach.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "Compliance & Legal Support",
        description:
          "Licensing, regulatory compliance, and legal guidance for operations in Ethiopia.",
      },
    ],
    serviceAreas: [
      "Strategic Planning",
      "Market Research",
      "Financial Analysis",
      "Operations Management",
      "Business Development",
      "Compliance & Legal",
      "Technology Solutions",
      "Human Resources",
      "Marketing & Sales",
      "Supply Chain Optimization",
    ],
    features: [
      "Experienced business consultants",
      "Deep knowledge of Ethiopian market",
      "Customized solutions for your business",
      "Data-driven decision making",
      "Comprehensive business support",
    ],
    process: [
      { step: "01", title: "Business Assessment", description: "We analyze your current situation, challenges, and opportunities." },
      { step: "02", title: "Solution Development", description: "We develop tailored strategies and solutions." },
      { step: "03", title: "Implementation Support", description: "We guide execution to ensure success." },
      { step: "04", title: "Monitoring & Optimization", description: "We monitor results and optimize continuously." },
    ],
  };

  const wholesaleRetailContent = {
    overview: {
      title: "Comprehensive Trading Solutions for Your Business",
      description:
        "We provide end-to-end wholesale and retail trading services with reliable sourcing, competitive pricing, and efficient distribution across Ethiopia.",
    },
    services: [
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
        title: "Wholesale Distribution",
        description:
          "Bulk procurement and distribution services to help businesses reduce costs and reach markets efficiently.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        ),
        title: "Retail Operations",
        description:
          "Store operations, inventory control, and customer service excellence to grow your retail business.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Supply Chain Management",
        description:
          "Efficient sourcing, warehousing, and distribution to maintain optimal inventory levels and on-time delivery.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Product Sourcing",
        description:
          "Strategic sourcing from verified suppliers and manufacturers to meet your quality and price targets.",
      },
    ],
    categories: [
      "Consumer Goods",
      "Electronics & Appliances",
      "Textiles & Clothing",
      "Food & Beverages",
      "Building Materials",
      "Automotive Parts",
      "Agricultural Supplies",
      "Office Equipment",
    ],
    features: [
      "Competitive pricing with bulk discounts",
      "Reliable supply chain and distribution network",
      "Quality assurance and product verification",
      "Comprehensive inventory management",
      "Fast and efficient delivery services",
    ],
    process: [
      { step: "01", title: "Needs Assessment", description: "We understand your target market, volume, and product requirements." },
      { step: "02", title: "Product Sourcing", description: "We source quality products that match your specifications and budget." },
      { step: "03", title: "Order Processing", description: "We manage orders, quality checks, and shipment preparation." },
      { step: "04", title: "Delivery & Support", description: "We deliver to your location and provide after-sales support." },
    ],
  };

  const repairServicesContent = {
    overview: {
      title: "Professional Repair & Maintenance Solutions",
      description:
        "Expert repair and maintenance for a wide range of equipment and machinery to minimize downtime and extend lifespan.",
    },
    services: [
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
        title: "Equipment Repair",
        description:
          "Diagnostics and repair for industrial equipment, electronics, and tools to restore optimal performance.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "Preventive Maintenance",
        description:
          "Scheduled maintenance programs to prevent breakdowns and keep assets running reliably.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        ),
        title: "Emergency Repairs",
        description:
          "24/7 rapid-response repair services to minimize downtime and restore operations quickly.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        ),
        title: "Parts Replacement",
        description:
          "Quality replacement parts and proper installation for long-lasting performance.",
      },
    ],
    categories: [
      "Industrial Machinery",
      "Electronics & Appliances",
      "Automotive Equipment",
      "Construction Equipment",
      "Agricultural Machinery",
      "Power Tools",
      "Medical Equipment",
      "Telecommunications",
    ],
    features: [
      "Experienced and certified technicians",
      "Quality parts and genuine replacements",
      "Fast turnaround times",
      "Competitive pricing with transparent costs",
      "Emergency repair services available",
    ],
    process: [
      { step: "01", title: "Diagnosis", description: "We inspect and diagnose the root cause to scope repairs accurately." },
      { step: "02", title: "Quote & Approval", description: "You receive a clear quote; we proceed upon your approval." },
      { step: "03", title: "Repair & Service", description: "We perform the necessary repairs using best practices and quality parts." },
      { step: "04", title: "Testing & Delivery", description: "We test thoroughly and hand over with guidance and warranty." },
    ],
  };

  const importExportContent = {
    overview: {
      title: "Global Trade Solutions for Your Business",
      description:
        "ASHETEN INVESTMENT ONE MEMBER PLC provides comprehensive import and export services that facilitate seamless international trade. Our expertise in Ethiopian customs regulations, documentation, and logistics ensures your goods move efficiently across borders. We handle everything from customs clearance to final delivery, making international trade simple and reliable.",
    },
    services: [
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        ),
        title: "Import Services",
        description:
          "Streamlined import solutions for businesses bringing goods into Ethiopia. We handle customs clearance, duty payments, documentation, and ensure compliance with all Ethiopian import regulations and requirements.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        ),
        title: "Export Services",
        description:
          "Comprehensive export services to help Ethiopian businesses reach international markets. We manage export documentation, compliance, shipping coordination, and ensure your products meet destination country requirements.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        title: "Customs Clearance",
        description:
          "Expert customs clearance services ensuring fast and compliant processing at Ethiopian ports and borders. Our team understands all regulations and works directly with customs authorities to minimize delays.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        title: "Documentation & Compliance",
        description:
          "Complete documentation management including commercial invoices, certificates of origin, packing lists, and all required permits. We ensure full compliance with both Ethiopian and international trade regulations.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
        title: "Logistics & Shipping",
        description:
          "End-to-end logistics solutions from origin to destination. We coordinate with shipping lines, airlines, and freight forwarders to ensure timely and cost-effective transportation of your goods.",
      },
      {
        icon: (
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        title: "Trade Finance Support",
        description:
          "Assistance with trade finance solutions including letters of credit, trade insurance, and payment processing to facilitate smooth international transactions and reduce financial risks.",
      },
    ],
    productCategories: [
      "Agricultural Products",
      "Textiles & Apparel",
      "Machinery & Equipment",
      "Electronics & Technology",
      "Pharmaceuticals",
      "Food & Beverages",
      "Construction Materials",
      "Raw Materials",
      "Consumer Goods",
      "Industrial Supplies",
    ],
    features: [
      "Expert knowledge of Ethiopian customs regulations",
      "Fast and efficient customs clearance processing",
      "Comprehensive documentation management",
      "Competitive pricing with transparent fees",
      "Real-time shipment tracking and updates",
      "Dedicated account management for each client",
      "Compliance with international trade standards",
      "Strategic partnerships with global logistics networks",
    ],
    process: [
      { step: "01", title: "Initial Consultation", description: "We discuss your import/export needs, product details, and destination requirements to understand your specific requirements." },
      { step: "02", title: "Documentation & Preparation", description: "Our team prepares all necessary documentation, obtains permits, and ensures compliance with all regulations." },
      { step: "03", title: "Shipping & Logistics", description: "We coordinate transportation, handle customs clearance, and manage the entire shipping process efficiently." },
      { step: "04", title: "Delivery & Follow-up", description: "We ensure timely delivery and provide post-delivery support to ensure your complete satisfaction." },
    ],
  };

  // TODO: wholesaleRetailContent, repairServicesContent, hotelRestaurantContent, businessSolutionsContent can be added similarly if we need section-level translations now.

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl mb-12 md:mb-16">
          <div className="text-center mb-8">
            <div className="bg-primary/10 text-primary mb-6 inline-flex h-[70px] w-[70px] items-center justify-center rounded-md">
              {service.icon}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-5xl">
              {t(service.title)}
            </h1>
            <p className="text-body-color text-lg leading-relaxed md:text-xl">
              {t(service.paragraph)}
            </p>
          </div>
        </div>

        {/* Service-Specific Content */}
        {isTourTravel && (
          <div className="space-y-16 md:space-y-20">
            {/* Overview Section */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-[#124448] rounded-lg border border-[#124448] p-8 md:p-12">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t(tourTravelContent.overview.title)}</h2>
                <p className="text-white/80 text-base leading-relaxed md:text-lg">{t(tourTravelContent.overview.description)}</p>
              </div>
            </div>

            {/* Services Offered */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Our Travel Services")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {tourTravelContent.services.map((item, index) => (
                  <div key={index} className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="bg-white/10 text-white mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">{item.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Destinations */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Popular Destinations in Ethiopia")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tourTravelContent.destinations.map((d, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(d)}</li>
                ))}
              </ul>
            </div>

            {/* Photo Gallery */}
            {tourTravelContent.gallery.length > 0 && (
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Photo Gallery")}</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {tourTravelContent.gallery.map((img, idx) => (
                    <figure key={idx} className="overflow-hidden rounded-lg bg-[#124448]">
                      <div className="relative h-48 w-full bg-[#0f3b3e]">
                        <img 
                          src={img.src} 
                          alt={t(img.alt)} 
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.image-placeholder')) {
                              const placeholder = document.createElement('div');
                              placeholder.className = 'image-placeholder flex items-center justify-center h-full text-white/50';
                              placeholder.innerHTML = `
                                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              `;
                              parent.appendChild(placeholder);
                            }
                          }}
                        />
                      </div>
                      <figcaption className="p-3 text-white text-sm">{t(img.caption)}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Key Features")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {tourTravelContent.features.map((f, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(f)}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("How We Work")}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {tourTravelContent.process.map((p, i) => (
                  <div key={i} className="rounded-lg bg-[#124448] text-white p-6">
                    <div className="mb-2 text-[#d4af37] font-semibold">{p.step}</div>
                    <h3 className="mb-2 text-xl font-semibold">{t(p.title)}</h3>
                    <p className="text-white/80">{t(p.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isHotelRestaurant && (
          <div className="space-y-16 md:space-y-20">
            {/* Overview */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-[#124448] rounded-lg border border-[#124448] p-8 md:p-12">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t(hotelRestaurantContent.overview.title)}</h2>
                <p className="text-white/80 text-base leading-relaxed md:text-lg">{t(hotelRestaurantContent.overview.description)}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Services We Provide")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {hotelRestaurantContent.services.map((item, index) => (
                  <div key={index} className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="bg-white/10 text-white mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">{item.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Our Amenities & Facilities")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {hotelRestaurantContent.amenities.map((c, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(c)}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Key Features")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {hotelRestaurantContent.features.map((f, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(f)}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("How We Work")}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {hotelRestaurantContent.process.map((p, i) => (
                  <div key={i} className="rounded-lg bg-[#124448] text-white p-6">
                    <div className="mb-2 text-[#d4af37] font-semibold">{p.step}</div>
                    <h3 className="mb-2 text-xl font-semibold">{t(p.title)}</h3>
                    <p className="text-white/80">{t(p.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isBusinessSolutions && (
          <div className="space-y-16 md:space-y-20">
            {/* Overview */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-[#124448] rounded-lg border border-[#124448] p-8 md:p-12">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t(businessSolutionsContent.overview.title)}</h2>
                <p className="text-white/80 text-base leading-relaxed md:text-lg">{t(businessSolutionsContent.overview.description)}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Services We Provide")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {businessSolutionsContent.services.map((item, index) => (
                  <div key={index} className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="bg-white/10 text-white mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">{item.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Areas */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Service Areas We Cover")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {businessSolutionsContent.serviceAreas.map((c, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(c)}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Key Features")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {businessSolutionsContent.features.map((f, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(f)}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("How We Work")}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {businessSolutionsContent.process.map((p, i) => (
                  <div key={i} className="rounded-lg bg-[#124448] text-white p-6">
                    <div className="mb-2 text-[#d4af37] font-semibold">{p.step}</div>
                    <h3 className="mb-2 text-xl font-semibold">{t(p.title)}</h3>
                    <p className="text-white/80">{t(p.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isWholesaleRetail && (
          <div className="space-y-16 md:space-y-20">
            {/* Overview */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-[#124448] rounded-lg border border-[#124448] p-8 md:p-12">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t(wholesaleRetailContent.overview.title)}</h2>
                <p className="text-white/80 text-base leading-relaxed md:text-lg">{t(wholesaleRetailContent.overview.description)}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Services We Provide")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {wholesaleRetailContent.services.map((item, index) => (
                  <div key={index} className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="bg-white/10 text-white mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">{item.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Product Categories")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {wholesaleRetailContent.categories.map((c, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(c)}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Key Features")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {wholesaleRetailContent.features.map((f, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(f)}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("How We Work")}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {wholesaleRetailContent.process.map((p, i) => (
                  <div key={i} className="rounded-lg bg-[#124448] text-white p-6">
                    <div className="mb-2 text-[#d4af37] font-semibold">{p.step}</div>
                    <h3 className="mb-2 text-xl font-semibold">{t(p.title)}</h3>
                    <p className="text-white/80">{t(p.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {isRepairServices && (
          <div className="space-y-16 md:space-y-20">
            {/* Overview */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-[#124448] rounded-lg border border-[#124448] p-8 md:p-12">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t(repairServicesContent.overview.title)}</h2>
                <p className="text-white/80 text-base leading-relaxed md:text-lg">{t(repairServicesContent.overview.description)}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Services We Provide")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {repairServicesContent.services.map((item, index) => (
                  <div key={index} className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="bg-white/10 text-white mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">{item.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Product Categories")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {repairServicesContent.categories.map((c, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(c)}</li>
                ))}
              </ul>
            </div>

            {/* Features */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Key Features")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {repairServicesContent.features.map((f, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(f)}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("How We Work")}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {repairServicesContent.process.map((p, i) => (
                  <div key={i} className="rounded-lg bg-[#124448] text-white p-6">
                    <div className="mb-2 text-[#d4af37] font-semibold">{p.step}</div>
                    <h3 className="mb-2 text-xl font-semibold">{t(p.title)}</h3>
                    <p className="text-white/80">{t(p.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {isImportExport && (
          <div className="space-y-16 md:space-y-20">
            {/* Overview */}
            <div className="mx-auto max-w-4xl">
              <div className="bg-[#124448] rounded-lg border border-[#124448] p-8 md:p-12">
                <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">{t(importExportContent.overview.title)}</h2>
                <p className="text-white/80 text-base leading-relaxed md:text-lg">{t(importExportContent.overview.description)}</p>
              </div>
            </div>

            {/* Services */}
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Services We Provide")}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {importExportContent.services.map((item, index) => (
                  <div key={index} className="bg-[#124448] rounded-lg border border-[#124448] p-6 shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="bg-white/10 text-white mb-4 inline-flex h-12 w-12 items-center justify-center rounded-md">{item.icon}</div>
                    <h3 className="mb-3 text-xl font-semibold text-white">{t(item.title)}</h3>
                    <p className="text-white/80 text-base leading-relaxed">{t(item.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Categories */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Product Categories")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {importExportContent.productCategories.map((c, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(c)}</li>
                ))}
              </ul>
            </div>

            {/* Key Features */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("Key Features")}</h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {importExportContent.features.map((f, i) => (
                  <li key={i} className="rounded-md bg-[#124448] text-white px-4 py-3">{t(f)}</li>
                ))}
              </ul>
            </div>

            {/* Process */}
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white md:text-3xl">{t("How We Work")}</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {importExportContent.process.map((p, i) => (
                  <div key={i} className="rounded-lg bg-[#124448] text-white p-6">
                    <div className="mb-2 text-[#d4af37] font-semibold">{p.step}</div>
                    <h3 className="mb-2 text-xl font-semibold">{t(p.title)}</h3>
                    <p className="text-white/80">{t(p.description)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TODO: Render other service detail sections (wholesale, repair, hotel, business) similarly, wrapped with t() */}
      </div>
    </section>
  );
}
