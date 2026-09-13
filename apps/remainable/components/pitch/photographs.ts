// Documentary photographs: individual reuse terms apply; see public/pitch/photos/LICENSES.md.
export const photographs = {
  "damage": {
    "src": "/pitch/photos/damage.jpg",
    "alt": "A damaged apartment building in Irpin, with exposed floors, broken windows and much of its structure still standing.",
    "caption": "Irpin, Ukraine \u00b7 damaged residential building",
    "creator": "Rasal Hague",
    "source": "https://commons.wikimedia.org/wiki/File:A_damaged_building_Irpin_Lypky.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "changes": "Resized and JPEG-compressed; displayed without cropping or scene alterations."
  },
  "repair": {
    "src": "/pitch/photos/repair.jpg",
    "alt": "Scaffolding surrounds the stone entrance and tower of Washington National Cathedral during earthquake-damage repairs.",
    "caption": "Washington National Cathedral \u00b7 earthquake-damage repairs",
    "creator": "Ser Amantio di Nicolao",
    "source": "https://commons.wikimedia.org/wiki/File:Scaffolding_to_repair_earthquake_damage_at_Washington_National_Cathedral.jpg",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "changes": "Resized and JPEG-compressed; displayed without cropping or scene alterations."
  },
  "reuse": {
    "src": "/pitch/photos/reuse.jpg",
    "alt": "Rows of reclaimed red and yellow bricks stacked closely together before construction.",
    "caption": "Reclaimed bricks \u00b7 organised for construction",
    "creator": "Mnv179",
    "source": "https://commons.wikimedia.org/wiki/File:Recycled_bricks_organised_before_construction.jpg",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "changes": "Resized and JPEG-compressed; displayed without cropping or scene alterations."
  }
} as const;
export type PhotographId = keyof typeof photographs;
