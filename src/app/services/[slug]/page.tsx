import { Metadata } from "next";
import featuresData from "@/components/Features/featuresData";
import { notFound } from "next/navigation";
import ServiceDetailsClient from "./ServiceDetailsClient";

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  return featuresData.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = featuresData.find((f) => f.slug === params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} | Services`,
    description: service.paragraph,
  };
}

export default function ServiceDetailsPage({ params }: PageProps) {
  const service = featuresData.find((f) => f.slug === params.slug);
  if (!service) return notFound();
  return <ServiceDetailsClient slug={params.slug} />;
}