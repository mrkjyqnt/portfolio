export function SectionLabel({
  title,
  hint,
}: {
  title: string
  hint?: string
}) {
  return (
    <div className="mb-6 flex items-baseline gap-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      {hint && (
        <span className="font-mono text-xs text-muted-foreground">· {hint}</span>
      )}
    </div>
  )
}
