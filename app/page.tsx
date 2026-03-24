import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Stoney Maloney USA</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our store. Explore our collection of quality products.
        </p>
        <Link
          href="/products/"
          className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
