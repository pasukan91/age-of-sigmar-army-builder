# Auditoría de armas y habilidades de warscrolls

Fecha: 2026-08-02

Referencia de contraste: catálogo público actualizado BSData para Age of Sigmar 4. La comparación cubre las 487 fichas implementadas en la aplicación.

## Resumen

| Comprobación | Resultado |
| --- | ---: |
| Perfiles de arma emparejados | 853 |
| Diferencias exactas en estadísticas de arma | 169 |
| Nombres de arma probablemente renombrados | 87 |
| Armas sin correspondencia inequívoca | 76 |
| Habilidades emparejadas | 971 |
| Nombres de habilidad probablemente renombrados | 31 |
| Habilidades sin correspondencia inequívoca | 141 |
| Diferencias de timing estructurales | 61 |
| Habilidades que requieren revisión semántica | 119 en 105 unidades |

## Diferencias exactas en perfiles de arma

Estas diferencias son comparaciones campo a campo entre armas con el mismo nombre o un nombre casi idéntico.

### Blades of Khorne

- **Bloodthirster of Unfettered Fury — Lash of Khorne:** Damage: app `3` → referencia `D3`.
- **Realmgore Ritualist — Ritual Athame:** Damage: app `3` → referencia `D3`.
- **Bloodcrushers — Juggernaut's Brazen Hooves:** Damage: app `3` → referencia `D3`.
- **Skull Cannon — Gnashing Maw:** Damage: app `3` → referencia `D3`.
- **Mighty Skullcrushers — Juggernaut's Brazen Hooves:** Damage: app `3` → referencia `D3`.
- **Lord of Khorne on Juggernaut — Juggernaut's Brazen Hooves:** Damage: app `3` → referencia `D3`.
- **Skullmaster, Herald of Khorne — Juggernaut's Brazen Hooves:** Damage: app `3` → referencia `D3`.

### Disciples of Tzeentch

- **The Changeling — The Trickster's Staff:** Rend: app `0` → referencia `1`.
- **Tzaangor Skyfires — Arrow of Fate:** Hit: app `3+` → referencia `4+`.
- **Tzaangor Skyfires — Arrow of Fate:** Damage: app `D3` → referencia `2`.
- **Tzaangor Skyfires — Bow Stave and Vicious Beak:** Rend: app `1` → referencia `-`.
- **Jade Obelisk — Mason's Tools:** Rend: app `0` → referencia `1`.

### Gloomspite Gitz

- **Kragnos, the End of Empires — Tuskbreaker:** Attacks: app `2` → referencia `3`.
- **Kragnos, the End of Empires — Tuskbreaker:** Hit: app `3+` → referencia `4+`.
- **Kragnos, the End of Empires — Hooves of Wrack and Ruin:** Hit: app `4+` → referencia `3+`.
- **Skragrott, the Loonking — Da Moon Onna Stikk:** Wound: app `3+` → referencia `4+`.
- **Fungoid Cave-Shaman — Moon-sickle:** Damage: app `D3` → referencia `2`.
- **Loonboss on Giant Cave Squig — Massive Fang-filled Gob:** Damage: app `2` → referencia `D3`.
- **Loonboss on Mangler Squigs — Moon-cutta:** Attacks: app `4` → referencia `5`.
- **Loonboss on Mangler Squigs — Huge Fang-filled Gobs:** Attacks: app `8` → referencia `4`.
- **Loonboss on Mangler Squigs — Huge Fang-filled Gobs:** Rend: app `2` → referencia `1`.
- **Loonboss on Mangler Squigs — Huge Fang-filled Gobs:** Damage: app `3` → referencia `D6`.
- **Loonboss on Mangler Squigs — Balls and Chains:** Wound: app `2+` → referencia `4+`.
- **Loonboss on Mangler Squigs — Balls and Chains:** Rend: app `1` → referencia `-`.
- **Squigboss with Gnasha-squig — Squig-krook:** Rend: app `1` → referencia `-`.
- **Rabble-Rowza — Bat Squigs:** Damage: app `1` → referencia `D3`.
- **Rabble-Rowza — Moon-sickle and Basha:** Damage: app `2` → referencia `D3`.
- **Trugg, the Troggoth King — Ironshell Club:** Hit: app `4+` → referencia `3+`.
- **Dankhold Troggboss — Boulder Club:** Attacks: app `4` → referencia `5`.
- **Dankhold Troggboss — Boulder Club:** Damage: app `D3+3` → referencia `D6`.
- **Droggz Da Sunchompa — Da Metal Toof:** Wound: app `3+` → referencia `4+`.
- **Droggz Da Sunchompa — Jaggedsnarl's Jaws:** Hit: app `4+` → referencia `3+`.
- **Frazzlegit Shaman on War-Wheela — Wheela Slicers:** Wound: app `3+` → referencia `4+`.
- **Frazzlegit Shaman on War-Wheela — Wheela Slicers:** Rend: app `1` → referencia `-`.
- **Frazzlegit Shaman on War-Wheela — Wheela Slicers:** Damage: app `2` → referencia `1`.
- **Frazzlegit Shaman on War-Wheela — Snarlfangs' Frothing Jaws:** Wound: app `4+` → referencia `3+`.
- **Frazzlegit Shaman on War-Wheela — Snarlfangs' Frothing Jaws:** Damage: app `1` → referencia `2`.
- **Snarlboss — Boss Loppa:** Wound: app `3+` → referencia `4+`.
- **Snarlboss — Snarlfang's Slavering Jaws:** Rend: app `1` → referencia `-`.
- **Snarlboss on War-Wheela — Wheela Slicers:** Wound: app `3+` → referencia `4+`.
- **Snarlboss on War-Wheela — Wheela Slicers:** Rend: app `1` → referencia `-`.
- **Snarlboss on War-Wheela — Snarlfangs' Frothing Jaws:** Wound: app `4+` → referencia `3+`.
- **Webspinner Shaman on Arachnarok Spider — Monstrous Spider Fangs:** Hit: app `4+` → referencia `3+`.
- **Webspinner Shaman on Arachnarok Spider — Monstrous Spider Fangs:** Rend: app `2` → referencia `1`.
- **Gobbapalooza — Staff, Stikka or Jaggedy Blade:** Damage: app `1` → referencia `D3`.
- **Sneaky Snufflers — Snufflesquig's Gnashers:** Attacks: app `1` → referencia `2`.
- **Sneaky Snufflers — Snufflesquig's Gnashers:** Wound: app `3+` → referencia `4+`.
- **Sneaky Snufflers — Loonfungus Sickle:** Attacks: app `2` → referencia `3`.
- **Loonsmasha Fanatics — Ball and Chain:** Wound: app `2+` → referencia `3+`.
- **Sporesplatta Fanatics — Spore-ball and Chain:** Attacks: app `D6` → referencia `D3`.
- **Sporesplatta Fanatics — Spore-ball and Chain:** Hit: app `4+` → referencia `3+`.
- **Sporesplatta Fanatics — Spore-ball and Chain:** Wound: app `3+` → referencia `4+`.
- **Sporesplatta Fanatics — Spore-ball and Chain:** Damage: app `1` → referencia `D3`.
- **Mangler Squigs — Bashin' Stikks:** Wound: app `4+` → referencia `5+`.
- **Mangler Squigs — Bashin' Stikks:** Rend: app `1` → referencia `-`.
- **Mangler Squigs — Huge Fang-filled Gobs:** Attacks: app `8` → referencia `4`.
- **Mangler Squigs — Huge Fang-filled Gobs:** Rend: app `2` → referencia `1`.
- **Mangler Squigs — Huge Fang-filled Gobs:** Damage: app `3` → referencia `D6`.
- **Mangler Squigs — Balls and Chains:** Wound: app `2+` → referencia `4+`.
- **Mangler Squigs — Balls and Chains:** Rend: app `1` → referencia `-`.
- **Dankhold Troggoth — Colossal Boulder Club:** Attacks: app `5` → referencia `4`.
- **Rockgut Troggoths — Throwin' Boulders:** Hit: app `4+` → referencia `5+`.
- **Rockgut Troggoths — Throwin' Boulders:** Damage: app `3` → referencia `D3`.
- **Wolfgit Retinue — Snarlfang's Slavering Jaws:** Rend: app `1` → referencia `-`.
- **Doom Diver Catapult — Doom Diver:** Hit: app `3+` → referencia `4+`.
- **Doom Diver Catapult — Doom Diver:** Damage: app `1` → referencia `3`.
- **Doom Diver Catapult — Catapult Crew Tools:** Hit: app `4+` → referencia `5+`.
- **Doom Diver Catapult — Catapult Crew Tools:** Wound: app `4+` → referencia `6+`.
- **Doom Diver Catapult — Slicers and Krag-smasha's Paws:** Rend: app `1` → referencia `-`.
- **Snarlpack Cavalry — Pointy Skewas:** Attacks: app `3` → referencia `4`.
- **Snarlpack Cavalry — Pointy Skewas:** Rend: app `1` → referencia `-`.
- **Snarlpack Cavalry — Pointy Skewas:** Damage: app `2` → referencia `1`.
- **Snarlpack Cavalry — Giant Snarlfang's Jaws:** Attacks: app `4` → referencia `3`.
- **Snarlpack Cavalry — Giant Snarlfang's Jaws:** Rend: app `1` → referencia `-`.
- **Snarlfang Riders — Snarlfang's Slavering Jaws:** Rend: app `1` → referencia `-`.
- **Spider Riders — Spider Fangs:** Wound: app `3+` → referencia `4+`.
- **Skitterstrand Arachnarok — Monstrous Spider Fangs:** Hit: app `4+` → referencia `3+`.
- **Skitterstrand Arachnarok — Monstrous Spider Fangs:** Rend: app `2` → referencia `1`.
- **Arachnarok Spider with Flinger — Flinger:** Attacks: app `1` → referencia `D3`.
- **Arachnarok Spider with Flinger — Flinger:** Rend: app `1` → referencia `-`.
- **Arachnarok Spider with Flinger — Flinger:** Damage: app `D3` → referencia `1`.
- **Arachnarok Spider with Flinger — Monstrous Spider Fangs:** Hit: app `4+` → referencia `3+`.
- **Arachnarok Spider with Flinger — Monstrous Spider Fangs:** Rend: app `2` → referencia `1`.
- **Arachnarok Spider with Spiderfang Warparty — Crooked Spears:** Attacks: app `8` → referencia `10`.
- **Arachnarok Spider with Spiderfang Warparty — Crooked Spears:** Hit: app `4+` → referencia `5+`.
- **Arachnarok Spider with Spiderfang Warparty — Crooked Spears:** Wound: app `5+` → referencia `4+`.
- **Arachnarok Spider with Spiderfang Warparty — Monstrous Spider Fangs:** Hit: app `4+` → referencia `3+`.
- **Arachnarok Spider with Spiderfang Warparty — Monstrous Spider Fangs:** Rend: app `2` → referencia `1`.

