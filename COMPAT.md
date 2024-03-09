# Compatibility with Infinite Craft++ and other projects

## `ic-compat` Meta Tags
Infinite Craft++ supports the new `ic-compat` meta tags. This document serves as a draft to define and try to standardise these tags.
The purpose of these tags is to provide a standard communication scope to make projects (extensions, userscripts, etc) aware that another project is actively modifying the game and the ways in which it is doing so. These tags **do not** aim to determine _how_ each project should use the information provided, developers will still be responsible for determining which project should take priority in the event there are conflicting features.

### Tag Format
A single meta tag should be appended to the document's `head` when the project loads containing the following fields:
- `ic-compat` A null field to make the tag findable by other projects
- `project-name="YOUR_PROJECT_NAME"` A field containing the name of the project
- `project-version="YOUR_PROJECT_VERSION"` A field containing the version of the project
- `features-available="first-feature second-feature"` A field containing **all** the ways the project modifies the page.
- `features-enabled="first-feature second-feature"` A field containing the **currently active** ways the project modifies the page.

#### More info on `features-available` and `features-enabled`
- The list of features should be in `kebab-case` and space separated
- While there is currently no standard way to name features, it is expected that defacto names will emerge as more projects implement the system
- If the project enables or disables a feature, the `features-enabled` field should be updated

### Tag Example
This is an example of how a meta tag might look. It is not exhaustive, nor representive of the real Infinite Craft++ meta tag
`<meta ic-compat project-name="Infinite Craft++" project-version="1.2.2" features-available="sidebar-resize middle-click-duplicate speedrun-timer" features-enabled="speedrun-timer">`