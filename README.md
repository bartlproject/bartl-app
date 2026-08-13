<!-- SPDX-License-Identifier: Apache-2.0 -->

# bartl-app

> Developed on Codeberg: [codeberg.org/bartlapp/bartl-app](https://codeberg.org/bartlapp/bartl-app). The GitHub copy is a read-only mirror. Please open issues and pull requests on Codeberg.

Source of [bartl.app](https://bartl.app), the bilingual website for the Bartl design pattern.

Bartl is an open design pattern for the lifecycle of stateful applications. One startup mechanism observes local state, backup availability, and engine and state versions. It then initializes, restores, invokes product-specific migration, serves, or aborts in a controlled way.

The executable reference is [bartl-wordpress](https://codeberg.org/bartlapp/bartl-wordpress). It demonstrates the mechanism for one WordPress, MySQL, and Docker Compose configuration.

## Site structure

| What | Where |
| --- | --- |
| Shared DE/EN landing page layout | `src/components/Landing.astro` |
| DE/EN landing page copy | `src/content/landing.ts` |
| Interactive startup decision | `src/components/InteractivePseudoCode.astro` |
| Static pseudocode used by the spec | `src/components/PseudoCode.astro` |
| DE/EN landing route | `src/pages/[lang]/index.astro` |
| DE/EN technical spec route and layout | `src/pages/[lang]/spec.astro` |
| DE/EN technical spec copy | `src/content/spec.ts` |
| Navigation and footer | `src/components/Navbar.astro`, `src/components/Footer.astro` |
| UI strings and language utilities | `src/i18n/` |
| Site metadata and repository links | `src/data/constants.ts` |
| Page shell and metadata | `src/layouts/MainLayout.astro` |
| Design tokens and global styles | `src/assets/styles/global.css` |
| Legal pages and copy | `src/pages/[lang]/`, `src/legal/` |
| Static assets | `public/` |

Both languages use the same component structure. Product claims, technical inputs, reference boundaries, and navigation therefore change in one place instead of drifting between separate page implementations.

## Develop

Built with [Astro](https://astro.build). The Node version is pinned in `.nvmrc`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static build into dist/
npm run preview  # serve the build locally
```

The site is fully static. Development happens on Codeberg; the GitHub repository is a read-only deployment mirror.

## License

Code is licensed under Apache 2.0. See [LICENSE](LICENSE) and [NOTICE](NOTICE). Website prose is licensed under CC BY 4.0 as stated in the site footer.