### Helsmiths of Hashut

- **Dominator Engine with Immolation Cannons — Immolation Cannons:** Range: app `5"` → referencia `8"`.
- **Dominator Engine with Immolation Cannons — Immolation Cannons:** Attacks: app `8` → referencia `5`.

### Ironjawz

- **Gordrakk, the Fist of Gork — Bigteef's Roar:** Rend: app `1` → referencia `-`.
- **Gordrakk, the Fist of Gork — Bigteef's Roar:** Damage: app `D3` → referencia `1`.
- **Megaboss on Maw-krusha — Maw-krusha's Roar:** Rend: app `1` → referencia `-`.
- **Megaboss on Maw-krusha — Maw-krusha's Roar:** Damage: app `D3` → referencia `1`.
- **Tuskboss on Maw-grunta — Kill-choppas:** Hit: app `3+` → referencia `4+`.
- **Tuskboss on Maw-grunta — Kill-choppas:** Wound: app `4+` → referencia `3+`.
- **Tuskboss on Maw-grunta — Maw-grunta's Trotters:** Rend: app `1` → referencia `-`.
- **Zoggrok Anvilsmasha — Ward-smashing Choppa:** Attacks: app `3` → referencia `2`.
- **Zoggrok Anvilsmasha — Ward-smashing Choppa:** Hit: app `2+` → referencia `4+`.
- **Zoggrok Anvilsmasha — Ward-smashing Choppa:** Damage: app `2` → referencia `3`.
- **Warchanter — Gorkstikk and Morkstikk:** Rend: app `1` → referencia `-`.
- **Weirdnob Shaman — Green Puke:** Rend: app `1` → referencia `-`.
- **Weirdbrute Wrekkaz — Chain-smasha:** Damage: app `2` → referencia `1`.
- **Gore-gruntas — Grunta's Tusks:** Rend: app `1` → referencia `-`.
- **Maw-grunta with Hakkin' Krew — Maw-grunta's Trotters:** Rend: app `1` → referencia `-`.
- **Maw-grunta Gougers — Maw-grunta's Trotters:** Rend: app `1` → referencia `-`.
- **Kragnos, the End of Empires — Tuskbreaker:** Attacks: app `2` → referencia `3`.
- **Kragnos, the End of Empires — Tuskbreaker:** Hit: app `3+` → referencia `4+`.
- **Kragnos, the End of Empires — Hooves of Wrack and Ruin:** Hit: app `4+` → referencia `3+`.

### Kruleboyz

- **Gobsprakk, the Mouth of Mork — Bogbark Staff:** Rend: app `1` → referencia `-`.
- **Gobsprakk, the Mouth of Mork — Killabeak's Stinger:** Rend: app `2` → referencia `1`.
- **Killaboss on Corpse-rippa Vulcha — Vulcha's Stinger:** Rend: app `2` → referencia `1`.
- **Snatchaboss on Sludgeraker Beast — Sludgeraker's Bite:** Rend: app `2` → referencia `1`.
- **Swampboss Skumdrekk — Snatcha-stikk:** Rend: app `2` → referencia `1`.
- **Swampboss Skumdrekk — Sloppklaw's Bite:** Hit: app `2+` → referencia `4+`.
- **Swampcalla Shaman with Pot-grot — Bogbark Staff:** Rend: app `1` → referencia `-`.
- **Gutrippaz — Stikka or Hacka:** Rend: app `1` → referencia `-`.
- **Hobgrot Slittaz — Scrap-grenades:** Rend: app `0` → referencia `1`.
- **Kruleboyz Monsta-killaz — Monsta-killa Weapons:** Damage: app `2` → referencia `1`.
- **Man-skewer Boltboyz — Man-skewer Crossbow: Hasty Shot:** Hit: app `3+` → referencia `4+`.
- **Man-skewer Boltboyz — Man-skewer Crossbow: Hasty Shot:** Wound: app `4+` → referencia `3+`.
- **Man-skewer Boltboyz — Jaggedy Blades:** Attacks: app `2` → referencia `1`.
- **Kragnos, the End of Empires — Tuskbreaker:** Attacks: app `2` → referencia `3`.
- **Kragnos, the End of Empires — Tuskbreaker:** Hit: app `3+` → referencia `4+`.
- **Kragnos, the End of Empires — Hooves of Wrack and Ruin:** Hit: app `4+` → referencia `3+`.

### Maggotkin of Nurgle

- **Shaman Foulhoof — Rotstave:** Damage: app `3` → referencia `D3`.

### Ogor Mawtribes

- **Tyrant on Glutthorn — Tyrant's Meatcleavers:** Damage: app `2` → referencia `3`.
- **Tyrant on Glutthorn — Glutthorn's Horn and Hooves:** Damage: app `2` → referencia `3`.
- **Gnoblar Scraplauncher — Piles of Old Scrap:** Rend: app `0` → referencia `1`.
- **Hunters with Sabrefangs — Skinning Blades:** Damage: app `2` → referencia `1`.
- **Hunters with Sabrefangs — Sabrefang's Tusks and Claws:** Damage: app `2` → referencia `1`.
- **Kragnos, the End of Empires — Tuskbreaker:** Attacks: app `2` → referencia `3`.
- **Kragnos, the End of Empires — Tuskbreaker:** Hit: app `3+` → referencia `4+`.
- **Kragnos, the End of Empires — Hooves of Wrack and Ruin:** Hit: app `4+` → referencia `3+`.

### Skaven

- **Warlock Engineer — Warpforged Dagger:** Damage: app `1` → referencia `2`.
- **Deathmaster — Eshin Throwing Stars:** Attacks: app `3` → referencia `5`.
- **Plague Priest on Plague Furnace — Great Plague Censer:** Rend: app `2` → referencia `1`.
- **Stormfiends — Clubbing Blows:** Rend: app `1` → referencia `-`.
- **Warp Lightning Cannon — Warp Lightning Blast:** Wound: app `-` → referencia `⟝See Warp Lightning Blast ability⟞`.
- **Warp Lightning Cannon — Warp Lightning Blast:** Rend: app `-` → referencia `⟝See Warp Lightning Blast ability⟞`.
- **Warp Lightning Cannon — Warp Lightning Blast:** Damage: app `1 mortal` → referencia `⟝See Warp Lightning Blast ability⟞`.

### Slaves to Darkness

