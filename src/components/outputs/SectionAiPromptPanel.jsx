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
