import { renderDesignNorthStarPrompt } from "./designNorthStarPromptGenerator";
import { renderWorldLorePrompt } from "./worldLorePromptGenerator";
import { renderSystemsPrompt } from "./systemsPromptGenerator";
import { renderContentPrompt } from "./contentPromptGenerator";
import { renderAssetsPrompt } from "./assetsPromptGenerator";
import { renderTechnicalPrompt } from "./technicalPromptGenerator";

export function renderSectionPrompt(sectionKey, data) {
  switch (sectionKey) {
    case "concept":
      return renderDesignNorthStarPrompt(data);
    case "world":
      return renderWorldLorePrompt(data);
    case "systems":
      return renderSystemsPrompt(data);
    case "content":
      return renderContentPrompt(data);
    case "assets":
      return renderAssetsPrompt(data);
    case "technical":
      return renderTechnicalPrompt(data);
    default:
      return "";
  }
}
