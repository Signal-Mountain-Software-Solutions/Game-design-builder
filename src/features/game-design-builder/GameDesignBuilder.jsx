import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import DashboardHero from "@/components/layout/DashboardHero";
import SectionProgressCards from "@/components/layout/SectionProgressCards";
import SectionForm from "@/components/forms/SectionForm";
import GenreStarterCard from "@/components/forms/GenreStarterCard";
import OutputStudioForm from "@/components/forms/OutputStudioForm";
import OutputPreviewTabs from "@/components/outputs/OutputPreviewTabs";
import TemplateLoader from "@/components/forms/TemplateLoader";
import SectionAiPromptPanel from "@/components/outputs/SectionAiPromptPanel";

import { SECTIONS } from "@/data/sections";
import { BuilderProvider, useBuilder } from "./builderContext";

function GameDesignBuilderScreen() {
  const {
    data,
    activeTab,
    setActiveTab,
    setField,
    sectionCompletion,
  } = useBuilder();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <DashboardHero />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
           <div className="w-full overflow-x-auto rounded-2xl border bg-white p-1 shadow-sm">
            <TabsList className="flex w-max gap-2 bg-transparent">
              <TabsTrigger value="dashboard" className="rounded-xl px-4 py-2">
                Dashboard
              </TabsTrigger>

              {SECTIONS.map((section) => (
                <TabsTrigger
                  key={section.key}
                  value={section.key}
                  className="rounded-xl px-4 py-2"
                >
                  {section.title}
                </TabsTrigger>
              ))}

              <TabsTrigger value="outputStudio" className="rounded-xl px-4 py-2">
                Output Studio
              </TabsTrigger>

              <TabsTrigger value="outputs" className="rounded-xl px-4 py-2">
                Outputs
              </TabsTrigger>
            </TabsList>
          </ScrollArea>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.1fr_1fr]">
              <Card className="rounded-[28px] border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Starter Engine Selection</CardTitle>
                  <CardDescription>
                    Select the genre starter pattern that best fits your concept and engine planning.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="mb-2 block">Project Name</Label>
                      <Input
                        className="rounded-2xl"
                        value={data.meta.projectName}
                        onChange={(e) => setField("meta.projectName", e.target.value)}
                        placeholder="e.g., Ashen Crown"
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">Genre / Starter Type</Label>
                      <Select
                        value={data.meta.genre}
                        onValueChange={(value) => setField("meta.genre", value)}
                      >
                        <SelectTrigger className="rounded-2xl">
                          <SelectValue placeholder="Select genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rpg">RPG</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="strategy">Strategy</SelectItem>
                          <SelectItem value="puzzle">Puzzle</SelectItem>
                          <SelectItem value="roguelite">Rogue-lite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">Platform</Label>
                      <Input
                        className="rounded-2xl"
                        value={data.meta.platform}
                        onChange={(e) => setField("meta.platform", e.target.value)}
                        placeholder="PC, Console, Mobile, Web"
                      />
                    </div>

                    <div>
                      <Label className="mb-2 block">Target Engine</Label>
                      <Input
                        className="rounded-2xl"
                        value={data.technical.targetEngine}
                        onChange={(e) => setField("technical.targetEngine", e.target.value)}
                        placeholder="Unity, Godot, Unreal, Custom"
                      />
                    </div>
                  </div>

                  <GenreStarterCard />
                </CardContent>
              </Card>

              <Card className="rounded-[28px] border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>Build Flow</CardTitle>
                  <CardDescription>
                    Use the tool in phases to move from idea to AI-ready implementation package.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {[
                    {
                      title: "1. Capture concept",
                      body: "Define the hook, player fantasy, audience, and design north star so the first output is already useful.",
                    },
                    {
                      title: "2. Expand details",
                      body: "Add worldbuilding, systems, content, assets, and technical specs with progressive depth.",
                    },
                    {
                      title: "3. Use AI section guides",
                      body: "Each major section includes a copy-ready AI collaboration prompt that can walk the user through structured design questions and iterative refinement.",
                    },
                    {
                      title: "4. Configure AI outputs",
                      body: "Set tone, detail level, preferred format, and which deliverables should be generated.",
                    },
                    {
                      title: "5. Export and iterate",
                      body: "Copy or download concept docs, GDDs, lore packs, asset briefs, technical specs, AI build prompts, or a full zip bundle.",
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{item.title}</div>
                          <div className="mt-1 text-sm leading-6 text-slate-600">
                            {item.body}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <TemplateLoader />

              <Card className="rounded-[28px] border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle>How to use templates</CardTitle>
                  <CardDescription>
                    Example templates accelerate ideation and show the level of detail the tool can support.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 text-sm leading-6 text-slate-600">
                  <p>
                    Load a template to instantly populate the form with a complete sample project.
                  </p>
                  <p>Once loaded, you can:</p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Edit the concept and convert it into your own project</li>
                    <li>Review how systems, lore, assets, and technical specs are structured</li>
                    <li>Use section-level AI guides to collaborate on each major design area</li>
                    <li>Jump into the Outputs tab to see AI-ready exports immediately</li>
                    <li>Download a full zip bundle to inspect the deliverables</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <SectionProgressCards />
          </TabsContent>

          {SECTIONS.map((section) => {
            const Icon = section.icon;
            const sectionStatus = sectionCompletion.find((s) => s.key === section.key);
            const percent = sectionStatus?.percent ?? 0;

            return (
              <TabsContent key={section.key} value={section.key} className="space-y-6">
                <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                  <Card className="rounded-[28px] border-slate-200 shadow-sm">
                    <CardHeader>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-xl">
                            <Icon className="h-5 w-5 text-slate-700" />
                            {section.title}
                          </CardTitle>
                          <CardDescription className="mt-1">
                            {section.description}
                          </CardDescription>
                        </div>

                        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
                          {percent}% complete
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <SectionForm section={section} />
                    </CardContent>
                  </Card>

                  <div className="space-y-6">
                    <GenreStarterCard />

                    {["concept", "world", "systems", "content", "assets", "technical"].includes(
                      section.key
                    ) ? (
                      <SectionAiPromptPanel sectionKey={section.key} />
                    ) : null}
                  </div>
                </div>
              </TabsContent>
            );
          })}

          <TabsContent value="outputStudio">
            <OutputStudioForm />
          </TabsContent>

          <TabsContent value="outputs">
            <OutputPreviewTabs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function GameDesignBuilder() {
  return (
    <BuilderProvider>
      <GameDesignBuilderScreen />
    </BuilderProvider>
  );
}
