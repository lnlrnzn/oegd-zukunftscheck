# Landkreise TopoJSON Build

Reproduziert `public/geo/landkreise.topo.json` aus offenen Quellen.

## Vorgehen

```bash
# 1. Quelle laden (GADM-basiert, enthält AGS als cca_2)
curl -sL -o scripts/geo-build/frog.geojson \
  https://raw.githubusercontent.com/frog89/geojson/main/germany.geojson

# 2. AGS normalisieren + Remapping für fusionierte Kreise (Göttingen 2016, Eisenach 2021)
node scripts/geo-build/build-topojson.js

# 3. Simplifizieren + zwei Layer (Landkreise + Bundeslaender) in ein TopoJSON
npx mapshaper \
  -i scripts/geo-build/kreise-normalized.geo.json name=landkreise \
  -simplify 5% keep-shapes \
  -dissolve2 fields=ags,name,bundesland,type target=landkreise \
  -dissolve2 bundesland target=landkreise + name=bundeslaender \
  -o format=topojson quantization=1e5 public/geo/landkreise.topo.json \
    target=landkreise,bundeslaender
```

## Ergebnis

- ~410 KB TopoJSON mit zwei Layern:
  - `landkreise` — 401 Polygone (Properties: `ags`, `name`, `bundesland`, `type`)
  - `bundeslaender` — 16 Polygone (nur als visuelle Overlay-Begrenzung)
- 100 % AGS-Coverage gegen `data/einwohnerzahlen_kreise.json`

## Quelle

- GeoJSON: [frog89/geojson](https://github.com/frog89/geojson) (GADM v2 abgeleitet)
- AGS-Join: Property `cca_2` (5-stellig)
- Remappings für Gebietsreformen:
  - Göttingen 03152 + Osterode am Harz 03156 → 03159 (2016)
  - Eisenach 16056 → Wartburgkreis 16063 (2021)
