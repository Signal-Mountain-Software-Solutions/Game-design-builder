import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useBuilder } from "@/features/game-design-builder/builderContext";
import { renderSectionPrompt } from "@/generators/sectionPrompts";
import { downloadText } from "@/lib/exportFiles";
import { slugify } from "@/lib/helpers";
import { Copy, CheckCircle2, Download, Sparkles } from "lucide-react";

const SECTION_LABELS = {
  concept: "Design North Star",
  world: "World, Lore & Narrative",
  systems: "Core Systems & Progression",
  content: "Content & Experience Design",
  assets: "Asset Pack Planning",
  technical: "Engine Starter & Technical Specs",
};

export default function SectionAiPromptPanel({ sectionKey }) {
  const { data } = useBuilder();
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    return renderSectionPrompt(sectionKey, data);
  }, [sectionKey, data]);

  const sectionLabel = SECTION_LABELS[sectionKey] || sectionKey;
  const baseName = slugify(data.meta.projectName || "untitled-game");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy AI prompt", error);
    }
  };

  const handleDownload = () => {
    downloadText(`${baseName}-${sectionKey}-ai-guide.md`, prompt);
  };

  if (!prompt) {
    return (
      <Card className="rounded-[28px] border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">AI Design Assistant</CardTitle>
          <CardDescription>
            No AI design prompt is configured for this section yet.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="rounded-[28px] border-slate-200 shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full bg-violet-100 px-3 py-1 text-violet-700 hover:bg-violet-100">
            Section AI Guide
          </Badge>
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            {sectionLabel}
          </Badge>
        </div>

        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-violet-600" />
            AI Collaboration Prompt
          </CardTitle>
          <CardDescription className="mt-1">
            Copy this prompt into Copilot, ChatGPT, or another GenAI tool to get guided,
            step-by-step help designing this section.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCopy} className="rounded-2xl">
            {copied ? (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy AI Prompt"}
          </Button>

          <Button variant="outline" onClick={handleDownload} className="rounded-2xl">
            <Download className="mr-2 h-4 w-4" />
            Download Prompt
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            How to use
          </div>

          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Copy this prompt into your AI tool.</li>
            <li>Let the AI walk you through the questions interactively.</li>
            <li>Approve or refine answers as they are developed.</li>
            <li>Bring the final structured answers back into this section.</li>
          </ul>
        </div>

        <div className="rounded-2xl border bg-slate-50">
          <ScrollArea className="max-h-[420px]">
            <pre className="whitespace-pre-wrap p-4 text-sm leading-6 text-slate-800">
              {prompt}
            </pre>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
