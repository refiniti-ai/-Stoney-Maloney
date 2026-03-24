import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Stoney Maloney USA
        </Link>
        <nav>
          <Link href="/products/" className="text-gray-600 hover:text-gray-900 ml-4">
            Products
          </Link>
        </nav>
      </div>
    </header>
  );
}
