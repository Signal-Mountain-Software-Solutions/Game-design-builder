import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Save,
  Sparkles,
  RefreshCcw,
  PanelTop,
  FileOutput,
} from "lucide-react";
import { useBuilder } from "@/features/game-design-builder/builderContext";

function ActionGroup({ title, children }) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
        {title}
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function DashboardHero() {
  const {
    completion,
    quickStats,
    saveLocal,
    applyGenreSuggestions,
    resetAll,
    savedAt,
    setActiveTab,
  } = useBuilder();

  return (
    <Card className="overflow-visible rounded-[28px] border-0 bg-slate-950 text-white shadow-2xl">
      <CardContent className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
        {/* Left side */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="rounded-full bg-violet-500/20 px-3 py-1 text-violet-200 hover:bg-violet-500/20">
              AI-ready game design workflow
            </Badge>

            <Badge className="rounded-full bg-white/10 px-3 py-1 text-white hover:bg-white/10">
              Concept → GDD → starter engine
            </Badge>
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Game Design Document Builder
            </h1>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
              Capture a new game concept, progressively build out systems and content, configure
              reusable AI output instructions, and export implementation-ready documents for an AI
              development partner.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/5 p-4 backdrop-blur">
                <div className="text-xs uppercase tracking-wide text-slate-400">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-4 rounded-[24px] bg-white/5 p-5 backdrop-blur">
          {/* Progress */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Progress</div>
              <div className="text-xs text-slate-300">
                Fill enough to produce a strong AI-ready concept package.
              </div>
            </div>

            <div className="text-2xl font-semibold">{completion}%</div>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{ width: `${completion}%` }}
            />
          </div>

          {/* Product-grade command bar */}
          <div className="rounded-[20px] border border-white/10 bg-black/10 p-3">
            <div className="flex flex-col gap-4">
              <ActionGroup title="Primary">
                <Button
                  onClick={saveLocal}
                  className="rounded-2xl bg-white text-slate-950 hover:bg-slate-100"
                >
                  <Save className="mr-2 h-4 w-4 shrink-0" />
                  <span>Save</span>
                </Button>
              </ActionGroup>

              <ActionGroup title="Design Tools">
                <Button
                  variant="secondary"
                  onClick={applyGenreSuggestions}
                  className="rounded-2xl border-0 bg-violet-500 text-white hover:bg-violet-600"
                >
                  <Sparkles className="mr-2 h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Apply Suggestions</span>
                  <span className="sm:hidden">Apply</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={resetAll}
                  className="rounded-2xl border border-white/10 text-white hover:bg-white/10"
                >
                  <RefreshCcw className="mr-2 h-4 w-4 shrink-0" />
                  <span>Reset</span>
                </Button>
              </ActionGroup>

              <ActionGroup title="Output">
                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("outputStudio")}
                  className="rounded-2xl border border-white/10 text-white hover:bg-white/10"
                >
                  <PanelTop className="mr-2 h-4 w-4 shrink-0" />
                  <span className="hidden sm:inline">Output Studio</span>
                  <span className="sm:hidden">Studio</span>
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => setActiveTab("outputs")}
                  className="rounded-2xl border border-white/10 text-white hover:bg-white/10"
                >
                  <FileOutput className="mr-2 h-4 w-4 shrink-0" />
                  <span>Outputs</span>
                </Button>
              </ActionGroup>
            </div>
          </div>

          {savedAt ? (
            <div className="text-xs text-slate-400">Last saved: {savedAt}</div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