- **The Oathsworn Kin — Heavy Darkoath Weapon:** Rend: app `2` → referencia `-`.
- **Darkoath Fellriders — Marauder Javelin:** Rend: app `0` → referencia `1`.
- **Chaos Spawn — Freakish Mutations:** Hit: app `4+` → referencia `5+`.
- **Chaos Spawn — Freakish Mutations:** Wound: app `5+` → referencia `4+`.
- **Chaos Furies — Razor-sharp Dagger and Claws:** Rend: app `0` → referencia `1`.
- **Raptoryx — Razor-sharp Beak and Talons:** Attacks: app `4` → referencia `3`.

### Soulblight Gravelords

- **Nagash, Supreme Lord of the Undead — Zefet-nebtar, the Mortis Blade:** Damage: app `D3` → referencia `3`.

### Sylvaneth

- **Spirit of Durthu — Verdant Blast:** Range: app `10"` → referencia `12"`.
- **Spirit of Durthu — Verdant Blast:** Attacks: app `3` → referencia `5`.
- **Spirit of Durthu — Verdant Blast:** Hit: app `3+` → referencia `4+`.
- **Spirit of Durthu — Verdant Blast:** Wound: app `2+` → referencia `3+`.
- **Spirit of Durthu — Guardian Sword:** Damage: app `5` → referencia `4`.
- **Grove Guardian — Grove Sickle or Shears:** Hit: app `4+` → referencia `3+`.
- **Grove Guardian — Grove Sickle or Shears:** Wound: app `3+` → referencia `4+`.
- **Branchwych — Greenwood Scythe and Bittergrub:** Wound: app `3+` → referencia `4+`.
- **Treelord — Strangleroots:** Range: app `12"` → referencia `10"`.
- **Treelord — Strangleroots:** Attacks: app `5` → referencia `3`.
- **Treelord — Strangleroots:** Hit: app `4+` → referencia `3+`.
- **Treelord — Strangleroots:** Wound: app `3+` → referencia `2+`.
- **Treelord — Strangleroots:** Damage: app `1` → referencia `2`.
- **Treelord — Sweeping Blows:** Attacks: app `4` → referencia `5`.
- **Dryads — Wracking Talons:** Attacks: app `3` → referencia `2`.
- **Dryads — Wracking Talons:** Hit: app `4+` → referencia `3+`.
- **Dryads — Wracking Talons:** Wound: app `3+` → referencia `4+`.
- **Dryads — Wracking Talons:** Rend: app `1` → referencia `-`.
- **Spite-Revenants — Cruel Talons and Fangs:** Rend: app `1` → referencia `-`.
- **Kurnoth Hunters with Greatbows — Kurnoth Greatbow:** Damage: app `3` → referencia `2`.
- **Gossamid Archers — Cruel Talons:** Attacks: app `2` → referencia `1`.

## Armas sin correspondencia inequívoca

Estas entradas pueden ser armas añadidas, retiradas, combinadas o renombradas de forma sustancial y deben comprobarse manualmente.

### Blades of Khorne

- **Karanak:** Savage Maws and Goreslick Claws (falta en la app).
- **Bloodsecrator:** Ensorcelled Axe (falta en la app).
- **Bloodstoker:** Torture Blade and Blood Whip (falta en la app).
- **Mighty Skullcrushers:** Gorebathed Glaive or Axe (falta en la app).
- **Karanak:** Murderous Maws and Claws (solo aparece en la app).
- **Bloodsecrator:** Axe of Khorne (solo aparece en la app).
- **Bloodstoker:** Blade and Torture-whip (solo aparece en la app).
- **Mighty Skullcrushers:** Ensorcelled Axe or Bloodglaive (solo aparece en la app).

### Cities of Sigmar

- **Galen and Doralia ven Denst:** Consecrated Blade (falta en la app).
- **Freeguild Command Corps: Adjutants:** Adjutant Weapons (falta en la app).
- **Freeguild Command Corps: Adjutants:** Adjutant Weapons (falta en la app).
- **Freeguild Command Corps: Auxiliaries:** Assortment of Weapons (falta en la app).
- **Freeguild Grenadiers:** Grenadier Bardiche (falta en la app).
- **Freeguild Grenadiers:** Ruin-sweeper Arsenal (falta en la app).
- **Wildercorps Hunters:** Hunting Weapons (falta en la app).
- **Wildercorps Hunters:** Hunting Crossbow (falta en la app).
- **Wildercorps Hunters:** Trailhound's Ferocious Bite (falta en la app).

### Disciples of Tzeentch

- **Lord of Change:** Storm of Wyrdfire (falta en la app).
- **Lord of Change:** Eldritch Weapons (falta en la app).
- **Gaunt Summoner on Disc of Tzeentch:** Changestaff (falta en la app).
- **Exalted Flamer of Tzeentch:** Flaming Maws (falta en la app).
- **Blue Horrors and Brimstone Horrors:** Spiteful Talons (falta en la app).
- **Lord of Change:** Staff of Tzeentch (solo aparece en la app).
- **Lord of Change:** Curved Beak (solo aparece en la app).
- **Blue Horrors and Brimstone Horrors:** Taloned Hands (solo aparece en la app).
- **Jade Obelisk:** Antithete Bow (solo aparece en la app).

### Gloomspite Gitz

- **Fungoid Cave-Shaman:** Spore Squig's Vicious Teeth (falta en la app).
- **Webspinner Shaman on Arachnarok Spider:** Crooked Spears (falta en la app).
- **Wolfgit Retinue:** Snarlfang's Slavering Jaws (falta en la app).
- **Arachnarok Spider with Flinger:** Crooked Spears (falta en la app).

### Hedonites of Slaanesh

- **Thricefold Discord:** Carnal Blades and Wicked Claws (falta en la app).
- **Thricefold Discord:** Carnal Blades and Wicked Claws (falta en la app).
- **Thricefold Discord:** Carnal Blades and Wicked Claws (falta en la app).
- **Thricefold Discord:** Thricefold Arsenal (solo aparece en la app).

### Helsmiths of Hashut

- **Daemonsmith on Infernal Taurus:** Infernal Staff (falta en la app).
- **Anointed Sentinels:** Thrice-cursed Glaive (falta en la app).
- **Infernal Cohort with Hashutite Blades:** Hashutite Blade (falta en la app).
- **Infernal Cohort with Hashutite Spears:** Hashutite Spear (falta en la app).
- **Scourge of Aqshy Daemonsmith on Infernal Taurus:** Infernal Staff (falta en la app).
- **Scourge of Aqshy Anointed Sentinels:** Thrice-cursed Glaive (falta en la app).
- **Daemonsmith on Infernal Taurus:** Daemonsmith's Staff (solo aparece en la app).
- **Anointed Sentinels:** Glaive (solo aparece en la app).
- **Infernal Cohort with Hashutite Blades:** Infernal Blades (solo aparece en la app).
- **Infernal Cohort with Hashutite Spears:** Infernal Spears (solo aparece en la app).
- **Scourge of Aqshy Daemonsmith on Infernal Taurus:** Daemonsmith's Staff (solo aparece en la app).
- **Scourge of Aqshy Anointed Sentinels:** Glaive (solo aparece en la app).

### Ironjawz

- **Maw-grunta with Hakkin' Krew:** Kill-choppas (falta en la app).

### Maggotkin of Nurgle

- **Scourge of Aqshy Sloven Knights:** Entropic Bludgeons (falta en la app).
- **Scourge of Aqshy Sloven Knights:** Foetid Nag's Hooves (falta en la app).
- **Scourge of Aqshy Sloven Knights:** Corroded Cavalry Weapons (solo aparece en la app).

### Ossiarch Bonereapers

- **Liege-Kavalos on War Chariot:** Kavalos Steed's Hooves, Teeth, and Barbed Tails (falta en la app).
- **Kavalos War Chariot:** Kavalos Steed's Hooves, Teeth, and Barbed Tails (falta en la app).
- **Liege-Kavalos on War Chariot:** Chariot Steeds' Fangs and Claws (solo aparece en la app).
- **Kavalos War Chariot:** Chariot Steeds' Fangs and Claws (solo aparece en la app).

### Skaven

- **Stormfiends:** Clubbing Blows (falta en la app).
- **Stormfiends:** Clubbing Blows (falta en la app).

### Slaves to Darkness

- **Centaurion Marshal:** Mauling Spear, Skull Bludgeon and Varanspire Gladius (falta en la app).
- **The Oathsworn Kin:** Heavy Darkoath Weapon (falta en la app).
- **Centaurion Marshal:** Centaurion Weapons (solo aparece en la app).

### Soulblight Gravelords

