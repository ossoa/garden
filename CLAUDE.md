# Garden Project — Claude Context

A static garden site and set of Obsidian notes for a private garden in Stockholm, Sweden.

## What's here

| File/Folder | Purpose |
|---|---|
| `index.html` + `main.js` + `styles.css` | Static single-page app with an SVG garden map |
| `data.js` | **Source of truth** — all plant metadata, colours, and guide links |
| `plants/<slug>.md` | Per-plant care guides (tracked by git) |
| `plants.md` | Personal bilingual plant list (gitignored) |
| `seasonal-checklist.md` | Consolidated seasonal task list (gitignored) |

## Plants

### Front garden
| # | Name | pl | se |
|---|---|---|---|
| 1 | English Ivy | Bluszcz pospolity | Murgröna |
| 2 | Hydrangea | Hortensja | Hortensia |
| 3 | Saucer Magnolia | Magnolia pośrednia | Praktmagnolia |
| 4 | Rhododendron | Rododendron | Rododendron |

### Back garden
| # | Name | pl | se |
|---|---|---|---|
| 1 | English Ivy (pot) | Bluszcz pospolity | Murgröna |
| 2 | Schersmin (Mock Orange) | Jaśminowiec wonny | Schersmin |
| 3 | Boxwood (pot) | Bukszpan | Buxbom |
| 4 | **Unknown** — climbing plant with yellow flowers on terrace wall | — | — |
| 5 | Privet | Ligustr pospolity | Liguster |
| 6 | Black Elder | Bez czarny | Fläder |
| 7 | Redcurrant Bush | Porzeczka czerwona | Röda vinbär |
| 8 | Forsythia | Forsycja | Forsythia |

Back plant 4 is still unidentified.

## Conventions

### Adding or updating a plant in `data.js`
- `name`: English common name
- `pl` / `se`: Polish and Swedish names (`null` if unknown)
- `type`: short description of plant type
- `desc`: one or two sentences for the UI card
- `shape`: one of `shrub`, `tree`, `climber`, `hedge`, `grass`, `potted`
- `foliage`: hex colour for the main leaf/body colour
- `accent`: hex colour for flowers, berries, or other accent
- `guide`: path to the care guide, e.g. `"plants/forsythia.md"` (omit if unknown)
- `unknown: true`: add this flag for unidentified plants (no `guide`)

### Care guide files (`plants/<slug>.md`)
- Filename: kebab-case English name, e.g. `forsythia.md`, `black-elder.md`
- Sections (in order): Basic Information → Characteristics → Growing Conditions → Location Notes → Monthly Care Calendar → Pruning Guide → Seasonal Considerations → Common Problems → Tips for Success
- Location Notes should be specific to Stockholm / the garden
- All advice should be appropriate for Swedish hardiness zones

## Mulching guide

Two products in use: **barkmull** (fine composted bark, nutritive) and **täckbark brun** (coarse pine bark, decorative/weed suppression, acidic).

| Plant | Product | Notes |
|---|---|---|
| Rhododendron | Täckbark Brun | Pine bark is naturally acidic — ideal |
| Saucer Magnolia | Täckbark Brun | Keep 10 cm gap from trunk |
| Forsythia | Täckbark Brun | Large established shrub |
| Schersmin | Täckbark Brun | Large established shrub |
| Unknown climbing (back 4) | Täckbark Brun | Low-maintenance coverage |
| Privet (back 5) | Täckbark Brun | Border coverage |
| Hydrangea | Barkmull | Needs moisture retention and nutrients |
| Redcurrant | Barkmull | Shallow roots; clear grass first (50 cm radius) |
| Black Elder | Barkmull | Benefits from organic breakdown |
| English Ivy (ground) | Barkmull | Finer mulch suits ground cover |
| English Ivy (pot) | Barkmull | Pots need finer mulch |
| Boxwood (pot) | Barkmull | Coarse chunks don't suit containers |

**Grass around back garden plants:** Grass grows around Redcurrant, Black Elder, and Forsythia. Clear grass before mulching Redcurrant (most important). Cardboard/newspaper trick: lay under mulch to suppress regrowth. Smultron (wild strawberries) around base are fine to leave.

## Git & deployment

- `plants.md` and `seasonal-checklist.md` are in `.gitignore` — edits to them are fine but they will never be committed
- Push to `master` → GitHub Pages at `ossoa/garden` deploys automatically (1–2 min)
- GitHub: `git@github.com:ossoa/garden.git`
