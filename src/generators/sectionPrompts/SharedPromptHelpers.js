import { ENGINE_STARTERS } from "@/data/engineStarters";
import { linesOrTbd } from "@/lib/helpers";

function hasValue(value) {
  return value !== undefined && value !== null && String(value).trim() !== "";
}

function sectionHasContent(sectionObj) {
  if (!sectionObj || typeof sectionObj !== "object") return false;
  return Object.values(sectionObj).some((value) => hasValue(value));
}

export function buildCurrentGameDesignDocument(data) {
  const starter = ENGINE_STARTERS[data.meta.genre] || {
    label: "Unknown Genre",
    coreLoops: [],
    engineFit: [],
    promptHint: "No starter guidance available.",
  };

  const lines = [];

  lines.push(`# ${data.meta.projectName || "Untitled Game Project"} — Current Game Design Document`);
  lines.push("");
  lines.push(`## Project Snapshot`);
  lines.push(`- **Genre:** ${starter.label}`);
  lines.push(`- **Platform:** ${linesOrTbd(data.meta.platform)}`);
  lines.push(`- **Perspective:** ${linesOrTbd(data.meta.cameraPerspective)}`);
  lines.push(`- **Visual Style:** ${linesOrTbd(data.meta.visualStyle)}`);
  lines.push(`- **Target Engine:** ${linesOrTbd(data.technical?.targetEngine)}`);
  lines.push("");

  if (sectionHasContent(data.meta)) {
    lines.push(`## Concept Intake`);
    lines.push(`### Project Name`);
    lines.push(linesOrTbd(data.meta.projectName));
    lines.push("");
    lines.push(`### Elevator Pitch`);
    lines.push(linesOrTbd(data.meta.elevatorPitch));
    lines.push("");
    lines.push(`### Concept Summary`);
    lines.push(linesOrTbd(data.meta.conceptSummary));
    lines.push("");
    lines.push(`### Player Fantasy`);
    lines.push(linesOrTbd(data.meta.playerFantasy));
    lines.push("");
    lines.push(`### Audience`);
    lines.push(linesOrTbd(data.meta.audience));
    lines.push("");
  }

  if (sectionHasContent(data.concept)) {
    lines.push(`## Design North Star`);
    lines.push(`### Design Pillars`);
    lines.push(linesOrTbd(data.concept.pillars));
    lines.push("");
    lines.push(`### Inspirations / Comparables`);
    lines.push(linesOrTbd(data.concept.inspirations));
    lines.push("");
    lines.push(`### Differentiators`);
    lines.push(linesOrTbd(data.concept.differentiators));
    lines.push("");
    lines.push(`### Session Length`);
    lines.push(linesOrTbd(data.concept.sessionLength));
    lines.push("");
    lines.push(`### Monetization`);
    lines.push(linesOrTbd(data.concept.monetization));
    lines.push("");
    lines.push(`### Scope Target`);
    lines.push(linesOrTbd(data.concept.scopeTarget));
    lines.push("");
    lines.push(`### Win Condition`);
    lines.push(linesOrTbd(data.concept.winCondition));
    lines.push("");
    lines.push(`### Fail State`);
    lines.push(linesOrTbd(data.concept.failState));
    lines.push("");
    lines.push(`### Emotional Goal`);
    lines.push(linesOrTbd(data.concept.emotionalGoal));
    lines.push("");
  }

  if (sectionHasContent(data.world)) {
    lines.push(`## World, Lore & Narrative`);
    lines.push(`### Setting`);
    lines.push(linesOrTbd(data.world.setting));
    lines.push("");
    lines.push(`### Premise`);
    lines.push(linesOrTbd(data.world.premise));
    lines.push("");
    lines.push(`### Factions`);
    lines.push(linesOrTbd(data.world.factions));
    lines.push("");
    lines.push(`### Lore Summary`);
    lines.push(linesOrTbd(data.world.loreSummary));
    lines.push("");
    lines.push(`### Tone`);
    lines.push(linesOrTbd(data.world.tone));
    lines.push("");
    lines.push(`### Narrative Structure`);
    lines.push(linesOrTbd(data.world.narrativeStructure));
    lines.push("");
    lines.push(`### Protagonist`);
    lines.push(linesOrTbd(data.world.protagonist));
    lines.push("");
    lines.push(`### Antagonist / Opposition`);
    lines.push(linesOrTbd(data.world.antagonist));
    lines.push("");
  }

  if (sectionHasContent(data.systems)) {
    lines.push(`## Core Systems & Progression`);
    lines.push(`### Core Loop`);
    lines.push(linesOrTbd(data.systems.coreLoop));
    lines.push("");
    lines.push(`### Progression`);
    lines.push(linesOrTbd(data.systems.progression));
    lines.push("");
    lines.push(`### Systems List`);
    lines.push(linesOrTbd(data.systems.systemsList));
    lines.push("");
    lines.push(`### Controls / Input`);
    lines.push(linesOrTbd(data.systems.controls));
    lines.push("");
    lines.push(`### Combat / Interaction Model`);
    lines.push(linesOrTbd(data.systems.combatOrInteraction));
    lines.push("");
    lines.push(`### Economy / Resource Model`);
    lines.push(linesOrTbd(data.systems.economy));
    lines.push("");
    lines.push(`### Difficulty Model`);
    lines.push(linesOrTbd(data.systems.difficulty));
    lines.push("");
    lines.push(`### Save Model`);
    lines.push(linesOrTbd(data.systems.saveModel));
    lines.push("");
    lines.push(`### Replayability`);
    lines.push(linesOrTbd(data.systems.replayability));
    lines.push("");
  }

  if (sectionHasContent(data.content)) {
    lines.push(`## Content & Experience Design`);
    lines.push(`### Game Modes`);
    lines.push(linesOrTbd(data.content.gameModes));
    lines.push("");
    lines.push(`### Level / World Structure`);
    lines.push(linesOrTbd(data.content.levelsOrWorldStructure));
    lines.push("");
    lines.push(`### Quest / Objective Structure`);
    lines.push(linesOrTbd(data.content.questStructure));
    lines.push("");
    lines.push(`### Enemies / Challenges`);
    lines.push(linesOrTbd(data.content.enemiesOrChallenges));
    lines.push("");
    lines.push(`### Items / Abilities / Tools`);
    lines.push(linesOrTbd(data.content.itemsAbilities));
    lines.push("");
    lines.push(`### UI/UX Notes`);
    lines.push(linesOrTbd(data.content.uiUxNotes));
    lines.push("");
    lines.push(`### Accessibility`);
    lines.push(linesOrTbd(data.content.accessibility));
    lines.push("");
    lines.push(`### Tutorial / Onboarding`);
    lines.push(linesOrTbd(data.content.tutorialOnboarding));
    lines.push("");
  }

  if (sectionHasContent(data.assets)) {
    lines.push(`## Asset Pack Planning`);
    lines.push(`### Art Needs`);
    lines.push(linesOrTbd(data.assets.artNeeds));
    lines.push("");
    lines.push(`### Animation Needs`);
    lines.push(linesOrTbd(data.assets.animationNeeds));
    lines.push("");
    lines.push(`### Audio Needs`);
    lines.push(linesOrTbd(data.assets.audioNeeds));
    lines.push("");
    lines.push(`### VFX Needs`);
    lines.push(linesOrTbd(data.assets.vfxNeeds));
    lines.push("");
    lines.push(`### Narrative Assets`);
    lines.push(linesOrTbd(data.assets.narrativeAssets));
    lines.push("");
    lines.push(`### Technical Assets`);
    lines.push(linesOrTbd(data.assets.technicalAssets));
    lines.push("");
    lines.push(`### Asset Pack Approach`);
    lines.push(linesOrTbd(data.assets.assetPackApproach));
    lines.push("");
  }

  if (sectionHasContent(data.technical)) {
    lines.push(`## Engine Starter & Technical Specs`);
    lines.push(`### Target Engine`);
    lines.push(linesOrTbd(data.technical.targetEngine));
    lines.push("");
    lines.push(`### Engine Architecture`);
    lines.push(linesOrTbd(data.technical.engineArchitecture));
    lines.push("");
    lines.push(`### Core Modules`);
    lines.push(linesOrTbd(data.technical.coreModules));
    lines.push("");
    lines.push(`### AI Partner Tasks`);
    lines.push(linesOrTbd(data.technical.aiPartnerTasks));
    lines.push("");
    lines.push(`### Required Tools / Pipeline`);
    lines.push(linesOrTbd(data.technical.requiredTools));
    lines.push("");
    lines.push(`### Performance Targets`);
    lines.push(linesOrTbd(data.technical.performanceTargets));
    lines.push("");
    lines.push(`### Save Data Requirements`);
    lines.push(linesOrTbd(data.technical.saveDataRequirements));
    lines.push("");
    lines.push(`### Multiplayer`);
    lines.push(linesOrTbd(data.technical.multiplayer));
    lines.push("");
    lines.push(`### Live Ops`);
    lines.push(linesOrTbd(data.technical.liveOps));
    lines.push("");
  }

  return lines.join("\n");
}

export function buildSectionInstructionBlock(sectionTitle, sectionFields) {
  const lines = [];
  lines.push(`## Section To Design`);
  lines.push(sectionTitle);
  lines.push("");
  lines.push(`## Required Workflow`);
  lines.push(`1. Ask focused questions one topic at a time.`);
  lines.push(`2. Propose 1–3 strong example directions based on the current game design document.`);
  lines.push(`3. Let the user choose, edit, or reject options.`);
  lines.push(`4. Refine the section iteratively until complete.`);
  lines.push(`5. After finishing, return the section in a structured format using the exact field labels below.`);
  lines.push("");
  lines.push(`## Fields To Complete`);
  sectionFields.forEach((field) => {
    lines.push(`- ${field}`);
  });
  lines.push("");
  lines.push(`## Important Rules`);
  lines.push(`- Do not dump everything at once.`);
  lines.push(`- Guide the user interactively.`);
  lines.push(`- Use the current game design document as the source of truth.`);
  lines.push(`- Preserve consistency with already completed sections.`);
  lines.push(`- Surface assumptions clearly when details are missing.`);
  lines.push(`- End by returning a clean, structured draft for the target section.`);
  return lines.join("\n");
}