- **Ivya Volga, The Outcast:** Heirloom Axe (falta en la app).
- **Ivya Volga, The Outcast:** Bat Swarm's Needling Fangs (falta en la app).
- **Belladamma Volga, First of the Vyrkos:** Lupine Fangs and Claws (falta en la app).
- **Wight King on Skeletal Steed:** King's Relic Weapon (falta en la app).
- **Askurgan Trueblades:** Elongated Claws and Slavering Maw (falta en la app).
- **Askurgan Trueblades:** Askurgan Weapons (falta en la app).
- **Revenant Draconith:** Draconic Maw (falta en la app).
- **Scourge of Aqshy Revenant Draconith:** Draconic Maw (falta en la app).
- **Ivya Volga, The Outcast:** Needle-fanged Bats (solo aparece en la app).
- **Ivya Volga, The Outcast:** Behemoth's Bane (solo aparece en la app).
- **Belladamma Volga, First of the Vyrkos:** Dire Wolf Fangs (solo aparece en la app).
- **Wight King on Skeletal Steed:** Baleful Tomb Weapon (solo aparece en la app).
- **Askurgan Trueblades:** Curseblood Claws and Fangs (solo aparece en la app).
- **Revenant Draconith:** Colossal Maw (solo aparece en la app).
- **Scourge of Aqshy Revenant Draconith:** Colossal Maw (solo aparece en la app).

### Sylvaneth

- **The Twistweald:** Twistroot Weapons (falta en la app).
- **The Twistweald:** Twistroot Weapons (falta en la app).

## Posibles renombrados de armas

### Blades of Khorne

- **Wrath of Khorne Bloodthirster:** Mighty Axe and Bloodflail → Mighty Axe of Khorne and Bloodflail (similitud 0.96).
- **Mighty Lord of Khorne:** Flesh Hound's Claws → Flesh Hound's Blood-dark Claws (similitud 0.84).
- **Realmgore Ritualist:** Ritual Dagger → Ritual Athame (similitud 0.7).
- **Slaughterpriest:** Bloodbathed Axe → Bloodbathed Weapon (similitud 0.906).
- **Bloodletters:** Hellblades → Hellblade (similitud 1.1).
- **Bloodcrushers:** Brass Hooves → Juggernaut's Brazen Hooves (similitud 0.591).
- **Bloodcrushers:** Hellblades → Bloodcrusher Hellblade (similitud 0.581).
- **Blood Warriors:** Goreaxes and Gorefists → Goreweapons (similitud 0.612).
- **Bloodreavers:** Reaver Blades → Reaver Blades and Axes (similitud 0.95).
- **Skarr Bloodwrath:** Bloodstorm Blades → The Bloodstorm Blades (similitud 1.2).
- **Scourge of Aqshy Bloodletters:** Hellblades → Hellblade (similitud 1.1).
- **Scourge of Aqshy Blood Warriors:** Goreaxes and Gorefists → Goreweapons (similitud 0.612).

### Cities of Sigmar

- **Toll's Companions:** Exotic Weapons → Exotic Assortment of Weapons (similitud 0.765).

### Disciples of Tzeentch

- **Pink Horrors:** Magical Flames → Arcane Flames (similitud 0.815).
- **Blue Horrors and Brimstone Horrors:** Magical Flames → Arcane Flames (similitud 0.815).
- **Tzaangors:** Savage Blades and Vicious Beak → Savage Blade and Vicious Beak (similitud 1.157).
- **Kairic Acolytes:** Kairic Blades → Cursed Blade (similitud 0.617).

### Gloomspite Gitz

- **Fungoid Cave-Shaman:** Loonfungus Sickle → Moon-sickle (similitud 0.762).
- **Dankhold Troggboss:** Colossal Boulder Club → Boulder Club (similitud 0.779).
- **Sneaky Snufflers:** Moon-sickle → Loonfungus Sickle (similitud 0.762).
- **Dankhold Troggoth:** Boulder Club → Colossal Boulder Club (similitud 0.779).

### Hedonites of Slaanesh

- **Fiends:** Pincers and Tail Stinger → Pincers and Barbed Stinger (similitud 0.95).

### Helsmiths of Hashut

- **Urak Taar, the First Daemonsmith:** Ghorrakos' Horns and Hooves → Ghorrakos's Horns and Hooves (similitud 1.152).
- **Urak Taar, the First Daemonsmith:** Dumakaz → Dumakar (similitud 1.057).
- **Ashen Elder:** Black Hammer → Black Hammer of Hashut (similitud 0.847).
- **Dominator Engine with Immolation Cannons:** Horns and Pummelling Blows → Horns and Pummelling Strikes (similitud 0.927).
- **Deathshrieker Rocket Battery:** Artillerists' Tools → Artillerist Weapons (similitud 0.922).
- **Deathshrieker Rocket Battery:** Deathshrieker Rockets → Hashu-Zharr Rockets (similitud 0.75).
- **Tormentor Bombard:** Artillerists' Tools → Artillerist Weapons (similitud 0.922).
- **Tormentor Bombard:** Tormentor Torrent → Torrent of Ruinous Energy (similitud 0.65).
- **Infernal Razers with Blunderbusses:** Weapon Butts → Weapon Butt (similitud 1.109).
- **Infernal Razers with Blunderbusses:** Blunderbusses → Grizmalok Blunderbusses (similitud 0.791).
- **Infernal Razers with Flamehurlers:** Weapon Butts → Weapon Butt (similitud 1.109).
- **Infernal Razers with Flamehurlers:** Flamehurlers → Karagthrun Flamehurlers (similitud 0.745).

### Lumineth Realm-lords

- **Vanari Auralan Sentinels:** Sentinel Blade → Sentinel Blades (similitud 1.129).
- **Vanari Auralan Wardens:** Warden Pike and Blade → Warden Pikes and Blades (similitud 1.082).
- **Vanari Dawnriders:** Stallion's Hooves → Stallions' Hooves (similitud 1.2).
- **Vanari Dawnriders:** Dawnrider Lance and Blade → Dawnrider Lances and Blades (similitud 1.105).

### Maggotkin of Nurgle

- **Festus the Leechlord:** Gathoblyt's Maw → Gathoblyt's Fanged Maw (similitud 0.884).
- **Horticulous Slimux:** Mulch's Jaws → Slime-encrusted Jaws (similitud 0.589).
- **Orghotts Daemonspew:** Rotaxes → The Rotaxes (similitud 1.2).
- **Beast of Nurgle:** Filthy Claws and Maw → Filthy Claws and Slobbering Maw (similitud 0.783).
- **Scourge of Aqshy Putrid Blightkings:** Blighted Weapons → Pox-blighted Weapons (similitud 1.033).

### Ogor Mawtribes

- **Gorger Mawpack:** Clubs, Claws and Jaws → Club, Claws and Jaws (similitud 1.129).
- **Scourge of Aqshy Huskard on Thundertusk:** Huskard's Punches and Kicks → Punches and Kicks (similitud 0.8).

### Ossiarch Bonereapers

- **Kavalos Deathriders:** Kavalos Steeds' Hooves and Teeth → Kavalos Steed's Hooves and Teeth (similitud 1.2).
- **Mortis Reapers:** Reaper's Blades → Reaper' Blades (similitud 1.123).
- **Scourge of Aqshy Mortis Reapers:** Reaper's Blades → Reaper' Blades (similitud 1.123).

### Skaven

- **Acolyte Globadiers:** Poisoned Wind Globes → Poisoned Wind Globe (similitud 1.144).
- **Ratling Guns:** Ratling Guns → Ratling Gun (similitud 1.109).
- **Warpfire Throwers:** Warpfire Throwers → Warpfire Thrower (similitud 1.137).
- **Warplock Jezzails:** Warplock Jezzails → Warplock Jezzail (similitud 1.137).
- **Warpvolt Scourgers:** Warpvolt Scourgers → Warpvolt Scourger (similitud 1.141).
- **Clanrats:** Rusty Weapons → Rusty Weapon (similitud 1.117).

### Slaves to Darkness

- **Eternus, Blade of the First Prince:** Deathglaive and Skull Flail → Death Glaive and Skull Flail (similitud 1.2).

### Soulblight Gravelords

