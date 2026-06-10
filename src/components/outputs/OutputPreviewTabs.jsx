import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Download, CheckCircle2, Archive } from "lucide-react";
import { useBuilder } from "@/features/game-design-builder/builderContext";

export default function OutputPreviewTabs() {
  const {
    outputs,
    fileNames,
    enabledOutputKeys,
    copyOutput,
    downloadOutput,
    downloadAllOutputs,
    copiedKey,
  } = useBuilder();

  const available = useMemo(() => {
    const labels = {
      concept: "Concept",
      gdd: "Full GDD",
      lore: "Lore Pack",
      assets: "Asset Pack",
      technical: "Technical Spec",
      prompt: "AI Build Prompt",
      json: "JSON Data",
    };

    return (enabledOutputKeys || []).map((key) => ({
      key,
      label: labels[key] || key,
      content: outputs?.[key] || "",
    }));
  }, [enabledOutputKeys, outputs]);

  const [tab, setTab] = useState(available[0]?.key || "json");

  useEffect(() => {
    if (!available.length) return;

    const currentStillExists = available.some((item) => item.key === tab);
    if (!currentStillExists) {
      setTab(available[0].key);
    }
  }, [available, tab]);

  if (!available.length) {
    return (
      <Card className="rounded-[28px] border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Output Studio Preview</CardTitle>
          <CardDescription>
            No outputs are currently enabled. Go to Output Studio and turn at least one output on.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="rounded-[28px] border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle>Output Studio Preview</CardTitle>
        <CardDescription>
          Copy or download AI-ready outputs generated from your structured intake.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Top action buttons */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={downloadAllOutputs} className="rounded-2xl">
            <Archive className="mr-2 h-4 w-4" />
            Download Full Bundle
          </Button>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          {/* Output tab buttons */}
          <div className="overflow-x-auto rounded-2xl border bg-white p-2">
            <TabsList className="flex w-max gap-2 bg-transparent">
              {available.map((item) => (
                <TabsTrigger
                  key={item.key}
                  value={item.key}
                  className="rounded-xl px-4 py-2"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {available.map((item) => (
            <TabsContent key={item.key} value={item.key} className="space-y-4">
              {/* Per-output action buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => copyOutput(item.key)} className="rounded-2xl">
                  {copiedKey === item.key ? (
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                  ) : (
                    <Copy className="mr-2 h-4 w-4" />
                  )}
                  {copiedKey === item.key ? "Copied" : "Copy"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => downloadOutput(item.key)}
                  className="rounded-2xl"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>

              {/* Output preview */}
              <div className="rounded-2xl border bg-slate-50">
                <pre className="max-h-[600px] overflow-auto whitespace-pre-wrap p-4 text-sm leading-6 text-slate-800">
                  {item.content}
                </pre>
              </div>

              {/* File name */}
              <div className="text-xs text-slate-500">
                {fileNames?.[item.key] || `${item.key}.txt`}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
