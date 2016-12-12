# Kerbal Flight Control

A system for displaying remote telemetry in Kerbal Space Program using kOS and Node.

## Components

- A graph visualization
  - Debouncing (slowing the data down)
  - Preformatting the data (server-side)
  - General tidying

- Curses-like screen
  - Fuel gauge (think alsamixer)
  - Stage number

- Map view
  - Convert geo coordinates to X, Y
  - We don't actually have a map
    - Build our own for each planet
  - Test it with a real map

- Before next time
  - Put something into an eliptical orbit
  - Lighten up the screen overlays
