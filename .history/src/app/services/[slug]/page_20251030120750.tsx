import { Metadata } from "next";
import featuresData from "@/components/Features/featuresData";
import { notFound } from "next/navigation";

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  return featuresData.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const service = featuresData.find((f) => f.slug === params.slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.title} | Services`,
    description: service.paragraph,
  };
}

export default function ServiceDetailsPage({ params }: any) {
  const service = featuresData.find((f) => f.slug === params.slug);
  if (!service) return notFound();

  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="bg-primary/10 text-primary mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-md">
              {service.icon}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">
              {service.title}
            </h1>
            <p className="text-body-color text-base leading-relaxed">
              {service.paragraph}
            </p>
          </div>

          {/* Placeholder for richer details per service */}
          <div className="prose prose-neutral dark:prose-invert">
            <p>
              More details about {service.title} will go here. You can expand this
              section with service-specific content, images, FAQs, pricing, and
              contact actions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

