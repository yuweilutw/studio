import { Wind } from 'lucide-react';

export function Header() {
  return (
    <header className="py-4 px-4 md:px-6 shadow-sm bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b">
      <div className="container mx-auto flex items-center gap-2">
        <Wind className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-3xl font-bold text-gray-800">
          WanderWise
        </h1>
      </div>
    </header>
  );
}
