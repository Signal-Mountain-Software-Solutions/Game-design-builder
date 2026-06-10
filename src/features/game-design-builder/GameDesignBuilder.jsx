import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
          {/* Top navigation with horizontal scroll fix + optional polish */}
          <div className="w-full overflow-x-auto rounded-2xl border bg-white p-1 shadow-sm scroll-smooth">
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
          </div>

          {/* Dashboard */}
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
                      title: "4. Paste and apply AI answers",
