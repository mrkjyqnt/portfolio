import { Button } from "@/components/ui/button"

export function App() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Mark Jay Sarcia Quinto
        </h1>
        <p className="text-sm text-muted-foreground">
          Scaffold ready. Sections land in{" "}
          <code className="rounded px-1 py-0.5 font-mono text-xs">
            src/components/sections
          </code>
          .
        </p>
        <Button>Button</Button>
      </div>
    </div>
  )
}

export default App