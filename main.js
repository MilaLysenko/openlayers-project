import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import LayerGroup from 'ol/layer/Group';
import LayerSwitcher from 'ol-layerswitcher';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import WKT from 'ol/format/WKT.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';

const raster = new TileLayer({
  title: 'OpenStreetMap',
  type: 'base',
  visible: true,
  source: new OSM()
});

const wkt =
  'MULTIPOLYGON (((11.021941683607787 59.944518214479572, 11.02233843840375 59.94441885931758,' +
  '11.130057365507325 59.94610785657823, 11.130850875099249 59.911913750299867,' +
  '11.017379003454229 59.911714844292121, 11.021941683607787 59.944518214479572)))';

const format = new WKT();

const feature = format.readFeature(wkt, {
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857'
});

const vector = new VectorLayer({
  title: 'Multipolygon',
  visible: false,
  source: new VectorSource({
    features: [feature]
  })
});

const view = new View({
  center: [0, 0],
  zoom: 1,
});

const group = new LayerGroup({
  title: 'Layer Group',
  layers: [raster, vector]
});

const map = new Map({
  layers: [group],
  target: 'map',
  view
});

const layerSwitcher = new LayerSwitcher({
  reverse: true,
  groupSelectStyle: 'group'
});

map.addControl(layerSwitcher);
view.fit(feature.getGeometry(), {padding: [170, 50, 30, 150]});
