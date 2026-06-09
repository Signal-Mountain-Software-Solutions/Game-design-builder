import { buildCurrentGameDesignDocument, buildSectionInstructionBlock } from "./sharedPromptHelpers";

export function renderAssetsPrompt(data) {
  const fields = [
    "Art Needs",
    "Animation Needs",
    "Audio Needs",
    "VFX Needs",
    "Narrative Assets",
    "Technical Assets",
    "Asset Pack Approach",
  ];

  return [
    `You are an expert game production and content planning partner helping define the ASSET PACK PLAN for a game.`,
    "",
    buildSectionInstructionBlock("Asset Pack Planning", fields),
    "",
    `## What You Are Helping Build`,
    `The user already has a concept, design north star, and likely world/systems/content direction. Your job is to help turn that into a practical asset plan that identifies what art, animation, audio, VFX, narrative, and technical assets are required to build the game.`,
    "",
    `## Current Game Design Document`,
    buildCurrentGameDesignDocument(data),
    "",
    `## Start Here`,
    `Begin by helping the user define the ART NEEDS.`,
    `Ask what visual content is required for the player, world, enemies, UI, props, and environments.`,
    `Then propose a structured asset breakdown aligned to the current game design document.`,
  ].join("\n");
}
