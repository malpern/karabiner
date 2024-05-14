<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hyper Key Configuration for Karabiner Elements</title>
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css" rel="stylesheet">
<style>
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1, h2, h3, h4, h5, h6 {
    color: #333;
  }
  pre {
    background: #f4f4f4;
    padding: 10px;
    border-left: 3px solid #ccc;
  }
  code {
    background: #f4f4f4;
    padding: 2px 5px;
  }
  img {
    max-width: 100%;
  }
</style>
</head>
<body>
<div class="container">
  <h1>Hyper Key Configuration for Karabiner Elements</h1>
  <h2>Overview</h2>
  <p>This project provides a comprehensive configuration for Karabiner Elements to set up a Hyper Key (⌃⌥⇧⌘) using Caps Lock. The configuration includes sublayers for various commands and applications, enhancing productivity by enabling quick access to frequently used actions.</p>
  <h2>Features</h2>
  <ul>
    <li><strong>Hyper Key Setup</strong>: Transform Caps Lock into a powerful Hyper Key.</li>
    <li><strong>Sublayers</strong>: Organize commands into logical groups for easy access.</li>
    <li><strong>Custom Commands</strong>: Define custom shell commands, window management actions, and application shortcuts.</li>
  </ul>
  <h2>Installation</h2>
  <ol>
    <li><strong>Clone the Repository</strong>:
      <pre><code class="language-bash">git clone https://github.com/yourusername/karabiner-hyper-key.git
cd karabiner-hyper-key</code></pre>
    </li>
    <li><strong>Install Dependencies</strong>:
      <pre><code class="language-bash">yarn install</code></pre>
    </li>
    <li><strong>Build the Configuration</strong>:
      <pre><code class="language-bash">yarn run build</code></pre>
    </li>
    <li><strong>Load the Configuration in Karabiner Elements</strong>:
      <p>Open Karabiner Elements and navigate to the <strong>Complex Modifications</strong> tab.</p>
      <p>Import the generated <code>karabiner.json</code> file from this repository.</p>
    </li>
  </ol>
  <h2>File Structure</h2>
  <h3><code>types.ts</code></h3>
  <p>Defines TypeScript types and interfaces for the configuration.</p>
  <pre><code class="language-typescript">export interface KarabinerRules {
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

// Additional type definitions...</code></pre>
  <h3><code>utils.ts</code></h3>
  <p>Provides utility functions for creating commands and sublayers.</p>
  <pre><code class="language-typescript">import { LayerCommand } from "./types";

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

// Additional utility functions...</code></pre>
  <h3><code>hyper_key_config.ts</code></h3>
  <p>Main configuration file defining the hyper key and its sublayers.</p>
  <pre><code class="language-typescript">import fs from "fs";
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

fs.writeFileSync("karabiner.json", JSON.stringify({ profiles: [{ name: "Default", complex_modifications: { rules } }] }, null, 2));</code></pre>
  <h2>Example Usage</h3>
  <h3>Creating a Sublayer</h3>
  <pre><code class="language-typescript">import { createHyperSubLayer } from "./utils";

const sublayer = createHyperSubLayer("o", {
  g: open("https://google.com"),
  n: open("https://news.ycombinator.com"),
  // Additional commands...
}, ["hyper_sublayer_o"]);\</code></pre>
  <h3>Adding Commands</h3>
  <pre><code class="language-typescript">import { open, app } from "./utils";

// Open Google Chrome
const openChrome = open("Google Chrome");

// Open 1Password
const open1Password = app("1Password");</code></pre>
  <h2>Illustrations</h2>
  <h3>Hyper Key Activation</h3>
  <img src="illustrations/hyper_key_activation.png" alt="Hyper Key Activation">
  <h3>Sublayer Example</h3>
  <img src="illustrations/sublayer_example.png" alt="Sublayer Example">
  <h2>Conclusion</h2>
  <p>This configuration transforms your Caps Lock key into a powerful productivity tool, providing quick access to applications and commands through well-organized sublayers. Customize it to fit your workflow and enjoy a more efficient computing experience.</p>
  <p>For more detailed customization, refer to the Karabiner Elements documentation and explore the provided TypeScript types and utility functions to extend functionality further.</p>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-typescript.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-bash.min.js"></script>
</body>
</html>
