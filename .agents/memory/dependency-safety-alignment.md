---
name: Dependency safety alignment
description: How to recover safely when a locked package is blocked and the newest release is too recent or requires a newer runtime.
---

When replacing a package blocked by Replit's package firewall, select the newest release that satisfies the workspace's minimum release age and verify its Node engine before regenerating the lockfile.

**Why:** A latest-version upgrade can pass package resolution but leave the configured runtime unsupported, especially when transitive dependencies also raise their Node requirement.

**How to apply:** Check release timestamps and engine metadata together, align the Replit Node module first, then validate a frozen install, code generation, and the full workspace build under that runtime.