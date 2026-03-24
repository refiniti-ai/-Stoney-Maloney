import { shopifyClient, PRODUCT_BY_HANDLE_QUERY, PRODUCT_HANDLES_QUERY } from '@/lib/shopify';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const params: { handle: string }[] = [];
  if (shopifyClient) {
    try {
      const { data } = await shopifyClient.request(PRODUCT_HANDLES_QUERY, {
        variables: { first: 100 },
      });
      const handles = data?.products?.edges?.map((e: { node: { handle: string } }) => e.node.handle) ?? [];
      params.push(...handles.map((h: string) => ({ handle: h })));
    } catch {
      // API error - use placeholder so static export succeeds
    }
  }
  if (params.length === 0) params.push({ handle: '__placeholder__' });
  return params;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  let product: {
    id: string;
    title: string;
    description: string;
    featuredImage?: { url: string; altText?: string };
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants?: { edges: { node: { id: string; title: string; price: { amount: string; currencyCode: string } } }[] };
  } | null = null;

  if (shopifyClient) {
    try {
      const { data } = await shopifyClient.request(PRODUCT_BY_HANDLE_QUERY, {
        variables: { handle },
      });
      product = data?.product ?? null;
    } catch (err) {
      console.error('Shopify product error:', err);
    }
  }

  if (!product || handle === '__placeholder__') return notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/products/" className="text-gray-600 hover:underline mb-6 inline-block">
        ← Back to products
      </Link>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {product.featuredImage?.url && (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="rounded-lg w-full aspect-square object-cover"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-gray-700 mb-4">
            {product.priceRange.minVariantPrice.currencyCode}{' '}
            {product.priceRange.minVariantPrice.amount}
          </p>
          {product.description && (
            <div
              className="prose text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          <a
            href={`https://stoney-maloney-usa.myshopify.com/products/${handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Buy on Shopify
          </a>
        </div>
      </div>
    </div>
  );
}
