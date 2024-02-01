import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
      //      {
      //        type: "basic",
      //        description: "Disable CMD + Tab to force Hyper Key usage",
      //        from: {
      //          key_code: "tab",
      //          modifiers: {
      //            mandatory: ["left_command"],
      //          },
      //        },
      //        to: [
      //          {
      //            key_code: "tab",
      //          },
      //        ],
      //      },
    ],
  },
  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      a: app("Arc"),
      g: app("Discord"),
      e: app("Finder"),
      c: app("Google Chrome"),
      // Open todo list managed via *H*ypersonic
      // h: open(
      //   "notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026"
      // ),
      // l: open(
      //   "raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink"
      // ),
      j: app("Notion"),
      r: app("Spotify"),
      d: app("Slack"),
      f: app("Todoist"),
      v: app("Visual Studio Code - Insiders"),
      w: app("Warp"),
      z: app("zoom.us"),
    },
    spacebar: {
      description: "Hyper Key + Spacebar",
      to: [{ key_code: "delete_or_backspace" }],
    },
    j: {
      description: "Hyper Key + j to left arrow",
      to: [{ key_code: "left_arrow" }],
    },
    k: {
      description: "Hyper Key + k to down arrow",
      to: [{ key_code: "down_arrow" }],
    },
    l: {
      description: "Hyper Key + l to up arrow",
      to: [{ key_code: "up_arrow" }],
    },
    semicolon: {
      description: "Hyper Key + semicolon to right arrow",
      to: [{ key_code: "right_arrow" }],
    },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      y: {
        description: "Window: First Third",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      k: {
        description: "Window: Top Half",
        to: [
          {
            key_code: "up_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      j: {
        description: "Window: Bottom Half",
        to: [
          {
            key_code: "down_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      o: {
        description: "Window: Last Third",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      h: {
        description: "Window: Left Half",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      l: {
        description: "Window: Right Half",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      f: {
        description: "Window: Full Screen",
        to: [
          {
            key_code: "f",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      u: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control", "right_shift"],
          },
        ],
      },
      i: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "tab",
            modifiers: ["right_control"],
          },
        ],
      },
      n: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "grave_accent_and_tilde",
            modifiers: ["right_command"],
          },
        ],
      },
      b: {
        description: "Window: Back",
        to: [
          {
            key_code: "open_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_command"],
          },
        ],
      },
      d: {
        description: "Window: Next display",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_control", "right_option", "right_command"],
          },
        ],
      },
    },

    // s = "System"
    s: {
      u: {
        to: [
          {
            key_code: "volume_increment",
          },
        ],
      },
      j: {
        to: [
          {
            key_code: "volume_decrement",
          },
        ],
      },
      i: {
        to: [
          {
            key_code: "display_brightness_increment",
          },
        ],
      },
      k: {
        to: [
          {
            key_code: "display_brightness_decrement",
          },
        ],
      },
      l: {
        to: [
          {
            key_code: "q",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      p: {
        to: [
          {
            key_code: "play_or_pause",
          },
        ],
      },
      semicolon: {
        to: [
          {
            key_code: "fastforward",
          },
        ],
      },
      e: {
        to: [
          {
            // Emoji picker
            key_code: "spacebar",
            modifiers: ["right_control", "right_command"],
          },
        ],
      },
      // Turn on Elgato KeyLight
      y: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 1, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      },
      h: {
        to: [
          {
            shell_command: `curl -H 'Content-Type: application/json' --request PUT --data '{ "numberOfLights": 1, "lights": [ { "on": 0, "brightness": 100, "temperature": 215 } ] }' http://192.168.8.84:9123/elgato/lights`,
          },
        ],
      },
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: "left_arrow" }],
      },
      j: {
        to: [{ key_code: "down_arrow" }],
      },
      k: {
        to: [{ key_code: "up_arrow" }],
      },
      l: {
        to: [{ key_code: "right_arrow" }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: "f", modifiers: ["right_control"] }],
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: "j", modifiers: ["right_control"] }],
      },
      d: {
        to: [{ key_code: "d", modifiers: ["right_shift", "right_command"] }],
      },
      u: {
        to: [{ key_code: "page_down" }],
      },
      i: {
        to: [{ key_code: "page_up" }],
      },
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },

    // r = "Raycast"
    r: {
      l: open(
        "raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink"
      ),
      e: open("raycast://extensions/raycast/emoji/search-emoji"),
      c: open("raycast://extensions/raycast/raycast/confetti"),
      a: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open("raycast://extensions/peduarte/silent-mention/index"),
      h: open(
        "raycast://extensions/raycast/clipboard-history/clipboard-history"
      ),
      1: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1"
      ),
      2: open(
        "raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2"
      ),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
          devices: [
            {
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: false,
                is_pointing_device: true,
                product_id: 16642,
                vendor_id: 1578,
              },
              ignore: true,
              manipulate_caps_lock_led: false,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            {
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: false,
                product_id: 835,
                vendor_id: 1452,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            {
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: false,
                is_pointing_device: true,
                product_id: 835,
                vendor_id: 1452,
              },
              ignore: true,
              manipulate_caps_lock_led: false,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            {
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: true,
                product_id: 20048,
                vendor_id: 35176,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
            {
              disable_built_in_keyboard_if_exists: false,
              fn_function_keys: [],
              game_pad_swap_sticks: false,
              identifiers: {
                is_game_pad: false,
                is_keyboard: true,
                is_pointing_device: false,
                product_id: 20048,
                vendor_id: 35176,
              },
              ignore: false,
              manipulate_caps_lock_led: true,
              mouse_flip_horizontal_wheel: false,
              mouse_flip_vertical_wheel: false,
              mouse_flip_x: false,
              mouse_flip_y: false,
              mouse_swap_wheels: false,
              mouse_swap_xy: false,
              simple_modifications: [],
              treat_as_built_in_keyboard: false,
            },
          ],
        },
      ],
    },
    null,
    2
  )
);
