import { To, KeyCode, Manipulator, KarabinerRules } from "./types";

/**
 * Custom way to describe a command in a layer
 */
export interface LayerCommand {
  to: To[];
  description?: string;
}

type HyperKeySublayer = {
  [key_code in KeyCode]?: LayerCommand;
};

/**
 * Create a Hyper Key sublayer, where every command is prefixed with a key
 * e.g. Hyper + O ("Open") is the "open applications" layer, I can press
 * e.g. Hyper + O + G ("Google Chrome") to open Chrome
 */
export function createHyperSubLayer(
  sublayer_key: KeyCode,
  commands: HyperKeySublayer,
  allSubLayerVariables: string[]
): Manipulator[] {
  const subLayerVariableName = generateSubLayerVariableName(sublayer_key);

  return [
    {
      description: `Toggle Hyper sublayer ${sublayer_key}`,
      type: "basic",
      from: { key_code: sublayer_key, modifiers: { optional: ["any"] } },
      to: [{ set_variable: { name: subLayerVariableName, value: 1 } }],
      to_after_key_up: [{ set_variable: { name: subLayerVariableName, value: 0 } }],
      conditions: [
        ...allSubLayerVariables
          .filter((v) => v !== subLayerVariableName)
          .map((v) => ({ type: "variable_if" as const, name: v, value: 0 })),
        { type: "variable_if", name: "hyper", value: 1 },
      ],
    },
    ...(Object.keys(commands) as (keyof typeof commands)[]).map((key): Manipulator => ({
      ...commands[key],
      type: "basic" as const,
      from: { key_code: key, modifiers: { optional: ["any"] } },
      conditions: [{ type: "variable_if", name: subLayerVariableName, value: 1 }],
    })),
  ];
}

/**
 * Create all hyper sublayers. This needs to be a single function, as well need to
 * have all the hyper variable names in order to filter them and make sure only one
 * activates at a time
 */
export function createHyperSubLayers(subLayers: { [key_code in KeyCode]?: HyperKeySublayer | LayerCommand }): KarabinerRules[] {
  const allSubLayerVariables = Object.keys(subLayers).map((key) => generateSubLayerVariableName(key as KeyCode));

  return Object.entries(subLayers).map(([key, value]) =>
    "to" in value
      ? {
          description: `Hyper Key + ${key}`,
          manipulators: [
            {
              ...value,
              type: "basic" as const,
              from: { key_code: key as KeyCode, modifiers: { optional: ["any"] } },
              conditions: [
                { type: "variable_if", name: "hyper", value: 1 },
                ...allSubLayerVariables.map((v) => ({ type: "variable_if" as const, name: v, value: 0 })),
              ],
            },
          ],
        }
      : {
          description: `Hyper Key sublayer "${key}"`,
          manipulators: createHyperSubLayer(key as KeyCode, value, allSubLayerVariables),
        }
  );
}

function generateSubLayerVariableName(key: KeyCode) {
  return `hyper_sublayer_${key}`;
}

/**
 * Shortcut for "open" shell command
 */
export function open(what: string): LayerCommand {
  return {
    to: [{ shell_command: `open ${what}` }],
    description: `Open ${what}`,
  };
}

/**
 * Shortcut for managing window sizing with Rectangle
 */
export function rectangle(name: string): LayerCommand {
  return {
    to: [{ shell_command: `open -g rectangle://execute-action?name=${name}` }],
    description: `Window: ${name}`,
  };
}

/**
 * Shortcut for "Open an app" command (of which there are a bunch)
 */
export function app(name: string): LayerCommand {
  return open(`-a '${name}.app'`);
}
