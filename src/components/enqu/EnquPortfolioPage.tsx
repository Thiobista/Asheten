"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

type Service = {
  title: string;
  description: string;
  tag: string;
};

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  gitUrl: string;
  previewUrl: string;
};

const services: Service[] = [
  {
    title: "Web Development",
    description: "Conversion-focused web platforms with fast rendering and maintainable architecture.",
    tag: "React + Next.js + Vue + Nuxt",
  },
  {
    title: "Mobile App Development",
    description: "Cross-platform apps with smooth UX and robust integrations for real business workflows.",
    tag: "iOS + Android + Flutter",
  },
  {
    title: "UI/UX Design",
    description: "Research-driven product design that improves usability, trust, and customer retention.",
    tag: "Design Systems",
  },
  {
    title: "Backend & API Development",
    description: "Secure, scalable backend services built for growth, reliability, and observability.",
    tag: "Node.js + Go",
  },
];

const projectsData: Project[] = [
  {
    id: 1,
    title: "Food Recipe Site",
    description:
      "Platform for browsing, sharing, and managing recipes with filtering, ratings, and comments. Built with Go, Vue 3, TailwindCSS, Hasura, and Postgres.",
    image: "/images/food.jpg",
    gitUrl: "https://github.com/Thiobista/Food-recipe-site1",
    previewUrl: "",
  },
  {
    id: 2,
    title: "Lanet Mobile App",
    description:
      "LANET is a modern language learning platform that helps users practice, track progress, and improve communication skills for Ethiopian languages.",
    image: "/images/lanet.png",
    gitUrl: "https://github.com/rahel-yekoye/lanet-mobile",
    previewUrl: "",
  },
  {
    id: 3,
    title: "AVS Startup Hub Management System",
    description:
      "Web-based platform designed to manage startup applications, partnerships, and startup portfolios in a centralized system.",
    image: "/images/avs.png",
    gitUrl: "https://github.com/Thiobista/AVS",
    previewUrl: "https://avs-wehm.vercel.app/",
  },
  {
    id: 4,
    title: "Shega Date",
    description:
      "ShegaDate is a smart date-spot recommendation platform that helps users discover the best places to go on dates based on their preferences and location.",
    image: "/images/shegadate.png",
    gitUrl: "https://github.com/Thiobista/ShegaDate",
    previewUrl: "",
  },
  {
    id: 5,
    title: "Asheten",
    description: "Company portfolio website.",
    image: "/images/asheten.png",
    gitUrl: "https://github.com/Thiobista/Asheten",
    previewUrl: "",
  },
  {
    id: 6,
    title: "OCR System",
    description: "A mobile app that scans Amharic text.",
    image: "/images/ocr.png",
    gitUrl: "https://github.com/Thiobista/OCR",
    previewUrl: "",
  },
  {
    id: 10,
    title: "Landing Page",
    description:
      "Conversion-focused landing page built with semantic HTML, modern CSS, and JavaScript interactions.",
    image: "/images/lnd.jpg",
    gitUrl: "",
    previewUrl: "",
  },
];

const testimonials = [
  {
    quote:
      "ENQU translated our idea into a product that users immediately adopted. Their delivery speed and code quality stood out from day one.",
    name: "Selam Bekele",
  },
  {
    quote:
      "They acted like a true product partner, not just a vendor. We launched faster and our team now ships with more confidence.",
    name: "Michael Hart",
  },
  {
    quote:
      "The AI automation they implemented removed repetitive tasks across departments and improved reliability at scale.",
    name: "Ruth Chen",
  },
];

const process = ["Discovery", "Design", "Development", "Testing", "Launch & Support"];

