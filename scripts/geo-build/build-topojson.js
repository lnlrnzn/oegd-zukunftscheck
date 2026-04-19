const fs = require('fs');
const path = require('path');

const geoJsonPath = path.join(__dirname, 'frog.geojson');
const einwohnerPath = path.join(__dirname, '../../data/einwohnerzahlen_kreise.json');
const outputGeoJsonPath = path.join(__dirname, 'kreise-normalized.geo.json');

const AGS_REMAP = {
  '03152': '03159',
  '03156': '03159',
  '16056': '16063',
};

const geo = JSON.parse(fs.readFileSync(geoJsonPath, 'utf8'));
const einwohner = JSON.parse(fs.readFileSync(einwohnerPath, 'utf8'));
const einwohnerByAgs = new Map(einwohner.map((e) => [e.ags, e]));

const normalizedFeatures = [];
let waterBodyCount = 0;
let remappedCount = 0;

for (const f of geo.features) {
  const rawAgs = f.properties.cca_2;
  const type = f.properties.type_2;
  if (type === 'Water body' || !rawAgs) {
    waterBodyCount++;
    continue;
  }
  const ags = AGS_REMAP[rawAgs] || rawAgs;
  if (AGS_REMAP[rawAgs]) remappedCount++;
  const einwohnerEntry = einwohnerByAgs.get(ags);
  normalizedFeatures.push({
    type: 'Feature',
    geometry: f.geometry,
    properties: {
      ags,
      name: einwohnerEntry?.name || f.properties.name_2,
      bundesland: f.properties.name_1,
      type,
    },
  });
}

const normalized = {
  type: 'FeatureCollection',
  name: 'landkreise',
  features: normalizedFeatures,
};

fs.writeFileSync(outputGeoJsonPath, JSON.stringify(normalized));

const agsInMap = new Set(normalizedFeatures.map((f) => f.properties.ags));
const missing = einwohner.filter((e) => !agsInMap.has(e.ags));

console.log(`Input features: ${geo.features.length}`);
console.log(`Water body / null AGS skipped: ${waterBodyCount}`);
console.log(`AGS remapped (merged Landkreise): ${remappedCount}`);
console.log(`Output features: ${normalizedFeatures.length}`);
console.log(`Einwohner AGS coverage: ${einwohner.length - missing.length} / ${einwohner.length}`);
if (missing.length > 0) console.log('Missing:', missing.map((e) => `${e.ags} ${e.name}`));
console.log(`Output: ${outputGeoJsonPath}`);
console.log(`Size: ${(fs.statSync(outputGeoJsonPath).size / 1024).toFixed(0)} KB`);
