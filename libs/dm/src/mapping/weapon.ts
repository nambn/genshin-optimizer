import type { WeaponKey } from '@genshin-optimizer/consts'

export const weaponIdMap: Record<number | string, WeaponKey> = {
  //swords
  11101: 'DullBlade',
  11201: 'SilverSword',
  11301: 'CoolSteel',
  11302: 'HarbingerOfDawn',
  11303: 'TravelersHandySword',
  11304: 'DarkIronSword',
  11305: 'FilletBlade',
  11306: 'SkyriderSword',
  11401: 'FavoniusSword',
  11402: 'TheFlute',
  11403: 'SacrificialSword',
  11404: 'RoyalLongsword',
  11405: 'LionsRoar',
  11406: 'PrototypeRancour',
  11407: 'IronSting',
  11408: 'BlackcliffLongsword',
  11409: 'TheBlackSword',
  11410: 'TheAlleyFlash',
  // 11411: "",
  11412: 'SwordOfDescension',
  11413: 'FesteringDesire',
  11414: 'AmenomaKageuchi',
  11415: 'CinnabarSpindle',
  11416: 'KagotsurubeIsshin',
  11417: 'SapwoodBlade',
  11418: 'XiphosMoonlight',
  // 11419: "",
  // 11420: "",
  // 11421: "",
  11422: 'ToukabouShigure',
  11424: 'WolfFang',
  11425: 'FinaleOfTheDeep',
  11426: 'FleuveCendreFerryman',
  11427: 'TheDockhandsAssistant',
  11501: 'AquilaFavonia',
  11502: 'SkywardBlade',
  11503: 'FreedomSworn',
  11504: 'SummitShaper',
  11505: 'PrimordialJadeCutter',
  // 11506: "PrimordialJadeCutter",
  // 11507: "One Side",//new weapon?
  // 11508: "",
  11509: 'MistsplitterReforged',
  11510: 'HaranGeppakuFutsu',
  11511: 'KeyOfKhajNisut',
  11512: 'LightOfFoliarIncision',

  //claymore
  12101: 'WasterGreatsword',
  12201: 'OldMercsPal',
  12301: 'FerrousShadow',
  12302: 'BloodtaintedGreatsword',
  12303: 'WhiteIronGreatsword',
  // 12304: "Quartz",
  12305: 'DebateClub',
  12306: 'SkyriderGreatsword',
  12401: 'FavoniusGreatsword',
  12402: 'TheBell',
  12403: 'SacrificialGreatsword',
  12404: 'RoyalGreatsword',
  12405: 'Rainslasher',
  12406: 'PrototypeArchaic',
  12407: 'Whiteblind',
  12408: 'BlackcliffSlasher',
  12409: 'SerpentSpine',
  12410: 'LithicBlade',
  12411: 'SnowTombedStarsilver',
  12412: 'LuxuriousSeaLord',
  12414: 'KatsuragikiriNagamasa',
  12415: 'MakhairaAquamarine',
  12416: 'Akuoumaru',
  12417: 'ForestRegalia',
  12418: 'MailedFlower',
  12424: 'TalkingStick',
  12425: 'TidalShadow',
  12427: 'PortablePowerSaw',
  12501: 'SkywardPride',
  12502: 'WolfsGravestone',
  12503: 'SongOfBrokenPines',
  12504: 'TheUnforged',
  // 12505: "Primordial Jade Greatsword",
  // 12506: "The Other Side",
  // 12508: "",
  12510: 'RedhornStonethresher',
  12511: 'BeaconOfTheReedSea',

  //polearm
  13101: 'BeginnersProtector',
  13201: 'IronPoint',
  13301: 'WhiteTassel',
  13302: 'Halberd',
  13303: 'BlackTassel',
  // 13304: "The Flagstaff",
  13401: 'DragonsBane',
  13402: 'PrototypeStarglitter',
  13403: 'CrescentPike',
  13404: 'BlackcliffPole',
  13405: 'Deathmatch',
  13406: 'LithicSpear',
  13407: 'FavoniusLance',
  13408: 'RoyalSpear',
  13409: 'DragonspineSpear',
  13414: 'KitainCrossSpear',
  13415: 'TheCatch',
  13416: 'WavebreakersFin',
  13417: 'Moonpiercer',
  13419: 'MissiveWindspear',
  13424: 'BalladOfTheFjords',
  13425: 'RightfulReward',
  13501: 'StaffOfHoma',
  13502: 'SkywardSpine',
  // 13503: "",
  13504: 'VortexVanquisher',
  13505: 'PrimordialJadeWingedSpear',
  // 13506: "Deicide",
  13507: 'CalamityQueller',
  13509: 'EngulfingLightning',
  13511: 'StaffOfTheScarletSands',

  //catalyst
  14101: 'ApprenticesNotes',
  14201: 'PocketGrimoire',
  14301: 'MagicGuide',
  14302: 'ThrillingTalesOfDragonSlayers',
  14303: 'OtherworldlyStory',
  14304: 'EmeraldOrb',
  14305: 'TwinNephrite',
  // 14306: "Amber Bead",
  14401: 'FavoniusCodex',
  14402: 'TheWidsith',
  14403: 'SacrificialFragments',
  14404: 'RoyalGrimoire',
  14405: 'SolarPearl',
  14406: 'PrototypeAmber',
  14407: 'MappaMare',
  14408: 'BlackcliffAgate',
  14409: 'EyeOfPerception',
  14410: 'WineAndSong',
  // 14411: "",
  14412: 'Frostbearer',
  14413: 'DodocoTales',
  14414: 'HakushinRing',
  14415: 'OathswornEye',
  14416: 'WanderingEvenstar',
  14417: 'FruitOfFulfillment',
  14424: 'SacrificialJade',
  14425: 'FlowingPurity',
  14426: 'BalladOfTheBoundlessBlue',
  14501: 'SkywardAtlas',
  14502: 'LostPrayerToTheSacredWinds',
  // 14503: "Lost Ballade",
  14504: 'MemoryOfDust',
  14505: 'JadefallsSplendor',
  14506: 'EverlastingMoonglow',
  // 14505: "Primordial Jade Regalia",
  // 14506: "Diamond Visage",
  // 14508: "",
  14509: 'KagurasVerity',
  // 14510: "",
  14511: 'AThousandFloatingDreams',
  14512: 'TulaytullahsRemembrance',
  14514: 'TomeOfTheEternalFlow',

  //bow
  15101: 'HuntersBow',
  15201: 'SeasonedHuntersBow',
  15301: 'RavenBow',
  15302: 'SharpshootersOath',
  15303: 'RecurveBow',
  15304: 'Slingshot',
  15305: 'Messenger',
  // 15306: "EbonyBow",
  15401: 'FavoniusWarbow',
  15402: 'TheStringless',
  15403: 'SacrificialBow',
  15404: 'RoyalBow',
  15405: 'Rust',
  15406: 'PrototypeCrescent',
  15407: 'CompoundBow',
  15408: 'BlackcliffWarbow',
  15409: 'TheViridescentHunt',
  15410: 'AlleyHunter',
  15411: 'FadingTwilight',
  15412: 'MitternachtsWaltz',
  15413: 'WindblumeOde',
  15414: 'Hamayumi',
  15415: 'Predator',
  15416: 'MouunsMoon',
  15417: 'KingsSquire',
  15418: 'EndOfTheLine',
  15419: 'IbisPiercer',
  15424: 'ScionOfTheBlazingSun',
  15425: 'SongOfStillness',
  15501: 'SkywardHarp',
  15502: 'AmosBow',
  15503: 'ElegyForTheEnd',
  // 15504: "Kunwu's Wyrmbane",
  // 15505: "Primordial Jade Vista",
  // 15506: "Mirror Breaker",
  15507: 'PolarStar',
  15508: 'AquaSimulacra',
  15509: 'ThunderingPulse',
  15511: 'HuntersPath',
  15512: 'TheFirstGreatMagic',
} as const
export type WeaponId = keyof typeof weaponIdMap