- **Prince Vhordrai:** Bloodlance → The Bloodlance (similitud 1.2).
- **Prince Vhordrai:** Shordemaire Miasma → Shordemaire's Miasma (similitud 1.144).
- **Prince Vhordrai:** Shordemaire's Claws → Shordmaire's Claws (similitud 1.141).
- **Prince Vhordrai:** Shordemaire's Maw → Shordmaire's Maw (similitud 1.133).
- **Lauka Vai, Mother of Nightmares:** Impaling Talons → Gore-drenched Talons (similitud 0.589).
- **The Blades of the Hollow King:** Ossified Greatsword → Ezechiarian Greatsword (similitud 0.771).
- **The Blades of the Hollow King:** Twin Blades → Sissendra's Twin Blades (similitud 0.7).
- **The Blades of the Hollow King:** Vampiric Fangs → Kennistrix's Fangs (similitud 0.7).
- **Sekhar, Fang of Nulahmia:** Nulahmian Glaive → Nulahmian Warglaive (similitud 1.033).
- **Sekhar, Fang of Nulahmia:** Ouboroth's Fangs → Ouboroth's Godhusk Fangs (similitud 0.867).
- **Radukar the Beast:** Blood-born Blades → Vyrkos Blood-born's Piercing Blades (similitud 0.7).
- **Radukar the Beast:** Vyrkos Claws → Blood-slick Claws (similitud 0.6).
- **Radukar the Wolf:** Vyrkos Blade → Vyrkos Barrow-blade (similitud 0.847).
- **Lady Annika, The Thirsting Blade:** The Blade Proboscian → Blade Proboscian (similitud 1.2).
- **Vampire Lord on Nightmare Steed:** Dynastic War-relic → Dynastic Cavalier Weapon (similitud 0.7).
- **Coven Throne:** Spectral Host → Spectral Host's Blades (similitud 0.832).
- **Coven Throne:** Handmaidens' Poniards → Acolytes' Poniards (similitud 0.779).
- **Coven Throne:** Predatory Stiletto → Matriarch's Stiletto (similitud 0.7).
- **Mortis Engine:** Spectral Host → Spectral Host's Blades (similitud 0.832).
- **Wight Lord on Skeletal Steed:** Baleful Tomb Blade → Lord's Tomb Blade (similitud 0.825).
- **Barrow Guard:** Barrow Blade → Wight Blade (similitud 0.655).
- **Revenant Draconith:** Tearing Claws → Draconic Claws (similitud 0.738).
- **Scourge of Aqshy Revenant Draconith:** Tearing Claws → Draconic Claws (similitud 0.738).

### Sylvaneth

- **Belthanos, First Thorn of Kurnoth:** Kurnoth's Glaive → Kurnoth Glaive (similitud 1.129).
- **Belthanos, First Thorn of Kurnoth:** Greatspite's Mandibles → Carnelian Greatspite's Mandibles (similitud 0.89).
- **Arch-Revenant:** Arch-Revenant's Glaive → Revenant's Glaive and Tail Pincers (similitud 0.623).
- **Branchwych:** Greenwood Scythe → Greenwood Scythe and Bittergrub (similitud 0.8).
- **Tree-Revenants:** Enchanted Blade → Revenant Blade (similitud 0.771).
- **Kurnoth Hunters with Greatscythes:** Kurnoth Greatscythe → Kurnoth Scythe (similitud 0.922).
- **Spiterider Lancers:** Spite's Mandibles → Dragonspite's Mandibles (similitud 0.914).
- **Revenant Seekers:** Seeker Sickle → Seeker's Sickle (similitud 1.123).
- **Revenant Seekers:** Spite's Mandibles → Dragonspite's Mandibles (similitud 0.914).

## Habilidades sin correspondencia inequívoca

Son posibles habilidades añadidas, retiradas o renombradas. No se consideran automáticamente errores hasta verificar el warscroll oficial.

### Blades of Khorne

- **Skarbrand:** Skarbrand's Rage (falta en la app).
- **Wrath of Khorne Bloodthirster:** Vengeance of Khorne (falta en la app).
- **Skull Cannon:** Gruesome Bombardment (falta en la app).
- **Skull Cannon:** Grind Their Bones, Seize Their Skulls (falta en la app).
- **Khorgorath:** Feast Upon Their Bones (falta en la app).
- **Skarbrand:** Rage Embodied (solo aparece en la app).
- **Wrath of Khorne Bloodthirster:** Vengeance Unleashed (solo aparece en la app).
- **Skull Cannon:** Grind Their Bones (solo aparece en la app).
- **Skull Cannon:** Gruesome Ammunition (solo aparece en la app).
- **Flesh Hounds:** Beast (solo aparece en la app).
- **Khorgorath:** Feast on the Bones (solo aparece en la app).

### Daughters of Khaine

- **The Shadow Queen:** Coils of the Shadow (falta en la app).
- **Blood Stalkers:** Heartseekers (falta en la app).
- **The Shadow Queen:** Coils of the Shadow Queen (solo aparece en la app).
- **Blood Stalkers:** Barbed Arrows (solo aparece en la app).

### Disciples of Tzeentch

- **Gaunt Summoner on Disc of Tzeentch:** Minions of the Silver Tower (falta en la app).
- **Gaunt Summoner on Disc of Tzeentch:** Book of Profane Secrets (falta en la app).
- **Gaunt Summoner:** Minions of the Silver Tower (falta en la app).
- **Gaunt Summoner:** Book of Profane Secrets (falta en la app).
- **Gaunt Summoner:** Divert Realmgate (falta en la app).
- **Fatemaster:** Bound Retinue (falta en la app).
- **Gaunt Summoner on Disc of Tzeentch:** Masters of the Silver Towers (solo aparece en la app).
- **Gaunt Summoner on Disc of Tzeentch:** All Belongs to Tzeentch (solo aparece en la app).
- **Gaunt Summoner:** Masters of the Silver Towers (solo aparece en la app).
- **Gaunt Summoner:** All Belongs to Tzeentch (solo aparece en la app).
- **Gaunt Summoner:** Leaden Limbs (solo aparece en la app).
- **Fatemaster:** Bound Return (solo aparece en la app).
- **Screamers of Tzeentch:** Beast (solo aparece en la app).
- **Chaos Spawn of Tzeentch:** Beast (solo aparece en la app).
- **Scourge of Aqshy Screamers of Tzeentch:** Beast (solo aparece en la app).

### Gloomspite Gitz

- **Loonboss on Mangler Squigs:** Watch Out! (falta en la app).
- **Rabble-Rowza:** 'Neh Neh Na-neh Neh! Can't Catch Me!" (falta en la app).
- **Trugg, the Troggoth King:** Battle Damaged (falta en la app).
- **Dankhold Troggboss:** Magical Resistance (falta en la app).
- **Webspinner Shaman:** Web Slingshot (falta en la app).
- **Webspinner Shaman on Arachnarok Spider:** Battle Damaged (falta en la app).
- **Skitterstrand Arachnarok:** Battle Damaged (falta en la app).
- **Arachnarok Spider with Spiderfang Warparty:** Battle Damaged (falta en la app).
- **Rabble-Rowza:** Can't Catch Me! (solo aparece en la app).
- **Webspinner Shaman on Arachnarok Spider:** Wall Crawler (solo aparece en la app).
- **Spider Riders:** Wall Crawler (solo aparece en la app).
- **Arachnarok Spider with Flinger:** Wall Crawler (solo aparece en la app).
- **Arachnarok Spider with Spiderfang Warparty:** Wall Crawler (solo aparece en la app).

### Hedonites of Slaanesh

- **Dexcessa, the Talon of Slaanesh:** Scion of Slaanesh (falta en la app).
- **Myrmidesh Painbringers:** Paragons of Battle (falta en la app).
- **Dexcessa, the Talon of Slaanesh:** You! Amuse Us! (solo aparece en la app).
- **Myrmidesh Painbringers:** Dance of the Wailing Blade (solo aparece en la app).
- **Fiends:** Beast (solo aparece en la app).

### Maggotkin of Nurgle

- **Festus the Leechlord:** Vile Poisons and Debilitating Toxins (falta en la app).
- **Spoilpox Scrivener, Herald of Nurgle:** Keep Counting, I'm Watching You (falta en la app).
- **The Glottkin:** Overgrowth of Flesh (falta en la app).
- **Festus the Leechlord:** Vile Poisons (solo aparece en la app).
- **Spoilpox Scrivener, Herald of Nurgle:** Keep Counting (solo aparece en la app).
- **The Glottkin:** Overgrowth (solo aparece en la app).
- **Beast of Nurgle:** Beast (solo aparece en la app).
- **Nurglings:** Beast (solo aparece en la app).

### Ogor Mawtribes

