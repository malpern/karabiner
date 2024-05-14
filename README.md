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
    - Import the generated `karabiner.json` file from this repository.

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
