import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Save,
  Sparkles,
  RefreshCcw,
  PanelTop,
  FileOutput,
  Info,
  DownloadCloud,
  BookMarked,
} from "lucide-react";
import { useBuilder } from "@/features/game-design-builder/builderContext";
import { EXAMPLE_TEMPLATES } from "@/data/exampleTemplates";

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
    loadTemplate,
  } = useBuilder();

  const templateList = useMemo(() => Object.values(EXAMPLE_TEMPLATES), []);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templateList[0]?.id || "");
  const [showTemplateHelp, setShowTemplateHelp] = useState(false);

  const selectedTemplate = templateList.find((item) => item.id === selectedTemplateId);

  const handleLoadTemplate = () => {
