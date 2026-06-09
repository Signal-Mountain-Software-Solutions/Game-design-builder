const SECTION_FIELD_CONFIG = {
  concept: [
    { label: "Design Pillars", path: "concept.pillars", aliases: ["design pillars", "pillars"] },
    {
      label: "Inspirations / Comparables",
      path: "concept.inspirations",
      aliases: ["inspirations / comparables", "inspirations", "comparables", "references"],
    },
    {
      label: "Differentiators",
      path: "concept.differentiators",
      aliases: ["differentiators", "unique qualities", "what makes it stand out"],
    },
    {
      label: "Ideal Session Length",
      path: "concept.sessionLength",
      aliases: ["ideal session length", "session length"],
    },
    {
      label: "Monetization Model",
      path: "concept.monetization",
      aliases: ["monetization model", "monetization"],
    },
    {
      label: "Scope Target",
      path: "concept.scopeTarget",
      aliases: ["scope target", "scope"],
    },
    {
      label: "Win Condition",
      path: "concept.winCondition",
      aliases: ["win condition"],
    },
    {
      label: "Fail State",
      path: "concept.failState",
      aliases: ["fail state", "failure state"],
    },
    {
      label: "Emotional Goal",
      path: "concept.emotionalGoal",
      aliases: ["emotional goal", "player emotion"],
    },
  ],

  world: [
    { label: "Setting", path: "world.setting", aliases: ["setting"] },
    { label: "Premise", path: "world.premise", aliases: ["premise"] },
    { label: "Factions", path: "world.factions", aliases: ["factions"] },
    { label: "Lore Summary", path: "world.loreSummary", aliases: ["lore summary", "lore"] },
    { label: "Tone", path: "world.tone", aliases: ["tone"] },
    {
      label: "Narrative Structure",
      path: "world.narrativeStructure",
      aliases: ["narrative structure", "story structure"],
    },
    { label: "Protagonist", path: "world.protagonist", aliases: ["protagonist", "main character"] },
    {
      label: "Antagonist / Opposition",
      path: "world.antagonist",
      aliases: ["antagonist / opposition", "antagonist", "opposition", "primary opposition"],
    },
  ],

  systems: [
    { label: "Core Loop", path: "systems.coreLoop", aliases: ["core loop"] },
    { label: "Progression", path: "systems.progression", aliases: ["progression"] },
    { label: "Systems List", path: "systems.systemsList", aliases: ["systems list", "systems"] },
    { label: "Controls / Input", path: "systems.controls", aliases: ["controls / input", "controls", "input"] },
    {
      label: "Combat / Interaction Model",
      path: "systems.combatOrInteraction",
      aliases: ["combat / interaction model", "combat model", "interaction model"],
    },
    {
      label: "Economy / Resource Model",
      path: "systems.economy",
      aliases: ["economy / resource model", "economy", "resource model"],
    },
    {
      label: "Difficulty Model",
      path: "systems.difficulty",
      aliases: ["difficulty model", "difficulty"],
    },
    { label: "Save Model", path: "systems.saveModel", aliases: ["save model"] },
    {
      label: "Replayability Hooks",
      path: "systems.replayability",
      aliases: ["replayability hooks", "replayability"],
    },
  ],

  content: [
    { label: "Game Modes", path: "content.gameModes", aliases: ["game modes", "modes"] },
    {
      label: "Level / World Structure",
      path: "content.levelsOrWorldStructure",
      aliases: ["level / world structure", "world structure", "level structure"],
    },
    {
      label: "Quest / Objective Structure",
      path: "content.questStructure",
      aliases: ["quest / objective structure", "quest structure", "objective structure"],
    },
    {
      label: "Enemies / Challenges",
      path: "content.enemiesOrChallenges",
      aliases: ["enemies / challenges", "enemies", "challenges"],
    },
    {
      label: "Items / Abilities / Tools",
      path: "content.itemsAbilities",
      aliases: ["items / abilities / tools", "items", "abilities", "tools"],
    },
    { label: "UI/UX Notes", path: "content.uiUxNotes", aliases: ["ui/ux notes", "ui ux notes", "ui notes", "ux notes"] },
    { label: "Accessibility", path: "content.accessibility", aliases: ["accessibility"] },
    {
      label: "Tutorial / Onboarding",
      path: "content.tutorialOnboarding",
      aliases: ["tutorial / onboarding", "tutorial", "onboarding"],
    },
  ],

  assets: [
    { label: "Art Needs", path: "assets.artNeeds", aliases: ["art needs", "art"] },
    { label: "Animation Needs", path: "assets.animationNeeds", aliases: ["animation needs", "animation"] },
    { label: "Audio Needs", path: "assets.audioNeeds", aliases: ["audio needs", "audio"] },
    { label: "VFX Needs", path: "assets.vfxNeeds", aliases: ["vfx needs", "vfx"] },
    {
      label: "Narrative Assets",
      path: "assets.narrativeAssets",
      aliases: ["narrative assets"],
    },
    {
      label: "Technical Assets",
      path: "assets.technicalAssets",
      aliases: ["technical assets"],
    },
    {
      label: "Asset Pack Approach",
      path: "assets.assetPackApproach",
      aliases: ["asset pack approach", "asset strategy", "asset approach"],
    },
  ],

  technical: [
    { label: "Target Engine", path: "technical.targetEngine", aliases: ["target engine", "engine"] },
    {
      label: "Engine Architecture",
      path: "technical.engineArchitecture",
      aliases: ["engine architecture", "architecture"],
    },
    { label: "Core Modules", path: "technical.coreModules", aliases: ["core modules", "modules"] },
    { label: "AI Partner Tasks", path: "technical.aiPartnerTasks", aliases: ["ai partner tasks", "ai tasks"] },
    {
      label: "Required Tools / Pipeline",
      path: "technical.requiredTools",
      aliases: ["required tools / pipeline", "required tools", "pipeline", "tools"],
    },
    {
      label: "Performance Targets",
      path: "technical.performanceTargets",
      aliases: ["performance targets", "performance"],
    },
    {
      label: "Save Data Requirements",
      path: "technical.saveDataRequirements",
      aliases: ["save data requirements", "save requirements"],
    },
    {
      label: "Multiplayer Need",
      path: "technical.multiplayer",
      aliases: ["multiplayer need", "multiplayer"],
    },
    {
      label: "Live Ops / Post-Launch",
      path: "technical.liveOps",
      aliases: ["live ops / post-launch", "live ops", "post-launch"],
    },
  ],
};

