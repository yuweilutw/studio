import Image from 'next/image';

type ImageCardProps = {
  imageUrl: string;
  imageHint: string;
  description: string;
  location: string;
}

export function ImageCard({ imageUrl, imageHint, description, location }: ImageCardProps) {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl">
      <Image
        src={imageUrl}
        alt={description}
        fill
        className="object-cover"
        data-ai-hint={imageHint}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-6">
        <h2 className="font-headline text-4xl font-bold text-white shadow-2xl capitalize">
          {location}
        </h2>
      </div>
    </div>
  );
}
