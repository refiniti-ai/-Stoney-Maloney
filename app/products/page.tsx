import { shopifyClient, PRODUCTS_QUERY } from '@/lib/shopify';
import Link from 'next/link';

export default async function ProductsPage() {
  let products: { id: string; title: string; handle: string; featuredImage?: { url: string; altText?: string }; priceRange: { minVariantPrice: { amount: string; currencyCode: string } } }[] = [];

  if (shopifyClient) {
    try {
      const { data } = await shopifyClient.request(PRODUCTS_QUERY, {
        variables: { first: 24 },
      });
      products = data?.products?.edges?.map((e: { node: unknown }) => e.node) ?? [];
    } catch (err) {
      console.error('Shopify products error:', err);
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-600">
          No products yet. Add products in Shopify Admin and ensure your Storefront API token is configured.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.handle}/`}
              className="group border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              {product.featuredImage?.url && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  className="w-full aspect-square object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-semibold group-hover:underline">{product.title}</h2>
                <p className="text-gray-600 mt-1">
                  {product.priceRange.minVariantPrice.currencyCode}{' '}
                  {product.priceRange.minVariantPrice.amount}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