function normalizeLabel(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/^[-*•]\s*/, "")
    .replace(/^#+\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*:\s*$/, "")
    .trim();
}

function appendToField(result, path, text) {
  const clean = String(text || "").trim();
  if (!clean) return;

  if (!result[path]) {
    result[path] = clean;
  } else {
    result[path] = `${result[path]}\n${clean}`.trim();
  }
}

function findFieldByLabel(sectionKey, rawLabel) {
  const config = SECTION_FIELD_CONFIG[sectionKey] || [];
  const normalized = normalizeLabel(rawLabel);

  return config.find((field) => {
    const candidates = [field.label, ...(field.aliases || [])].map(normalizeLabel);
    return candidates.includes(normalized);
  });
}

export function getSectionFieldConfig(sectionKey) {
  return SECTION_FIELD_CONFIG[sectionKey] || [];
}

export function parseSectionAiAnswers(text, sectionKey) {
  const result = {};
  const lines = String(text || "").replace(/\r\n/g, "\n").split("\n");

  let currentPath = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      if (currentPath) {
        appendToField(result, currentPath, "");
      }
      continue;
    }

    // Support markdown headings like: ## Setting
    const headingMatch = line.match(/^#{1,6}\s+(.+)$/);
    if (headingMatch) {
      const field = findFieldByLabel(sectionKey, headingMatch[1]);
      if (field) {
        currentPath = field.path;
        continue;
      }
    }

    // Support labeled lines like:
    // Setting: ...
    // - Setting: ...
    // **Setting:** ...
    const cleanedLine = line
      .replace(/^[-*•]\s*/, "")
      .replace(/\*\*/g, "")
      .replace(/__/g, "");

    const colonMatch = cleanedLine.match(/^([^:]+):\s*(.*)$/);
    if (colonMatch) {
      const field = findFieldByLabel(sectionKey, colonMatch[1]);
      if (field) {
        currentPath = field.path;
        appendToField(result, currentPath, colonMatch[2]);
        continue;
      }
    }

    // Otherwise keep appending to the current field if one is active
    if (currentPath) {
      appendToField(result, currentPath, line);
    }
  }

  // Final cleanup
  Object.keys(result).forEach((path) => {
    result[path] = result[path].trim();
    if (!result[path]) {
      delete result[path];
    }
  });

  return result;
}