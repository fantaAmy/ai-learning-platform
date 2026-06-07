export default function ProgressBar({
  percent,
  showLabel = false,
}: {
  percent: number;
  showLabel?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-full">
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#333]">
        <div
          className="h-full rounded-full bg-[#E50914] transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-gray-500">{clamped}% 완료</p>
      )}
    </div>
  );
}
