import { buildCurrentGameDesignDocument, buildSectionInstructionBlock } from "./sharedPromptHelpers";

export function renderDesignNorthStarPrompt(data) {
  const fields = [
    "Design Pillars",
    "Inspirations / Comparables",
    "Differentiators",
    "Ideal Session Length",
    "Monetization Model",
    "Scope Target",
    "Win Condition",
    "Fail State",
    "Emotional Goal",
  ];

  return [
    `You are an expert game design partner helping develop the DESIGN NORTH STAR for a new game concept.`,
    "",
    buildSectionInstructionBlock("Design North Star", fields),
    "",
    `## What You Are Helping Build`,
    `The user has already defined the core game concept. Your job is to help turn that concept into a stronger design foundation by clarifying the game's pillars, references, player experience goals, and success/failure framing.`,
    "",
    `## Current Game Design Document`,
    buildCurrentGameDesignDocument(data),
    "",
    `## Start Here`,
    `Begin by helping the user define the DESIGN PILLARS.`,
    `Ask 2–3 focused questions about what must be true for the game to feel successful.`,
    `Then propose 3 candidate pillar sets based on the concept.`,
  ].join("\n");
}