const stackGroups = {
  Frontend: ["React", "Next.js", "Vue", "Nuxt", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Go", "Supabase", "PostgreSQL"],
  DevOps: ["Docker", "CI/CD", "Vercel"],
};

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

export default function EnquPortfolioPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(246,224,131,0.1),transparent_40%),#050505] text-[#fff9eb]">
      <header className="sticky top-0 z-50 border-b border-[#d4af37]/25 bg-black/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-[#ffe49f]">
            <Image src="/images/logo/logo.png" alt="ENQU Logo" width={64} height={64} className="h-16 w-16 rounded-full border border-[#d4af37]/60 p-0.5" />
            ENQU
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-[#f6d777] md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="mailto:enkukenqu@gmail.com" className="text-sm font-semibold text-[#fff0c4] hover:text-white">
              enkukenqu@gmail.com
            </a>
          </div>
        </div>
      </header>

      <section className="container grid gap-12 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
        <motion.div {...fadeInUp}>
          <p className="mb-4 inline-flex rounded-full border border-[#d4af37]/40 bg-[#d4af37]/12 px-3 py-1 text-xs font-medium text-[#ffe8ad]">
            Software Company Portfolio
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Elevating Software to Art
          </h1>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:enkukenqu@gmail.com"
              className="rounded-full bg-gradient-to-r from-[#a77a14] via-[#d4af37] to-[#f3d77a] px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Email Us
            </a>
            <a
              href="#portfolio"
              className="rounded-full border border-[#d4af37]/60 bg-black/50 px-6 py-3 text-sm font-semibold text-[#ffedba] transition hover:bg-black/65"
            >
              View Our Work
            </a>
          </div>
        </motion.div>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-[#d4af37]/30 bg-black/50 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#d4af37]/25 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-[#f3d77a]/25 blur-3xl" />
          <div className="relative space-y-4">
            <div className="flex items-center gap-4 rounded-2xl border border-[#d4af37]/40 bg-black/45 p-4">
              <Image src="/images/logo/logo.png" alt="ENQU" width={72} height={72} className="h-16 w-16 rounded-full" />
              <p className="text-sm text-[#fff0c4]">Premium digital craftsmanship inspired by precision and elegance.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Fast Delivery", "Scalable APIs", "Human-Centered UX", "Reliable Support"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#d4af37]/30 bg-black/45 p-3 text-sm text-[#f5e7be]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section id="services" className="container py-14">
        <motion.div {...fadeInUp} className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Services</h2>
        </motion.div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              {...fadeInUp}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="group rounded-2xl border border-[#d4af37]/30 bg-black/40 p-5 shadow-sm backdrop-blur-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#d4af37]/15 text-[#f6d777]">
                ●
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-[#dcc98d]">{service.description}</p>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[#f6d777]">{service.tag}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="portfolio" className="container py-14">
        <motion.div {...fadeInUp} className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Portfolio</h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project, index) => (
            <motion.article
              key={project.id}
              {...fadeInUp}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl border border-[#d4af37]/35 bg-black/40 backdrop-blur-lg transition hover:border-[#f6d777]"
            >
              <div className="relative h-44 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#fff6d8]">{project.title}</h3>
                <p className="mt-3 text-sm text-[#f0ddb0]">{project.description}</p>
                <div className="mt-5 flex gap-3">
                  {project.gitUrl && (
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#d4af37]/50 px-3 py-1 text-xs font-medium text-[#f6d777] hover:bg-[#d4af37]/10"
                    >
                      GitHub
                    </a>
                  )}
                  {project.previewUrl && (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#d4af37]/50 px-3 py-1 text-xs font-medium text-[#f6d777] hover:bg-[#d4af37]/10"
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="process" className="container py-14">
        <motion.div {...fadeInUp} className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Process</h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {process.map((step, index) => (
            <motion.div
              key={step}
              {...fadeInUp}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-xl border border-[#d4af37]/30 bg-black/40 p-4 text-center"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[#f6d777]">Step {index + 1}</p>
              <p className="mt-2 text-sm font-semibold">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container py-14">
        <motion.div {...fadeInUp} className="rounded-3xl border border-[#d4af37]/30 bg-black/40 p-8 backdrop-blur-lg">
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Why Choose ENQU</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Fast delivery with product-level quality",
              "Scalable architecture for growth stages",
              "Elegant user experience with premium design quality",
              "Clean and maintainable engineering standards",
              "Client-focused collaboration and transparent communication",
            ].map((item) => (
              <p key={item} className="rounded-xl border border-[#d4af37]/25 bg-black/45 px-4 py-3 text-sm text-[#ddcb95]">
                {item}
              </p>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container py-14">
        <motion.div {...fadeInUp} className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Testimonials</h2>
        </motion.div>
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.blockquote
              key={item.name}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-[#d4af37]/30 bg-black/40 p-6"
            >
              <p className="text-sm leading-relaxed text-[#ddcb95]">“{item.quote}”</p>
              <footer className="mt-4 text-sm font-semibold">
                {item.name}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section className="container py-14">
        <motion.div {...fadeInUp} className="mb-10">
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Tech Stack</h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2">
          {Object.entries(stackGroups).map(([group, items]) => (
            <motion.div
              key={group}
              {...fadeInUp}
              className="rounded-2xl border border-[#d4af37]/30 bg-black/40 p-6"
            >
              <h3 className="text-lg font-semibold">{group}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={`${group}-${item}`}
                    className="rounded-full border border-[#d4af37]/40 px-3 py-1 text-sm text-[#ddcb95]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="about" className="container py-14">
        <motion.div {...fadeInUp} className="grid gap-8 rounded-3xl border border-[#d4af37]/30 bg-black/40 p-8 backdrop-blur-lg md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">About ENQU</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#ddcb95]">
              ENQU was founded to help ambitious teams ship software that combines usability, speed, and intelligence.
              We partner with startups and growing companies to turn product ideas into high-performing digital
              experiences.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#fff0c4]">Mission</h3>
            <p className="mt-4 text-sm leading-relaxed text-[#ddcb95]">
              Empower businesses with refined digital solutions by blending modern engineering and reliable delivery
              practices.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="container py-14">
        <motion.div
          {...fadeInUp}
          className="rounded-3xl border border-[#d4af37]/35 bg-gradient-to-r from-[#d4af37]/20 via-[#d8b65b]/10 to-transparent p-8"
        >
          <h2 className="text-3xl font-semibold tracking-tight text-[#fff0c4]">Let&apos;s Build Something Great Together</h2>
          <p className="mt-3 text-[#f2e1b7]">
            From concept to launch, ENQU helps you move faster with software built for real outcomes.
          </p>
          <a
            href="mailto:enkukenqu@gmail.com"
            className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#a77a14] via-[#d4af37] to-[#f3d77a] px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            enkukenqu@gmail.com
          </a>
        </motion.div>
      </section>
    </main>
  );
}
