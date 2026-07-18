export class Faction {
    private _factionType: FactionEnum;

    constructor(faction: FactionEnum) {
        this._factionType = faction;
    }
    
    public get factionType(): FactionEnum {
        return this._factionType;
    }
    
    public get imageSrc(): string {
        return factionData[this.factionType].src;
    }

    public toString(): string {
        return factionData[this.factionType].name;
    }

    public equals(faction: Faction | undefined): boolean {
        return this.factionType === faction?.factionType;
    }
}

export enum FactionEnum {
    TheArborec = 0,
    TheBaronyOfLetnev = 1,
    TheClanOfSaar = 2,
    TheEmbersOfMuaat = 3,
    TheEmiratesOfHacan = 4,
    TheFederationOfSol = 5,
    TheGhostsOfCreuss = 6,
    TheL1Z1XMindnet = 7,
    TheMentakCoalition = 8,
    TheNaaluCollective = 9,
    TheNekroVirus = 10,
    SardakkNorr = 11,
    TheUniversitiesOfJolNar = 12,
    TheWinnu = 13,
    TheXxchaKingdom = 14,
    TheYinBrotherhood = 15,
    TheYssarilTribes = 16,
    TheArgentFlight = 17,
    TheEmpyrean = 18,
    TheMahactGeneSorcerers = 19,
    TheNaazRokhaAlliance = 20,
    TheNomad = 21,
    TheTitansOfUl = 22,
    TheVuilRaithCabal = 23,
    TheCouncilKeleres = 24,
    LastBastion = 25,
    TheRalNelConsortium = 26,
    TheDeepwroughtScholarate = 27,
    TheCrimsonRebellion = 28,
    TheFirmament = 29,
    TheObsidian = 30,
}

export const factionData: Record<FactionEnum, { name: string; src: string }> = {
    [FactionEnum.TheArborec]: {
        name: "The Arborec",
        src: "the_arborec.png"
    },
    [FactionEnum.TheBaronyOfLetnev]: {
        name: "The Barony of Letnev",
        src: "the_barony_of_letnev.png"
    },
    [FactionEnum.TheClanOfSaar]: {
        name: "The Clan of Saar",
        src: "the_clan_of_saar.png"
    },
    [FactionEnum.TheEmbersOfMuaat]: {
        name: "The Embers of Muaat",
        src: "the_embers_of_muaat.png"
    },
    [FactionEnum.TheEmiratesOfHacan]: {
        name: "The Emirates of Hacan",
        src: "the_emirates_of_hacan.png"
    },
    [FactionEnum.TheFederationOfSol]: {
        name: "The Federation of Sol",
        src: "the_federation_of_sol.png"
    },
    [FactionEnum.TheGhostsOfCreuss]: {
        name: "The Ghosts of Creuss",
        src: "the_ghosts_of_creuss.png"
    },
    [FactionEnum.TheL1Z1XMindnet]: {
        name: "The L1Z1X Mindnet",
        src: "the_l1z1x_mindnet.png"
    },
    [FactionEnum.TheMentakCoalition]: {
        name: "The Mentak Coalition",
        src: "the_mentak_coalition.png"
    },
    [FactionEnum.TheNaaluCollective]: {
        name: "The Naalu Collective",
        src: "the_naalu_collective.png"
    },
    [FactionEnum.TheNekroVirus]: {
        name: "The Nekro Virus",
        src: "the_nekro_virus.png"
    },
    [FactionEnum.SardakkNorr]: {
        name: "Sardakk N'orr",
        src: "sardakk_n'orr.png"
    },
    [FactionEnum.TheUniversitiesOfJolNar]: {
        name: "The Universities of Jol-Nar",
        src: "the_universities_of_jol-nar.png"
    },
    [FactionEnum.TheWinnu]: {
        name: "The Winnu",
        src: "the_winnu.png"
    },
    [FactionEnum.TheXxchaKingdom]: {
        name: "The Xxcha Kingdom",
        src: "the_xxcha_kingdom.png"
    },
    [FactionEnum.TheYinBrotherhood]: {
        name: "The Yin Brotherhood",
        src: "the_yin_brotherhood.png"
    },
    [FactionEnum.TheYssarilTribes]: {
        name: "The Yssaril Tribes",
        src: "the_yssaril_tribes.png"
    },
    [FactionEnum.TheArgentFlight]: {
        name: "The Argent Flight",
        src: "the_argent_flight.png"
    },
    [FactionEnum.TheEmpyrean]: {
        name: "The Empyrean",
        src: "the_empyrean.png"
    },
    [FactionEnum.TheMahactGeneSorcerers]: {
        name: "The Mahact Gene-Sorcerers",
        src: "the_mahact_gene-sorcerers.png"
    },
    [FactionEnum.TheNaazRokhaAlliance]: {
        name: "The Naaz-Rokha Alliance",
        src: "the_naaz-rokha_alliance.png"
    },
    [FactionEnum.TheNomad]: {
        name: "The Nomad",
        src: "the_nomad.png"
    },
    [FactionEnum.TheTitansOfUl]: {
        name: "The Titans of Ul",
        src: "the_titans_of_ul.png"
    },
    [FactionEnum.TheVuilRaithCabal]: {
        name: "The Vuil'Raith Cabal",
        src: "the_vuil'raith_cabal.png"
    },
    [FactionEnum.TheCouncilKeleres]: {
        name: "The Council Keleres",
        src: "the_council_keleres.png"
    },
    [FactionEnum.LastBastion]: {
        name: "Last Bastion",
        src: "last_bastion.png"
    },
    [FactionEnum.TheRalNelConsortium]: {
        name: "The Ral-Nel Consortium",
        src: "the_ral-nel_consortium.png"
    },
    [FactionEnum.TheDeepwroughtScholarate]: {
        name: "The Deepwrought Scholarate",
        src: "the_deepwrought_scholarate.png"
    },
    [FactionEnum.TheCrimsonRebellion]: {
        name: "The Crimson Rebellion",
        src: "the_crimson_rebellion.png"
    },
    [FactionEnum.TheFirmament]: {
        name: "The Firmament",
        src: "the_firmament.png"
    },
    [FactionEnum.TheObsidian]: {
        name: "The Obsidian",
        src: "the_obsidian.png"
    },
} as const;