- **Morga the Mighty:** The Right Motivation (falta en la app).
- **Tyrant on Glutthorn:** Pitiless Warlord (falta en la app).
- **Tyrant:** Brawlerguts (falta en la app).
- **Ironguts:** Personal Enforcers (falta en la app).
- **Ironguts:** Displays of Might (falta en la app).
- **Ironblaster:** Obliterating Blast (falta en la app).
- **Mantrapper:** Mantrapper's Accomplices (falta en la app).
- **Stonehorn Beastriders:** Battle Damaged (falta en la app).
- **Redd the Maw:** From the Depths of the Cauldron (falta en la app).
- **Butcher:** Trogg-Guts (falta en la app).
- **Gorger Mawpack:** Troglodytic Lurkers (falta en la app).
- **Gorger Mawpack:** Frenzied Hunters (falta en la app).
- **Morga the Mighty:** Violent Encouragement (solo aparece en la app).
- **Tyrant on Glutthorn:** Gathering Momentum (solo aparece en la app).
- **Tyrant:** Bully of the First Degree (solo aparece en la app).
- **Tyrant:** Command the Avalanche (solo aparece en la app).
- **Ironguts:** Down to the Ironguts (solo aparece en la app).
- **Ironguts:** Violent Reminder (solo aparece en la app).
- **Ironblaster:** Explosive Shells (solo aparece en la app).
- **Mantrapper:** Unlikely Entourage (solo aparece en la app).
- **Redd the Maw:** High Slaughtermaster (solo aparece en la app).
- **Butcher:** Arcane Appetite (solo aparece en la app).
- **Gorger Mawpack:** Lurking on the Fringes (solo aparece en la app).
- **Gorger Mawpack:** Driven by Hunger (solo aparece en la app).

### Ossiarch Bonereapers

- **Katakros, Mortarch of the Necropolis:** Battle Damaged (falta en la app).
- **Mortisan Soulreaper:** Necrotic Impetus (falta en la app).
- **Katakros, Mortarch of the Necropolis:** Fractured Command (solo aparece en la app).
- **Mortisan Soulreaper:** Necrotic Blast (solo aparece en la app).
- **Teratic Cohort:** Beast (solo aparece en la app).

### Skaven

- **Warp Lightning Cannon:** Warp Lightning Blast (falta en la app).
- **Acolyte Globadiers:** Hidden Weapon Team (solo aparece en la app).
- **Ratling Guns:** Hidden Weapon Team (solo aparece en la app).
- **Warpfire Throwers:** Hidden Weapon Team (solo aparece en la app).
- **Warpvolt Scourgers:** Hidden Weapon Team (solo aparece en la app).
- **Brood Terror:** Lend a Claw (solo aparece en la app).

### Slaves to Darkness

- **Gaunt Summoner:** Divert Realmgate (falta en la app).
- **Gaunt Summoner on Disc of Tzeentch:** Arcane Imprisonment (falta en la app).
- **Gaunt Summoner:** Arcane Imprisonment (solo aparece en la app).
- **Gaunt Summoner on Disc of Tzeentch:** Divert Realmgate (solo aparece en la app).
- **Daemon Prince:** Mark of Chaos (solo aparece en la app).
- **Darkoath Wilderfiend:** Beast (solo aparece en la app).
- **Chaos Spawn:** Beast (solo aparece en la app).
- **Raptoryx:** Beast (solo aparece en la app).

### Soulblight Gravelords

- **Mannfred von Carstein, Mortarch of Night:** Ashigaroth's Hunger (falta en la app).
- **The Blades of the Hollow King:** Solia, the Tutor (falta en la app).
- **Sekhar, Fang of Nulahmia:** Serpentine Agility (falta en la app).
- **Lady Annika, The Thirsting Blade:** Starving Nightmare (falta en la app).
- **Lady Annika, The Thirsting Blade:** Kiss of the Blade Proboscian (falta en la app).
- **Lady Annika, The Thirsting Blade:** Supernatural Speed (falta en la app).
- **Kritza, The Rat Prince:** The Verminous Court (falta en la app).
- **Vampire Lord on Nightmare Steed:** Strike at the Heart (falta en la app).
- **Vampire Lord on Nightmare Steed:** 'For Glory! For Blood!' (falta en la app).
- **Mortis Engine:** Wave of Power (falta en la app).
- **Wight King:** Ancient Strategies (falta en la app).
- **Wight Lord on Skeletal Steed:** Royal Companions (falta en la app).
- **Askurgan Trueblades:** Gut-wrenching Howl (falta en la app).
- **Barrow Guard:** Guardians of the King (falta en la app).
- **Barrow Knights:** Knights of the King (falta en la app).
- **Revenant Draconith:** Loathsome Descent (falta en la app).
- **Vargheists:** Death's Descent (falta en la app).
- **Mannfred von Carstein, Mortarch of Night:** The Hunger of Ashigaroth (solo aparece en la app).
- **The Blades of the Hollow King:** Solia (solo aparece en la app).
- **Sekhar, Fang of Nulahmia:** The Serpentine Curse (solo aparece en la app).
- **Lady Annika, The Thirsting Blade:** Lying in Wait (solo aparece en la app).
- **Lady Annika, The Thirsting Blade:** Ambush from the Shadows (solo aparece en la app).
- **Lady Annika, The Thirsting Blade:** The Thirsting Blade (solo aparece en la app).
- **Kritza, The Rat Prince:** A Prince Among Thieves (solo aparece en la app).
- **Vampire Lord on Nightmare Steed:** The Knights of Night (solo aparece en la app).
- **Vampire Lord on Nightmare Steed:** Blood Knights Commander (solo aparece en la app).
- **Mortis Engine:** Wail of the Damned (solo aparece en la app).
- **Wight King:** Royal Companions (solo aparece en la app).
- **Wight Lord on Skeletal Steed:** Mounted Retinue (solo aparece en la app).
- **Askurgan Trueblades:** Howling Onslaught (solo aparece en la app).
- **Barrow Guard:** Guardians of the Barrow Kings (solo aparece en la app).
- **Barrow Knights:** Guardians of the Barrow Kings (solo aparece en la app).
- **Dire Wolves:** Beast (solo aparece en la app).
- **Fell Bats:** Beast (solo aparece en la app).
- **Revenant Draconith:** Descend on Tattered Wings (solo aparece en la app).
- **Vargheists:** The Blood-mad Hunt (solo aparece en la app).

### Sylvaneth

- **Belthanos, First Thorn of Kurnoth:** Kurnothi War-horn (falta en la app).
- **Warsong Revenant:** Wyldwood Revenants (falta en la app).
- **Tree-Revenants:** Waypiper's Dance (falta en la app).
- **Belthanos, First Thorn of Kurnoth:** War-horn of the Wild Hunt (solo aparece en la app).
- **Warsong Revenant:** Rousing Accompaniment (solo aparece en la app).
- **Tree-Revenants:** Warriors of the Woods (solo aparece en la app).

## Posibles renombrados de habilidades

### Blades of Khorne

- **Skulltaker:** Eternal Duel → The Eternal Duel (similitud 1).
- **Bloodmaster, Herald of Khorne:** Blood Must Flow → The Blood Must Flow (similitud 1).
- **Karanak:** The First Pack → First of the Pack (similitud 1).
- **Mighty Lord of Khorne:** Bring Me Their Skulls! → 'Bring Me Their Skull!' (similitud 0.944).
- **Skullgrinder:** Tempered Fury → Tempered by Fury (similitud 0.857).
- **Claws of Karanak:** Scent of Blood → The Scent of Blood (similitud 1).
- **Khorgorath:** Horrific Predator → Horrific Predators (similitud 0.941).
- **Skullmaster, Herald of Khorne:** Herald of the Trampling Horde → Herald of Trampling Death (similitud 0.75).
- **Skarr Bloodwrath:** Slaughterborn → The Slaughterborn (similitud 1).
- **Scourge of Aqshy Bloodletters:** Drawn to the Slaughter → Drawn to Slaughter (similitud 1).

### Cities of Sigmar

- **Callis and Toll:** The Right Tools for the Job → Right Tools for the Job (similitud 1).

### Daughters of Khaine

- **Hag Queen:** Catechism of Violence → Catechisms of Violence (similitud 0.944).

### Gloomspite Gitz

- **Skitterstrand Arachnarok:** Realmaweb Lurker → Realmweb Lurker (similitud 0.933).

### Hedonites of Slaanesh

- **Shalaxi Helbane:** Refined Senses → Refine Senses (similitud 0.923).
- **Slaangor Fiendbloods:** Bestial Onslaught → Bestial Onslaughted (similitud 0.889).

### Helsmiths of Hashut

- **Urak Taar, the First Daemonsmith:** Curse of Stone → The Curse of Stone (similitud 1).

### Maggotkin of Nurgle

- **Festus the Leechlord:** Leechlord's Curse → The Leechlord's Curse (similitud 1).
- **Poxbringer, Herald of Nurgle:** Captain of Plague Legions → Captain of the Plague Legions (similitud 1).

### Ogor Mawtribes

- **Gnoblar Scraplauncher:** Rain of Crap → Rain of Scrap (similitud 0.889).

### Ossiarch Bonereapers

- **Mortis Reapers:** Necroaches → Necrocaches (similitud 0.909).

### Soulblight Gravelords

