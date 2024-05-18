import { storefrontClient } from "@/clients/storeFrontClient";
import { CategoryView } from "@/views/Category/CategoryView";
import { Metadata } from "next";


export const revalidate = 3600
export const dynamic = "force-static"

interface CategoryPageProps {
  params: { slug: string; page: string }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${params.slug} | Enterprise Commerce`,
    description: "In excepteur elit mollit in.",
  }
}

export async function generateStaticParams() {
  const collections = (await storefrontClient.getCollections()) || []

  return collections.map((collection) => Array.from({ length: 3 }, (_, i) => i + 2).map((page) => ({ slug: collection.handle, page: page.toString() }))).flat()
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryView searchParams={{ page: params.page }} params={params} />
}