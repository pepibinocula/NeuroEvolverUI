# NeuroEvolver.UI

Angular 20, standalone components, signals, lazy routes.

    npm install
    npx ng serve

Structure: `core/` (models, api, auth), `shared/ui/` (ne-* components), `layout/`, `features/*`.
API calls go through abstract classes in `core/api`; the real implementation is swapped in `app.config.ts`.
Tokens live in `src/styles/_tokens.scss`. Open /styleguide with the role switcher set to Разработчик.
