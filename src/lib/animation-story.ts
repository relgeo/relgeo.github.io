export type RelGeoAnimationStepKind = 'definition' | 'manifestation';

export type RelGeoAnimationPreviewHighlightMode = 'outline' | 'pulse' | 'wash';

export type RelGeoAnimationPreviewHighlight =
  | { kind: 'none' }
  | {
      kind: 'objects';
      ids: string[];
      mode?: RelGeoAnimationPreviewHighlightMode;
    }
  | {
      kind: 'region';
      ids: string[];
      mode?: RelGeoAnimationPreviewHighlightMode;
    };

export type RelGeoAnimationSourceHighlight =
  | {
      kind: 'block';
      blockIds: string[];
    }
  | {
      kind: 'token';
      blockIds: string[];
      tokenKeys: string[];
    };

export type RelGeoAnimationStepDelta =
  | {
      op: 'add';
      blockIds: string[];
    }
  | {
      op: 'replace-value';
      blockId: string;
      key: string;
      from?: string;
      to: string;
    }
  | {
      op: 'activate';
      blockIds: string[];
    };

export type RelGeoAnimationBlock = {
  id: string;
  title: string;
  order: number;
  text: string;
};

export type RelGeoAnimationSourceLine = {
  text: string;
  blockId?: string;
};

export type RelGeoAnimationStep = {
  id: string;
  label: string;
  kind: RelGeoAnimationStepKind;
  blockDelta: RelGeoAnimationStepDelta;
  activeBlockIds: string[];
  sourceText: string;
  sourceLines: RelGeoAnimationSourceLine[];
  visualChange: boolean;
  sourceHighlight: RelGeoAnimationSourceHighlight;
  previewHighlight: RelGeoAnimationPreviewHighlight;
  note?: string;
};

export type RelGeoAnimationStory = {
  id: string;
  title: string;
  intent: string;
  header?: string;
  blocks: Record<string, RelGeoAnimationBlock>;
  steps: RelGeoAnimationStep[];
};

function normalizeBlockText(text: string): string {
  return text.trim().replace(/\n{3,}/g, '\n\n');
}

type ParsedSection = {
  key: string;
  headerLine: RelGeoAnimationSourceLine;
  bodyLines: RelGeoAnimationSourceLine[];
  rawLines: RelGeoAnimationSourceLine[];
};

function parseBlockSections(block: RelGeoAnimationBlock): ParsedSection[] {
  const lines = normalizeBlockText(block.text)
    .split('\n')
    .map((text) => ({ text, blockId: block.id }));

  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  let rawIndex = 0;

  for (const line of lines) {
    const isTopLevel = line.text.length > 0 && !line.text.startsWith(' ');
    const isSectionHeader = isTopLevel && line.text.trimEnd().endsWith(':');

    if (isSectionHeader) {
      current = {
        key: line.text.trim().slice(0, -1),
        headerLine: line,
        bodyLines: [],
        rawLines: [line],
      };
      sections.push(current);
      continue;
    }

    if (current) {
      current.bodyLines.push(line);
      current.rawLines.push(line);
      continue;
    }

    sections.push({
      key: `__raw__${block.id}_${rawIndex++}`,
      headerLine: line,
      bodyLines: [],
      rawLines: [line],
    });
  }

  return sections;
}

export function composeAnimationStoryLines(
  header: string | undefined,
  blocks: Record<string, RelGeoAnimationBlock>,
  activeBlockIds: string[]
): RelGeoAnimationSourceLine[] {
  const activeBlocks = activeBlockIds
    .map((id) => blocks[id])
    .filter((block): block is RelGeoAnimationBlock => block !== undefined)
    .sort((a, b) => a.order - b.order);

  const mergedSections: ParsedSection[] = [];
  const mergedByKey = new Map<string, ParsedSection>();

  for (const block of activeBlocks) {
    for (const section of parseBlockSections(block)) {
      if (section.key.startsWith('__raw__')) {
        mergedSections.push(section);
        continue;
      }

      const existing = mergedByKey.get(section.key);
      if (!existing) {
        const copy: ParsedSection = {
          ...section,
          bodyLines: [...section.bodyLines],
          rawLines: [...section.rawLines],
        };
        mergedByKey.set(section.key, copy);
        mergedSections.push(copy);
        continue;
      }

      existing.bodyLines.push(...section.bodyLines);
      existing.rawLines.push(...section.bodyLines);
    }
  }

  const composedLines: RelGeoAnimationSourceLine[] = [];
  const headerLines = (header?.trim() ?? '')
    .split('\n')
    .filter((line) => line.length > 0)
    .map((text) => ({ text }));

  if (headerLines.length > 0) {
    composedLines.push(...headerLines, { text: '' });
  }

  mergedSections.forEach((section, index) => {
    if (index > 0) {
      composedLines.push({ text: '' });
    }

    if (section.key.startsWith('__raw__')) {
      composedLines.push(...section.rawLines);
      return;
    }

    composedLines.push(section.headerLine, ...section.bodyLines);
  });

  return composedLines;
}

export function composeAnimationStorySource(
  header: string | undefined,
  blocks: Record<string, RelGeoAnimationBlock>,
  activeBlockIds: string[]
): string {
  const lines = composeAnimationStoryLines(header, blocks, activeBlockIds);
  return `${lines.map((line) => line.text).join('\n')}\n`;
}

export function buildAnimationStep(
  story: Pick<RelGeoAnimationStory, 'header' | 'blocks'>,
  step: Omit<RelGeoAnimationStep, 'sourceText' | 'sourceLines'>
): RelGeoAnimationStep {
  const sourceLines = composeAnimationStoryLines(story.header, story.blocks, step.activeBlockIds);
  return {
    ...step,
    sourceLines,
    sourceText: `${sourceLines.map((line) => line.text).join('\n')}\n`,
  };
}
