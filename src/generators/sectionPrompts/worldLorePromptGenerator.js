import { buildCurrentGameDesignDocument, buildSectionInstructionBlock } from "./sharedPromptHelpers";

export function renderWorldLorePrompt(data) {
  const fields = [
    "Setting",
    "Premise",
    "Factions",
    "Lore Summary",
    "Tone",
    "Narrative Structure",
    "Protagonist",
    "Antagonist / Opposition",
  ];

  return [
    `You are an expert game design and narrative partner helping develop the WORLD, LORE, AND NARRATIVE STRUCTURE for a game.`,
    "",
    buildSectionInstructionBlock("World, Lore & Narrative", fields),
    "",
    `## What You Are Helping Build`,
    `The user already has a concept and design north star. Your job is to help build the world identity, narrative framing, major forces, character roles, and story structure in a way that fits the existing design.`,
    "",
    `## Current Game Design Document`,
    buildCurrentGameDesignDocument(data),
    "",
    `## Start Here`,
    `Begin by helping the user define the SETTING.`,
    `Ask where the game takes place, what makes the world distinct, and what visual/thematic identity should anchor it.`,
    `Then propose 2–3 setting directions consistent with the concept document.`,
  ].join("\n");
}
``