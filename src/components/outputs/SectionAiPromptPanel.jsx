import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useBuilder } from "@/features/game-design-builder/builderContext";
import { renderSectionPrompt } from "@/generators/sectionPrompts";
import { downloadText } from "@/lib/exportFiles";
import { slugify } from "@/lib/helpers";
import {
  parseSectionAiAnswers,
  getSectionFieldConfig,
} from "@/lib/sectionAiAnswerParser";
import {
  Copy,
  CheckCircle2,
  Download,
  Sparkles,
  ClipboardPaste,
  Eraser,
  FileText,
  Wand2,
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
  const { data, setField } = useBuilder();

  const [promptCopied, setPromptCopied] = useState(false);
  const [answersCopied, setAnswersCopied] = useState(false);
  const [aiAnswers, setAiAnswers] = useState("");
  const [applyStatus, setApplyStatus] = useState("");

  const prompt = useMemo(() => {
    return renderSectionPrompt(sectionKey, data);
  }, [sectionKey, data]);

  const sectionLabel = SECTION_LABELS[sectionKey] || sectionKey;
  const baseName = slugify(data.meta.projectName || "untitled-game");
  const storageKey = `gdd-builder-ai-answers-${baseName}-${sectionKey}`;
  const expectedFields = getSectionFieldConfig(sectionKey);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setAiAnswers(saved);
      } else {
        setAiAnswers("");
      }
    } catch (error) {
      console.error("Failed to load saved AI answers", error);
    }
  }, [storageKey]);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, aiAnswers);
    } catch (error) {
      console.error("Failed to save AI answers", error);
    }
  }, [storageKey, aiAnswers]);

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy AI prompt", error);
    }
  };

  const handleDownloadPrompt = () => {
    downloadText(`${baseName}-${sectionKey}-ai-guide.md`, prompt);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setAiAnswers((prev) => {
        if (!prev.trim()) return clipboardText;
        return `${prev}\n\n${clipboardText}`;
      });
    } catch (error) {
      console.error("Failed to read clipboard", error);
      alert(
        "Paste from clipboard failed. Your browser may require HTTPS/localhost permissions. You can still paste manually into the box."
      );
    }
  };

  const handleCopyAnswers = async () => {
    try {
      await navigator.clipboard.writeText(aiAnswers || "");
      setAnswersCopied(true);
      setTimeout(() => setAnswersCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy AI answers", error);
    }
  };

  const handleClearAnswers = () => {
    setAiAnswers("");
    setApplyStatus("");
  };

  const handleDownloadAnswers = () => {
    downloadText(`${baseName}-${sectionKey}-ai-answers.md`, aiAnswers || "");
  };

  const handleApplyParsedAnswers = () => {
    const parsed = parseSectionAiAnswers(aiAnswers, sectionKey);
    const entries = Object.entries(parsed);

    if (!entries.length) {
      setApplyStatus(
        "Parser did not recognize any fields. Try using simple labels like 'Setting:', 'Premise:', or markdown headings like '## Setting'."
      );
      return;
    }

    entries.forEach(([path, value]) => {
      setField(path, value);
    });

    setApplyStatus(
      `Applied ${entries.length} parsed field${entries.length === 1 ? "" : "s"} to the form.`
    );
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
            {promptCopied ? (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {promptCopied ? "Copied" : "Copy AI Prompt"}
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
            How to use
          </div>

          <ol className="list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-600">
            <li>Copy this prompt into your AI tool.</li>
            <li>Let the AI guide you section-by-section.</li>
            <li>Ask the AI to return answers using the exact field labels below.</li>
            <li>Paste the AI’s final section notes into the box below.</li>
            <li>
              Click <strong>Apply Parsed Answers</strong> to populate matching fields
              automatically.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Best parser format
          </div>

          <div className="space-y-2 text-sm leading-6 text-slate-600">
            <p>Ask the AI to end with labeled answers like:</p>

            <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-700">
              {expectedFields.map((field) => `${field.label}: ...`).join("\n")}
            </pre>
          </div>
        </div>

        <div className="rounded-2xl border bg-slate-50">
          <ScrollArea className="max-h-[320px]">
            <pre className="whitespace-pre-wrap p-4 text-sm leading-6 text-slate-800">
              {prompt}
            </pre>
          </ScrollArea>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <FileText className="h-4 w-4" />
                Paste AI Answers
              </div>
              <div className="mt-1 text-xs leading-5 text-slate-500">
                Paste the AI’s refined section notes here. These notes are saved locally
                for this project + section.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={handlePasteFromClipboard}
              className="rounded-2xl"
            >
              <ClipboardPaste className="mr-2 h-4 w-4" />
              Paste From Clipboard
            </Button>

            <Button
              variant="outline"
              onClick={handleCopyAnswers}
              className="rounded-2xl"
              disabled={!aiAnswers.trim()}
            >
              {answersCopied ? (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {answersCopied ? "Copied Notes" : "Copy Notes"}
            </Button>

            <Button
              variant="outline"
              onClick={handleDownloadAnswers}
              className="rounded-2xl"
              disabled={!aiAnswers.trim()}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Notes
            </Button>

            <Button
              variant="outline"
              onClick={handleClearAnswers}
              className="rounded-2xl"
              disabled={!aiAnswers.trim()}
            >
              <Eraser className="mr-2 h-4 w-4" />
              Clear Box
            </Button>
          </div>

          <Textarea
            value={aiAnswers}
            onChange={(e) => setAiAnswers(e.target.value)}
            placeholder={`Paste the AI-generated ${sectionLabel} guidance here...

Recommended format:
${expectedFields.map((field) => `${field.label}: ...`).join("\n")}`}
            className="min-h-[220px] rounded-2xl"
          />

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleApplyParsedAnswers}
              className="rounded-2xl bg-violet-600 text-white hover:bg-violet-700"
              disabled={!aiAnswers.trim()}
            >
              <Wand2 className="mr-2 h-4 w-4" />
              Apply Parsed Answers
            </Button>

            {applyStatus ? (
              <div className="text-xs leading-5 text-slate-500">{applyStatus}</div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}