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

export const brawlerGroups: BrawlerGroup[] = [
  { rarity: "Starting Brawler", brawlers: ["Shelly"], tone: "starting" },
  {
    rarity: "Rare",
    brawlers: ["Colt", "Bull", "Brock", "Barley", "Nita", "El Primo", "Poco", "Rosa"],
    tone: "rare"
  },
  {
    rarity: "Super Rare",
    brawlers: ["Rico", "Jessie", "Dynamike", "Darryl", "Penny", "Tick", "Carl", "8-Bit", "Jacky", "Gus"],
    tone: "super-rare"
  },
  {
    rarity: "Epic",
    brawlers: [
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
    ],
    tone: "epic"
  },
  {
    rarity: "Mythic",
    brawlers: [
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
    ],
    tone: "mythic"
  },
  {
    rarity: "Legendary",
    brawlers: [
      "Spike",
      "Crow",
      "Leon",
      "Sandy",
      "Surge",
      "Amber",
      "Meg",
      "Chester",
      "Cordelius",
      "Kit",
      "Draco",
      "Kenji",
      "Pierce"
    ],
    tone: "legendary"
  },
  { rarity: "Ultra Legendary", brawlers: ["Kaze", "Sirius"], tone: "ultra" }
];

export const brawlerOrder = brawlerGroups.flatMap((group) => group.brawlers);

export const brawlerDetails: Record<string, BrawlerDetail> = {
  Shelly: {
    className: "Damage Dealer",
    offense: 4,
    defense: 3,
    utility: 2,
    subtitle:
      "Damage Dealer with strong close-range burst, solid lane control, and straightforward utility options.",
    stats: [
      { label: "Health", value: "7,800", note: "+390 per level" },
      { label: "Speed", value: "770", note: "Normal movement speed" },
      { label: "Damage", value: "600", note: "+30 per level" },
      { label: "Reload", value: "1.5s", note: "Fast burst cycle" }
    ],
    starPowers: [
      {
        name: "Shell Shock",
        description: "Shelly's Super shells slow down enemies for 2 seconds.",
        usage: "Popular control option for pinning targets in place after a close-range Super."
      },
      {
        name: "Band-Aid",
        description: "When Shelly drops below 40% health, she instantly heals for 30 health after charging.",
        usage: "Defensive option that gives extra survivability in aggressive lane fights."
      }
    ],
    gadgets: [
      {
        name: "Fast Forward",
        description: "Shelly dashes in the aimed direction and fully reloads her ammo.",
        usage: "Best for gap-closing, escaping pressure, or immediately chaining more shots."
      },
      {
        name: "Clay Pigeons",
        description: "Shelly narrows her attack spread and extends its effective range for one activation.",
        usage: "Useful when you need poke value before committing into short-range fights."
      }
    ]
  }
};

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

  return null;
}