- **Prince Vhordrai:** The Saint of Slaughter → Saint of Slaughter (similitud 1).
- **Neferata, Mortarch of Blood:** Mortarch of Blood → The Mortarch of Blood (similitud 1).
- **Mannfred von Carstein, Mortarch of Night:** Mortarch of Night → The Mortarch of Night (similitud 1).
- **Sekhar, Fang of Nulahmia:** Time-swallowing Maw → The Time-swallower's Maw (similitud 0.824).
- **Radukar the Beast:** The Call to the Hunt → Call to the Hunt (similitud 1).
- **Radukar the Beast:** Armour of Night → Armour of the Night (similitud 1).
- **Radukar the Wolf:** The Call to the Hunt → Call to the Hunt (similitud 1).
- **Belladamma Volga, First of the Vyrkos:** The Wolfguard → Wolfguard (similitud 1).
- **Wight King on Skeletal Steed:** The Ancient Barrow Curse → Ancient Barrow Curse (similitud 1).
- **Revenant Draconith:** The Red Ruin → Red Ruin (similitud 1).

### Sylvaneth

- **The Lady of Vines:** Hand of the Everqueen → Hands Of The Everqueen (similitud 0.929).

## Diferencias de timing

### Blades of Khorne

- **Bloodmaster, Herald of Khorne — The Blood Must Flow:** app `Reaction, Any Combat Phase` → referencia `Reaction: You declared a Fight ability for this unit`.

### Cities of Sigmar

- **Galen and Doralia ven Denst — Weapons of Banishment:** app `Once Per Turn (Army), Your Hero Phase` → referencia `Your Hero Phase`.
- **Callis and Toll — Relentless Hunters:** app `Once Per Battle, Start of Battle Round` → referencia `Start of Battle Round`.
- **Toll's Companions — Hidden Agents:** app `Once Per Battle, Deployment Phase` → referencia `Deployment Phase`.
- **Toll's Companions — Emerge from the Shadows:** app `Once Per Battle, Your Movement Phase` → referencia `Your Movement Phase`.

### Daughters of Khaine

- **Hag Queen on Cauldron of Blood — Wrathful Repulsion:** app `Once Per Turn (Army), Any Combat Phase` → referencia `Any Charge Phase`.
- **Hag Queen on Cauldron of Blood — Roaring Idol:** app `Once Per Turn (Army), Your Hero Phase` → referencia `Your Hero Phase`.
- **Melusai Ironscale — Ironscale's Fury:** app `Passive` → referencia `Once Per Turn (Army), Any Combat Phase`.

### Gloomspite Gitz

- **Snarlpack Cavalry — Frazzleburned Scrap:** app `Passive` → referencia `Once Per Turn (Army), Any Combat Phase`.

### Hedonites of Slaanesh

- **Shalaxi Helbane — Paramount Hunter:** app `Once Per Turn, Reaction: Opponent declared a Charge ability for a Hero within 12" of this unit` → referencia `Once Per Turn (Army), Reaction: Opponent declared a **^^Charge^^** ability for a **^^Hero^^** within 12" of this unit`.
- **Keeper of Secrets — Dark Temptations:** app `Once Per Turn, Any Combat Phase` → referencia `Once Per Turn (Army), Any Combat Phase`.
- **Dexcessa, the Talon of Slaanesh — Redolence of Violence:** app `Once Per Turn, End of Any Turn` → referencia `Once Per Turn (Army), End of Any Turn`.
- **Synessa, the Voice of Slaanesh — Enthralling Splendour:** app `Once Per Turn, Any Combat Phase` → referencia `Once Per Turn (Army), Any Combat Phase`.
- **Thricefold Discord — Thricefold Court:** app `Once Per Turn, Start of Any Turn` → referencia `Once Per Turn (Army), Start of Any Turn`.
- **Infernal Enrapturess, Herald of Slaanesh — Maestros Of Discordance:** app `Once Per Turn, Your Hero Phase` → referencia `Once Per Turn (Army), Your Hero Phase`.
- **Contorted Epitome — The Mirror's Depths:** app `Once Per Turn, Enemy Hero Phase` → referencia `Once Per Turn (Army), Enemy Hero Phase`.
- **Contorted Epitome — Swallow Energy:** app `Once Per Turn, End of Any Turn` → referencia `Once Per Turn (Army), End of Any Turn`.
- **Lord of Hysteria — Master Of The Revels:** app `Once Per Turn, Your Hero Phase` → referencia `Once Per Turn (Army), Your Hero Phase`.
- **Slaangor Fiendbloods — Instinctive Advance:** app `Once Per Turn, Reaction: Opponent declared a command for a unit within 12" of this unit` → referencia `Once Per Turn (Army), Reaction: Opponent declared a command for a unit within 12" of this unit`.
- **Symbaresh Twinsouls — Ego-driven Excess:** app `Once Per Battle, Any Combat Phase` → referencia `Once Per Battle (Army), Any Combat Phase`.
- **Slickblade Seekers — Unrivalled Velocity:** app `Once Per Turn, Reaction: You declared a Charge ability for this unit` → referencia `Once Per Turn (Army), Reaction: You declared a **^^Charge^^** ability for this unit`.
- **Blissbarb Archers — The Thrill Of Combat:** app `Once Per Turn, Your Shooting Phase` → referencia `Once Per Turn (Army), Your Shooting Phase`.
- **Lord of Pain — Atrocious Ministrations:** app `Once Per Turn (Army), Your Hero Phase` → referencia `Your Hero Phase`.

### Helsmiths of Hashut

- **War Despot — 'Fight, You Scum!':** app `Reaction, Any Combat Phase` → referencia `Reaction: You declared a **^^Fight^^** ability for this unit`.
- **Anointed Sentinels — Zealous Counter-Attack:** app `Reaction, Enemy Charge Phase` → referencia `Reaction: You declared the 'Counter-charge' command for this unit`.
- **Deathshrieker Rocket Battery — Watch Them Burn:** app `Reaction, Your Shooting Phase` → referencia `Reaction: You declared a **^^Shoot^^** ability for this unit and all of its attacks targeted the same enemy unit`.
- **Infernal Cohort with Hashutite Blades — Sacred Gongs:** app `Reaction, Any Hero Phase` → referencia `Pasiva`.
- **Infernal Cohort with Hashutite Spears — Sacred Gongs:** app `Reaction, Any Hero Phase` → referencia `Pasiva`.

### Kruleboyz

- **Scourge of Aqshy Killaboss with Stab-grot — Jump 'Em, Ladz, Or Else!:** app `Reaction, Reaction: You declared a Fight ability` → referencia `Once Per Turn (Army), Reaction: You declared a **^^Fight^^** ability for this unit`.

### Maggotkin of Nurgle

- **Bloab Rotspawned — Daemon Flies:** app `Rampage, Any Combat Phase` → referencia `Once Per Turn (Army), Any Combat Phase`.
- **Great Unclean One — Locus of Nurgle:** app `Your Movement Phase` → referencia `Once Per Turn (Army), Your Movement Phase`.
- **Great Unclean One — Bloated With Corruption:** app `Rampage, End of Any Turn` → referencia `Once Per Turn (Army), End of Any Turn`.
- **Lord of Blights — Thrice-ripened Death's Heads:** app `Once Per Turn (Army), Any Combat Phase` → referencia `Any Combat Phase`.
- **Orghotts Daemonspew — Grasping Tongue:** app `Rampage, Any Combat Phase` → referencia `Once Per Turn (Army), Any Combat Phase`.
- **Rotigus — Mountain of Loathsome Flesh:** app `Rampage, Any Charge Phase` → referencia `Once Per Turn (Army), Any Charge Phase`.
- **Sloppity Bilepiper, Herald of Nurgle — Jolly Gutpipes:** app `Your Hero Phase` → referencia `Once Per Turn (Army), Your Hero Phase`.
- **Spoilpox Scrivener, Herald of Nurgle — Stupefying Sneezes:** app `Any Shooting Phase` → referencia `Once Per Turn (Army), Any Shooting Phase`.
- **The Glottkin — Blighted Stampede:** app `Reaction: You declared the Counter-charge command` → referencia `Once Per Turn (Army), Reaction: You declared the 'Counter-charge' command for this unit`.
- **Beast of Nurgle — Attention Seekers:** app `Any Charge Phase` → referencia `Once Per Turn (Army), Any Charge Phase`.
- **Nurglings — Endless Swarm:** app `End of Any Turn` → referencia `Once Per Turn (Army), End of Any Turn`.

### Ogor Mawtribes

