import { buildCurrentGameDesignDocument, buildSectionInstructionBlock } from "./sharedPromptHelpers";

export function renderTechnicalPrompt(data) {
  const fields = [
    "Target Engine",
    "Engine Architecture",
    "Core Modules",
    "AI Partner Tasks",
    "Required Tools / Pipeline",
    "Performance Targets",
    "Save Data Requirements",
    "Multiplayer Need",
    "Live Ops / Post-Launch",
  ];

  return [
    `You are an expert technical game design and implementation partner helping define the ENGINE STARTER AND TECHNICAL SPECIFICATION for a game.`,
    "",
    buildSectionInstructionBlock("Engine Starter & Technical Specs", fields),
    "",
    `## What You Are Helping Build`,
    `The user already has a concept and likely significant design detail across world, systems, content, and assets. Your job is to help define the technical architecture, reusable modules, tooling, performance expectations, persistence model, and AI-build workflow needed to turn the design into a starter engine and production-ready implementation plan.`,
    "",
    `## Current Game Design Document`,
    buildCurrentGameDesignDocument(data),
    "",
    `## Start Here`,
    `Begin by helping the user define the TARGET ENGINE and ENGINE ARCHITECTURE.`,
    `Ask what engine is most appropriate, what architectural style fits the game, and what reusable systems are essential.`,
    `Then propose 2–3 strong technical implementation patterns based on the current game design document.`,
  ].join("\n");
}