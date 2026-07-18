export class Faction {
    _factionType;
    constructor(faction) {
        this._factionType = faction;
    }
    get factionType() {
        return this._factionType;
    }
    get imageSrc() {
        return factionData[this.factionType].src;
    }
    toString() {
        return factionData[this.factionType].name;
    }
    equals(faction) {
        return this.factionType === faction?.factionType;
    }
}
export var FactionEnum;
(function (FactionEnum) {
    FactionEnum[FactionEnum["TheArborec"] = 0] = "TheArborec";
    FactionEnum[FactionEnum["TheBaronyOfLetnev"] = 1] = "TheBaronyOfLetnev";
    FactionEnum[FactionEnum["TheClanOfSaar"] = 2] = "TheClanOfSaar";
    FactionEnum[FactionEnum["TheEmbersOfMuaat"] = 3] = "TheEmbersOfMuaat";
    FactionEnum[FactionEnum["TheEmiratesOfHacan"] = 4] = "TheEmiratesOfHacan";
    FactionEnum[FactionEnum["TheFederationOfSol"] = 5] = "TheFederationOfSol";
    FactionEnum[FactionEnum["TheGhostsOfCreuss"] = 6] = "TheGhostsOfCreuss";
    FactionEnum[FactionEnum["TheL1Z1XMindnet"] = 7] = "TheL1Z1XMindnet";
    FactionEnum[FactionEnum["TheMentakCoalition"] = 8] = "TheMentakCoalition";
    FactionEnum[FactionEnum["TheNaaluCollective"] = 9] = "TheNaaluCollective";
    FactionEnum[FactionEnum["TheNekroVirus"] = 10] = "TheNekroVirus";
    FactionEnum[FactionEnum["SardakkNorr"] = 11] = "SardakkNorr";
    FactionEnum[FactionEnum["TheUniversitiesOfJolNar"] = 12] = "TheUniversitiesOfJolNar";
    FactionEnum[FactionEnum["TheWinnu"] = 13] = "TheWinnu";
    FactionEnum[FactionEnum["TheXxchaKingdom"] = 14] = "TheXxchaKingdom";
    FactionEnum[FactionEnum["TheYinBrotherhood"] = 15] = "TheYinBrotherhood";
    FactionEnum[FactionEnum["TheYssarilTribes"] = 16] = "TheYssarilTribes";
    FactionEnum[FactionEnum["TheArgentFlight"] = 17] = "TheArgentFlight";
    FactionEnum[FactionEnum["TheEmpyrean"] = 18] = "TheEmpyrean";
    FactionEnum[FactionEnum["TheMahactGeneSorcerers"] = 19] = "TheMahactGeneSorcerers";
    FactionEnum[FactionEnum["TheNaazRokhaAlliance"] = 20] = "TheNaazRokhaAlliance";
    FactionEnum[FactionEnum["TheNomad"] = 21] = "TheNomad";
    FactionEnum[FactionEnum["TheTitansOfUl"] = 22] = "TheTitansOfUl";
    FactionEnum[FactionEnum["TheVuilRaithCabal"] = 23] = "TheVuilRaithCabal";
    FactionEnum[FactionEnum["TheCouncilKeleres"] = 24] = "TheCouncilKeleres";
    FactionEnum[FactionEnum["LastBastion"] = 25] = "LastBastion";
    FactionEnum[FactionEnum["TheRalNelConsortium"] = 26] = "TheRalNelConsortium";
    FactionEnum[FactionEnum["TheDeepwroughtScholarate"] = 27] = "TheDeepwroughtScholarate";
    FactionEnum[FactionEnum["TheCrimsonRebellion"] = 28] = "TheCrimsonRebellion";
    FactionEnum[FactionEnum["TheFirmament"] = 29] = "TheFirmament";
    FactionEnum[FactionEnum["TheObsidian"] = 30] = "TheObsidian";
})(FactionEnum || (FactionEnum = {}));
export const factionData = {
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
};
//# sourceMappingURL=Faction.js.map