- **Thundertusk Beastriders — Plough the Icepath:** app `Once Per Turn (Army), Reaction: You declared a non-Charge Move` → referencia `Once Per Turn (Army), Reaction: You declared a non-Charge Move ability for this unit in your movement phase`.
- **Scourge of Aqshy Huskard on Thundertusk — Cool Tempers:** app `Rampage, End of Your Turn` → referencia `Once Per Turn (Army), End of Your Turn`.
- **Scourge of Aqshy Huskard on Thundertusk — Everwinter's Ire:** app `Start of Any Turn` → referencia `Once Per Turn (Army), Start of Any Turn`.
- **Scourge of Aqshy Frostlord on Thundertusk — Snow Plough:** app `Rampage, Your Charge Phase` → referencia `Once Per Turn (Army), Your Charge Phase`.

### Ossiarch Bonereapers

- **Arkhan the Black, Mortarch of Sacrament — Mortarch of Sacrament:** app `Reaction: Opponent declared a Spell ability` → referencia `Once Per Turn, Reaction: Opponent declared a **^^Spell^^** ability for a unit within 18" of this unit`.
- **Liege-Mortek — Clinical Efficiency:** app `Once Per Turn (Army), Reaction: You declared a Fight ability` → referencia `Once Per Turn (Army), Any Combat Phase, Reaction: You declared a **^^Fight^^** ability for this unit`.

### Skaven

- **Vizzik Skour, Prophet of the Horned Rat — Prophet of the Horned Rat:** app `Your Hero Phase` → referencia `Once Per Battle, Your Hero Phase`.

### Slaves to Darkness

- **Centaurion Marshal — Marshal of the Legions:** app `Reaction: You declared a Fight ability` → referencia `You declared a **^^Fight^^** ability for this unit`.
- **Chaos Lord on Daemonic Mount — The Knights of Chaos:** app `Reaction: You declared a Fight ability` → referencia `You declared a **^^Fight^^** ability for this unit`.

### Soulblight Gravelords

- **Vengorian Lord — Festering Feast:** app `End of Any Turn` → referencia `Once Per Turn (Army), End of Any Turn`.
- **Radukar the Beast — The Beast Will Out:** app `Once Per Turn, End of Any Turn` → referencia `Once Per Turn (Army), End of Any Turn`.
- **Coven Throne — Scrying Pool:** app `Reaction: You declared a Redeploy command` → referencia `Pasiva`.
- **Coven Throne — A Promising Concoction:** app `Once Per Battle, Any Combat Phase` → referencia `Once Per Battle (Army), Your Combat Phase`.
- **Wight King — King of Shambling Bones:** app `Once Per Turn, Your Hero Phase` → referencia `Once Per Turn (Army), Your Hero Phase`.
- **Scourge of Aqshy Vengorian Lord — Indignant Outburst:** app `Once Per Turn, Any Combat Phase` → referencia `Once Per Turn (Army), Any Combat Phase`.
- **Scourge of Aqshy Vengorian Lord — Frenzied Surge:** app `Once Per Turn, Any Combat Phase` → referencia `Once Per Turn (Army), Any Combat Phase`.

### Sylvaneth

- **Branchwych — Slay The Trespassers!:** app `Your Hero Phase` → referencia `Once Per Turn (Army), Your Hero Phase`.
- **Spite-Revenants — Shadowcreep:** app `Your Movement Phase` → referencia `Once Per Turn (Army), Your Movement Phase`.
- **Kurnoth Hunters with Greatswords — Crashing Impact:** app `Once Per Turn (Army), Any Combat Phase` → referencia `Any Combat Phase`.
- **Kurnoth Hunters with Greatscythes — Tanglethorn Thicket:** app `Once Per Turn (Army), Any Combat Phase` → referencia `Any Combat Phase`.
- **Kurnoth Hunters with Greatbows — Steady Aim:** app `Passive` → referencia `Once Per Turn (Army), Your Shooting Phase`.

## Unidades cuyas habilidades requieren revisión semántica

La app resume los pasos Declare/Effect, por lo que una diferencia textual no demuestra por sí sola que la regla sea incorrecta. Estas unidades contienen al menos una habilidad con baja similitud textual y necesitan comprobación humana del significado.

### Cities of Sigmar

- **Aqshian Pyrocaster**.
- **Cannonade Cogfort**.
- **Conqueror Cogfort**.

### Daughters of Khaine

- **The Shadow Queen**.
- **Krethusa the Croneseer**.
- **Khinerai Heartrenders**.

### Disciples of Tzeentch

- **Kairos Fateweaver**.
- **Lord of Change**.
- **The Changeling**.
- **Magister on Disc of Tzeentch**.
- **Magister**.
- **Ogroid Thaumaturge**.
- **Tzaangor Shaman**.
- **Burning Chariot of Tzeentch**.
- **Exalted Flamer of Tzeentch**.
- **Flamers of Tzeentch**.
- **Pink Horrors**.
- **Kairic Acolytes**.
- **Jade Obelisk**.

### Gloomspite Gitz

- **Loonboss**.
- **Loonboss on Mangler Squigs**.
- **Squigboss with Gnasha-squig**.
- **Rabble-Rowza**.
- **Trugg, the Troggoth King**.
- **Dankhold Troggboss**.
- **Droggz Da Sunchompa**.
- **Snarlboss on War-Wheela**.
- **Gobbapalooza**.
- **Sneaky Snufflers**.
- **Sporesplatta Fanatics**.
- **Mangler Squigs**.
- **Squig Herd**.
- **Boingrot Bounderz**.
- **Dankhold Troggoth**.
- **Fellwater Troggoths**.
- **Skitterstrand Arachnarok**.
- **Arachnarok Spider with Flinger**.
- **Scourge of Aqshy Sunsteala Wheelas**.

### Helsmiths of Hashut

- **Urak Taar, the First Daemonsmith**.
- **Daemonsmith on Infernal Taurus**.
- **Infernal Cohort with Hashutite Blades**.
- **Infernal Cohort with Hashutite Spears**.
- **Scourge of Aqshy Daemonsmith on Infernal Taurus**.
- **Scourge of Aqshy Anointed Sentinels**.

### Ironjawz

- **Gordrakk, the Fist of Gork**.
- **Megaboss on Maw-krusha**.
- **Zoggrok Anvilsmasha**.
- **Gore-gruntas**.
- **Scourge of Aqshy Megaboss**.

### Kruleboyz

- **Killaboss on Corpse-rippa Vulcha**.
- **Killaboss with Stab-grot**.
- **Hobgrot Slittaboss**.
- **Kruleboyz Monsta-killaz**.
- **Scourge of Aqshy Killaboss on Great Gnashtoof**.
- **Scourge of Aqshy Killaboss with Stab-grot**.

### Lumineth Realm-lords

- **Archmage Teclis and Celennar, Spirit of Hysh**.
- **Alarith Stoneguard**.
- **Hurakan Windchargers**.

### Maggotkin of Nurgle

- **The Glottkin**.

### Ogor Mawtribes

- **Morga the Mighty**.
- **Mantrapper**.
- **Redd the Maw**.
- **Scourge of Aqshy Huskard on Thundertusk**.

### Ossiarch Bonereapers

- **Arkhan the Black, Mortarch of Sacrament**.
- **Liege-Mortek**.
- **Mortisan Boneshaper**.
- **Teratic Cohort**.
- **Mortek Triaxes**.
- **Mortis Reapers**.
- **Gothizzar Harvester**.
- **Mortek Crawler**.

### Skaven

- **Vizzik Skour, Prophet of the Horned Rat**.
- **Lord Skreech Verminking**.
- **Verminlord Deceiver**.
- **Verminlord Corruptor**.
- **Grey Seer**.
- **Krittok Foulblade**.
- **Arch-Warlock**.
- **Warlock Galvaneer**.
- **Deathmaster**.
- **Stormfiends**.
- **Acolyte Globadiers**.
- **Doomwheel**.
- **Ratling Warpblaster**.
- **Warp-Grinder**.
- **Warp Lightning Cannon**.
- **Warplock Jezzails**.
- **Plague Monks**.
- **Hell Pit Abomination**.

### Slaves to Darkness

- **Abraxia, Spear of the Everchosen**.
- **Gaunt Summoner**.
- **Gaunt Summoner on Disc of Tzeentch**.
- **Chaos Warriors**.
- **Darkoath Savagers**.
- **Darkoath Wilderfiend**.
- **Mutalith Vortex Beast**.

### Soulblight Gravelords

- **Nagash, Supreme Lord of the Undead**.
- **Neferata, Mortarch of Blood**.
- **Mannfred von Carstein, Mortarch of Night**.
- **Belladamma Volga, First of the Vyrkos**.
- **Kritza, The Rat Prince**.
- **Mortis Engine**.

### Sylvaneth

- **Alarielle the Everqueen**.
- **The Lady of Vines**.
- **Gossamid Archers**.

