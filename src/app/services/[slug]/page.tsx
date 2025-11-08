import { Metadata } from "next";
import featuresData from "@/components/Features/featuresData";
import { notFound } from "next/navigation";
import ServiceDetailsClient from "./ServiceDetailsClient";

export async function generateStaticParams() {
  return featuresData.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = featuresData.find((f) => f.slug === slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} | Services`,
    description: service.paragraph,
  };
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = featuresData.find((f) => f.slug === slug);
  if (!service) return notFound();
  return <ServiceDetailsClient slug={slug} />;
}