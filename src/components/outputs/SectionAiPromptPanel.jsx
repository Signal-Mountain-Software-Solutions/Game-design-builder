import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useBuilder } from "@/features/game-design-builder/builderContext";
import { renderSectionPrompt } from "@/generators/sectionPrompts";
import {
  Copy,
  CheckCircle2,
  Download,
  Sparkles,
  FileText,
} from "lucide-react";

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
  const [aiAnswers, setAiAnswers] = useState("");

  const prompt = useMemo(() => {
    return renderSectionPrompt(sectionKey, data);
  }, [sectionKey, data]);

  const sectionLabel = SECTION_LABELS[sectionKey] || sectionKey;

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy prompt", error);
    }
  };

  const handleDownloadPrompt = () => {
    const blob = new Blob([prompt || ""], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sectionKey}-ai-prompt.md`;
    a.click();
    URL.revokeObjectURL(url);
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

      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleCopyPrompt} className="rounded-2xl">
            {copied ? (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied" : "Copy AI Prompt"}
          </Button>

          <Button
            variant="outline"
            onClick={handleDownloadPrompt}
            className="rounded-2xl"
          >
            <Download className="mr-2 h-4 w-4" />
            Download Prompt
          </Button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Prompt Preview
          </div>

          <pre className="whitespace-pre-wrap text-sm leading-6 text-slate-800">
            {prompt}
          </pre>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <FileText className="h-4 w-4" />
            Paste AI Answers
          </div>

          <Textarea
            value={aiAnswers}
            onChange={(e) => setAiAnswers(e.target.value)}
            placeholder="Paste the AI-generated section guidance here..."
            className="min-h-[220px] rounded-2xl"
          />
        </div>
      </CardContent>
    </Card>
  );
}
