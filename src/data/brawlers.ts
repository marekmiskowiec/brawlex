import brawlersData from "./brawlers.json";

export type BrawlerStat = {
  label: string;
  value: string;
  note: string;
};

export type BrawlerAbility = {
  name: string;
  description: string;
  usage: string;
};

export type BrawlerDetail = {
  className: string;
  offense: number;
  defense: number;
  utility: number;
  subtitle: string;
  stats: BrawlerStat[];
  starPowers: BrawlerAbility[];
  gadgets: BrawlerAbility[];
};

export type BrawlerGroup = {
  rarity: string;
  tone: string;
  brawlers: string[];
};

type ApiAbility = {
  id: number;
  name: string;
};

type ApiGear = {
  id: number;
  name: string;
  level: number;
};

type ApiBrawler = {
  id: number;
  name: string;
  starPowers: ApiAbility[];
  hyperCharges?: ApiAbility[];
  gears?: ApiGear[];
  gadgets: ApiAbility[];
};

const apiItems = (brawlersData.items as ApiBrawler[]).map((item) => ({
  ...item,
  displayName: normalizeApiName(item.name)
}));

const apiMap = new Map(apiItems.map((item) => [item.displayName, item]));

function titleCase(text: string) {
  return text
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeApiName(name: string) {
  const upper = name.toUpperCase();

  const specialNames: Record<string, string> = {
    "8-BIT": "8-Bit",
    "MR. P": "Mr. P",
    "R-T": "R-T",
    "EL PRIMO": "El Primo",
    "LARRY & LAWRIE": "Larry & Lawrie",
    "JAE-YONG": "Jae-Yong"
  };

  return specialNames[upper] ?? titleCase(upper);
}

function normalizeAbilityName(name: string) {
  return titleCase(name).replace(/\bNo\b/g, "No.").replace(/\bId\b/g, "ID");
}

const groupDefinitions = [
  { rarity: "Starting Brawler", tone: "starting", names: ["Shelly"] },
  { rarity: "Rare", tone: "rare", names: ["Colt", "Bull", "Brock", "Barley", "Nita", "El Primo", "Poco", "Rosa"] },
  {
    rarity: "Super Rare",
    tone: "super-rare",
    names: ["Rico", "Jessie", "Dynamike", "Darryl", "Penny", "Tick", "Carl", "8-Bit", "Jacky", "Gus"]
  },
  {
    rarity: "Epic",
    tone: "epic",
    names: [
      "Bo",
      "Piper",
      "Pam",
      "Frank",
      "Bibi",
      "Bea",
      "Emz",
      "Gale",
      "Nani",
      "Colette",
      "Edgar",
      "Stu",
      "Belle",
      "Grom",
      "Griff",
      "Ash",
      "Lola",
      "Bonnie",
      "Sam",
      "Mandy",
      "Maisie",
      "Hank",
      "Pearl",
      "Larry & Lawrie",
      "Angelo",
      "Berry",
      "Shade",
      "Meeple",
      "Trunk"
    ]
  },
  {
    rarity: "Mythic",
    tone: "mythic",
    names: [
      "Mortis",
      "Tara",
      "Gene",
      "Mr. P",
      "Max",
      "Sprout",
      "Lou",
      "Byron",
      "Ruffs",
      "Squeak",
      "Buzz",
      "Fang",
      "Eve",
      "Janet",
      "Otis",
      "Buster",
      "Gray",
      "R-T",
      "Willow",
      "Doug",
      "Chuck",
      "Charlie",
      "Mico",
      "Melodie",
      "Lily",
      "Clancy",
      "Moe",
      "Juju",
      "Ollie",
      "Lumi",
      "Finx",
      "Jae-Yong",
      "Alli",
      "Mina",
      "Ziggy",
      "Gigi",
      "Glowbert",
      "Najia"
    ]
  },
  {
    rarity: "Legendary",
    tone: "legendary",
    names: ["Spike", "Crow", "Leon", "Sandy", "Surge", "Amber", "Meg", "Chester", "Cordelius", "Kit", "Draco", "Kenji", "Pierce"]
  },
  { rarity: "Ultra Legendary", tone: "ultra", names: ["Kaze", "Sirius"] }
];

export const brawlerGroups: BrawlerGroup[] = groupDefinitions.map((group) => ({
  rarity: group.rarity,
  tone: group.tone,
  brawlers: group.names.filter((name) => apiMap.has(name))
}));

export const brawlerOrder = apiItems.map((item) => item.displayName);

function buildDetail(item: ApiBrawler): BrawlerDetail {
  const starPowers = item.starPowers.map((power, index) => ({
    name: normalizeAbilityName(power.name),
    description: `Official API entry for ${normalizeApiName(item.name)} star power ${index + 1}.`,
    usage: `Linked from daily data refresh. Ability id: ${power.id}.`
  }));

  const gadgets = item.gadgets.map((gadget, index) => ({
    name: normalizeAbilityName(gadget.name),
    description: `Official API entry for ${normalizeApiName(item.name)} gadget ${index + 1}.`,
    usage: `Linked from daily data refresh. Ability id: ${gadget.id}.`
  }));

  return {
    className: "API Synced",
    offense: Math.min(5, Math.max(1, item.starPowers.length + item.gadgets.length - 1)),
    defense: Math.min(5, Math.max(1, Math.ceil((item.gears?.length ?? 0) / 2))),
    utility: Math.min(5, Math.max(1, (item.hyperCharges?.length ?? 0) + 2)),
    subtitle: `${normalizeApiName(item.name)} is synced from brawlers.json with ${item.starPowers.length} star powers, ${item.gadgets.length} gadgets, ${item.gears?.length ?? 0} gears, and ${item.hyperCharges?.length ?? 0} hypercharges.`,
    stats: [
      { label: "Brawler ID", value: String(item.id), note: "Official API id" },
      { label: "Star Powers", value: String(item.starPowers.length), note: "Available upgrades" },
      { label: "Gadgets", value: String(item.gadgets.length), note: "Available gadgets" },
      { label: "Gears", value: String(item.gears?.length ?? 0), note: `${item.hyperCharges?.length ?? 0} hypercharges` }
    ],
    starPowers,
    gadgets
  };
}

export const brawlerDetails: Record<string, BrawlerDetail> = Object.fromEntries(
  apiItems.map((item) => [item.displayName, buildDetail(item)])
);

export function slugifyBrawler(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBrawlerMeta(name: string) {
  for (const group of brawlerGroups) {
    if (group.brawlers.includes(name)) {
      return {
        name,
        rarity: group.rarity,
        tone: group.tone,
        slug: slugifyBrawler(name),
        detail: brawlerDetails[name] ?? null
      };
    }
  }

  if (brawlerDetails[name]) {
    return {
      name,
      rarity: "Brawler",
      tone: "starting",
      slug: slugifyBrawler(name),
      detail: brawlerDetails[name]
    };
  }

  return null;
}
