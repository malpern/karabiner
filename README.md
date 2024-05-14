
# Hyper Key Configuration for Karabiner Elements

## Overview

This project provides a comprehensive configuration for Karabiner Elements to set up a Hyper Key (⌃⌥⇧⌘) using Caps Lock. The configuration includes sublayers for various commands and applications, enhancing productivity by enabling quick access to frequently used actions.

## Features

- **Hyper Key Setup**: Transform Caps Lock into a powerful Hyper Key.
- **Sublayers**: Organize commands into logical groups for easy access.
- **Custom Commands**: Define custom shell commands, window management actions, and application shortcuts.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/karabiner-hyper-key.git
    cd karabiner-hyper-key
    ```

2. **Install Dependencies**:
    ```bash
    yarn install
    ```

3. **Build the Configuration**:
    ```bash
    yarn run build
    ```

4. **Load the Configuration in Karabiner Elements**:
    - Open Karabiner Elements and navigate to the **Complex Modifications** tab.
    - Click on **Add Rule** and then **Import More Rules from the Internet**.
    - Drag and drop the generated `karabiner.json` file from this repository into the Karabiner Elements window.
    - Follow the prompts to enable the new rules.

## File Structure

### `types.ts`

Defines TypeScript types and interfaces for the configuration.

```typescript
export interface KarabinerRules {
  description?: string;
  manipulators?: Manipulator[];
}

export interface Manipulator {
  description?: string;
  type: "basic";
  from: From;
  to?: To[];
  to_after_key_up?: To[];
  to_if_alone?: To[];
  conditions?: Condition[];
}

// Additional type definitions...
```

### `utils.ts`

Provides utility functions for creating commands and sublayers.

```typescript
import { LayerCommand } from "./types";

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

// Additional utility functions...
```

### `hyper_key_config.ts`

Main configuration file defining the hyper key and its sublayers.

```typescript
import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, open, app, rectangle } from "./utils";

const rules: KarabinerRules[] = [
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: { key_code: "caps_lock", modifiers: { optional: ["any"] } },
        to: [{ set_variable: { name: "hyper", value: 1 } }],
        to_after_key_up: [{ set_variable: { name: "hyper", value: 0 } }],
        to_if_alone: [{ key_code: "escape" }],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    o: { 1: app("1Password"), g: app("Google Chrome") },
    w: { f: rectangle("maximize"), l: rectangle("left-half") },
    // Additional sublayer definitions...
  }),
];

fs.writeFileSync("karabiner.json", JSON.stringify({ profiles: [{ name: "Default", complex_modifications: { rules } }] }, null, 2));
```

## Example Usage

### Creating a Sublayer

```typescript
import { createHyperSubLayer } from "./utils";

const sublayer = createHyperSubLayer("o", {
  g: open("https://google.com"),
  n: open("https://news.ycombinator.com"),
  // Additional commands...
}, ["hyper_sublayer_o"]);
```

### Adding Commands

```typescript
import { open, app } from "./utils";

// Open Google Chrome
const openChrome = open("Google Chrome");

// Open 1Password
const open1Password = app("1Password");
```

## Illustrations

### Hyper Key Activation

![Hyper Key Activation](illustrations/hyper_key_activation.png)

### Sublayer Example

![Sublayer Example](illustrations/sublayer_example.png)

## Conclusion

This configuration transforms your Caps Lock key into a powerful productivity tool, providing quick access to applications and commands through well-organized sublayers. Customize it to fit your workflow and enjoy a more efficient computing experience.

For more detailed customization, refer to the Karabiner Elements documentation and explore the provided TypeScript types and utility functions to extend functionality further.
