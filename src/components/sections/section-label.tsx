export function SectionLabel({
  index,
  title,
  hint,
}: {
  index: number
  title: string
  hint?: string
}) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <span className="font-mono text-xs font-medium tabular-nums text-primary">
        {String(index).padStart(2, "0")}
      </span>
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {hint && (
        <span className="font-mono text-xs text-muted-foreground">· {hint}</span>
      )}
    </div>
  )
}