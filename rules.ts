import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle } from "./utils";

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
    spacebar: open("raycast://extensions/stellate/mxstbr-commands/create-notion-todo"),
    b: {
      t: open("https://twitter.com"),
      p: open("https://qrtr.ly/plan"),
      y: open("https://news.ycombinator.com"),
      f: open("https://facebook.com"),
      r: open("https://reddit.com"),
    },
    o: {
      1: app("1Password"),
      g: app("Google Chrome"),
      c: app("Notion Calendar"),
      v: app("Visual Studio Code"),
      d: app("Discord"),
      s: app("Slack"),
      e: app("Superhuman"),
      n: app("Notion"),
      t: app("Terminal"),
      h: open("notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"),
      z: app("zoom.us"),
      m: app("Texts"),
      f: app("Finder"),
      r: app("Texts"),
      i: app("Texts"),
      p: app("Spotify"),
      a: app("iA Presenter"),
      w: open("Texts"),
      l: open("raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"),
    },
    w: {
      semicolon: { description: "Window: Hide", to: [{ key_code: "h", modifiers: ["right_command"] }] },
      y: rectangle("previous-display"),
      o: rectangle("next-display"),
      k: rectangle("top-half"),
      j: rectangle("bottom-half"),
      h: rectangle("left-half"),
      l: rectangle("right-half"),
      f: rectangle("maximize"),
      u: { description: "Window: Previous Tab", to: [{ key_code: "tab", modifiers: ["right_control", "right_shift"] }] },
      i: { description: "Window: Next Tab", to: [{ key_code: "tab", modifiers: ["right_control"] }] },
      n: { description: "Window: Next Window", to: [{ key_code: "grave_accent_and_tilde", modifiers: ["right_command"] }] },
      b: { description: "Window: Back", to: [{ key_code: "open_bracket", modifiers: ["right_command"] }] },
      m: { description: "Window: Forward", to: [{ key_code: "close_bracket", modifiers: ["right_command"] }] },
      d: { description: "Window: Next display", to: [{ key_code: "right_arrow", modifiers: ["right_control", "right_option", "right_command"] }] },
    },
    s: {
      u: { to: [{ key_code: "volume_increment" }] },
      j: { to: [{ key_code: "volume_decrement" }] },
      i: { to: [{ key_code: "display_brightness_increment" }] },
      k: { to: [{ key_code: "display_brightness_decrement" }] },
      l: { to: [{ key_code: "q", modifiers: ["right_control", "right_command"] }] },
      p: { to: [{ key_code: "play_or_pause" }] },
      semicolon: { to: [{ key_code: "fastforward" }] },
      e: open("raycast://extensions/thomas/elgato-key-light/toggle?launchType=background"),
      d: open("raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background"),
      t: open("raycast://extensions/raycast/system/toggle-system-appearance"),
    },
    v: {
      h: { to: [{ key_code: "left_arrow" }] },
      j: { to: [{ key_code: "down_arrow" }] },
      k: { to: [{ key_code: "up_arrow" }] },
      l: { to: [{ key_code: "right_arrow" }] },
      m: { to: [{ key_code: "f", modifiers: ["right_control"] }] },
      s: { to: [{ key_code: "j", modifiers: ["right_control"] }] },
      d: { to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }] },
      u: { to: [{ key_code: "page_down" }] },
      i: { to: [{ key_code: "page_up" }] },
    },
    c: {
      p: { to: [{ key_code: "play_or_pause" }] },
      n: { to: [{ key_code: "fastforward" }] },
      b: { to: [{ key_code: "rewind" }] },
    },
    r: {
      n: open("raycast://script-commands/dismiss-notifications"),
      l: open("raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"),
      e: open("raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"),
      c: open("raycast://extensions/raycast/system/open-camera"),
      p: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open("raycast://extensions/raycast/clipboard-history/clipboard-history"),
      1: open("raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"),
      2: open("raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: { show_in_menu_bar: false },
      profiles: [
        {
          name: "Micah",
          complex_modifications: { rules },
          selected: true, // Set the "Micah" profile as the active profile
        },
      ],
    },
    null,
    2
  )
);

console.log("Karabiner-Elements configuration updated successfully.");
