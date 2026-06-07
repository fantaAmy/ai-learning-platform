export default function VideoPlayer({
  url,
  title,
  vertical = false,
}: {
  url: string;
  title: string;
  vertical?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full overflow-hidden rounded-2xl bg-black ${
        vertical ? "max-w-xs aspect-[9/16]" : "aspect-video"
      }`}
    >
      <iframe
        className="h-full w-full"
        src={url}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
