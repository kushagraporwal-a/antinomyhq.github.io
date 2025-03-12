/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

import {SidebarsConfig} from "@docusaurus/plugin-content-docs"

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    {
      type: "category",
      label: "Getting Started",
      collapsed: false,
      items: ["introduction", "installation", "quick-setup"],
    },
    {
      type: "category",
      label: "Core Features",
      collapsed: false,
      items: [
        "commands", 
        "operation-modes",
        "environment-configuration", 
        "custom-workflows",
        "security-features"
      ],
    },
    {
      type: "category",
      label: "Usage & Best Practices",
      collapsed: false,
      items: ["shell-integration", "logging", "best-practices", "why-shell"],
    },
  ],
}

module.exports = sidebars