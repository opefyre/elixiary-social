# Skit assets

Generated with Higgsfield `gpt_image_2_5` (medium, 0.5 credits each), from `sal-shaking.png` as the style reference.
Cutouts made with `cutout.py` (`TOLHEAD=14 HEADROWS=.55`); props split from one 3x2 sticker sheet.

| file | job id |
|---|---|
| cutouts/friend_point.webp (base for the other friend poses) | 3a4f9857-b2a8-4e0f-86f2-aab7be570b9d |
| cutouts/sal_host.webp | 6b5880a1-1495-4bcd-b1b1-421dd5e0c5cd |
| cutouts/sal_flat.webp | 90eea16c-1c2e-4f95-afef-5c48de2a0917 |
| props/* (sticker sheet) | e28750c0-e875-4091-be58-902d0bd38129 |
| cutouts/friend_flip.webp | 7fdd623b-f6bc-4555-8ffd-2477af2dea7c |
| cutouts/friend_lime.webp | 8c8784c5-8956-4975-8c21-3216ec30265a |
| cutouts/friend_shake.webp | 358d3cdc-90a5-4af6-82f7-a523bbf7d8c7 |
| cutouts/friend_present.webp | 9951a668-ae59-4997-978a-75e1c5bf04fa |

`sfx/*.wav` are copied from the Finkavo sound library (ElevenLabs sound generation). `logo.png` is the Elixiary logo.

## sk2-loud-bar

Cut with `clean.py` (cutout.py plus removal of background trapped in curls and between arms; keeps eye whites), then the
pale rim on the curls trimmed.

| file | job id |
|---|---|
| cutouts/cust_shout.webp (base for the customer) | 00519201-25b7-4835-abfb-0f869992c4fd |
| cutouts/cust_scream.webp | 09e3095e-0979-4ade-bfbf-5c7a5e824759 |
| cutouts/cust_oops.webp | c4d101fd-ae03-437e-8d57-6b248f1cf119 |
| cutouts/salb_ear.webp (counter cropped off) | 8b235bb7-1bd9-46ae-a13d-337dd9e4541e |
| cutouts/salb_thumb.webp | 6cf76ef5-b0a7-462e-ad54-0ec362db1cdd |
| cutouts/salb_negroni.webp | 71c37829-0c35-43a3-b249-67ff3d4b921b |

## sk3-recommend

| file | job id |
|---|---|
| cutouts/cust_read.webp | fca6d233-9370-4c4e-bc33-dc856d61bc82 |
| cutouts/cust_ask.webp | ce4b86fd-0d6a-4dc2-99bd-8789d0b8f9f5 |
| cutouts/salc_wait.webp | 9486dd9c-1a4d-4998-922d-19f075baab8d |
| cutouts/salc_tired.webp | 0cdab337-9259-424f-9659-af52be1376ef |
| cutouts/salc_old.webp (TOLHEAD=9 HEADROWS=.85 to keep the white beard) | 619a666f-a8bb-4929-92f1-e4c1623942af |

`menu-sk3.json` is a read-only export of 48 curated_recipes rows (name, first three ingredients); the reel inlines 31 of them.

## sk4-on-time, sk5-sophisticated, sk6-one-coffee

Images (gpt_image_2_5 medium): host_relax bd11b520, host_freeze e0e3e582, host_run 9380eb4f, host_grin d3b6db38, host_run2 fb3bd5fb,
friends6 e3fda19a (TOLHEAD=6 to keep the white cake box), guy_order e04c3953, guy_sip 6dd37e0a, guy_smile 2e0e6a7c, guy_love 5154c145
(no enclosed-region pass: it ate the shirt), date_pina 9a79bafe, date_neg 76b864eb, tour_ask b2d391b3, tour_sweat a9568a36,
bar_talk 326562b5, bar_slide 6ccd34ad (white shirts: TOLHEAD=7 HEADROWS=1), oldman 899a96c1 (counter cropped off).

Voices (ElevenLabs eleven_v3, tts.py/cut.py from the Finkavo toolkit): sk5 him = Alex (yl2ZDV1MzN4HbQJbMihG), her = Sarah
(EXAVITQu4vr4xnSDxMaL); sk6 tourist = Charlie (IKne3meq5aSn9XLyUdCD), barista = Paulo PT (aLFUti4k8YKvtQGXv0UO, --lang pt).
The rapid-fire questions are cut with voices/recut_fast.py (midpoints snapped to the quietest 10 ms).
Effects `elx-*.wav`: ElevenLabs sound generation (sfx.py); doorbell/applause/etc. from the Finkavo library.

## sk7-wild-bartender, sk8-bringing-what, sk9-dont-you-dare

From here on images are generated with `background: "transparent"` (gpt_image_2_5) and only trimmed — no local cutout.
hb_video b14618ad, hb_ice c5411374, hb_shake c2f192de, hb_present 848d73f8, guests e9174f41, guests_fake 5878ef8d,
friends5_shock e6fe9946, tropic_ice cacb14b3, wine_table bf1d6dc8, cat_sit 214d2a78, cat_paw fb88efb9, cat_guy_proud cd455881,
cat_guy_warn 3fb34441, cat_guy_dive f812eeed. av_*.webp are face crops of friends6 (e3fda19a) for the chat avatars.
Voices: sk7 narrator Bradford (NNl6r8mD7vthiJatiJt1); sk8 Rico = Liam (TX3LPaxmHKxFdv7VOQHJ); sk9 = Alex (yl2ZDV1MzN4HbQJbMihG).

## sk10-recipe-vs-reality, sk11-mum-fixes-it, sk12-hey-nova

Transparent generations, trimmed only: hb_salt 8afc7245, hb_foam 520671d1, hb_burnt 91f24146, hb_sip 3ffaa621, stylist 73ce12b7,
cust_serve f66a716a, cust_nooo ca03a9f8, cust_flat 35e201ea, mum_sniff 7f3e8c5b, mum_pour ad32b8b6, mum_happy d18d9b02,
nova_guy 0cebd055, nova_argue d9b26703, nova_panic 4e5a1899, nova_buried b03e7994.
Voices: sk10 Will (bIHbv24MWmeRgasZH58o); sk11 Mum = Matilda (XrExE9yKIg1WjnnlVkGX), daughter = Jessica (r1KmysJdVYZjJCm4mL3b);
sk12 him = Alex, Nova = Alice (Xb7hH8MSUJpSbSDYk0k2, stability 1.0). Clipped line endings re-cut with voices/recut_end.py.
"Nova" and "Margarita Time" are invented — no real assistant or song.

## sk13-the-toast, sk14-the-trolley, sk15-night-out

Transparent generations, trimmed with trim.py: boss_speech ca32b89d, crew_raised c27cfcae, crew_strain 21e0509d, crew_empty dba6eeea,
trav_wait 0fb458ba, trav_asleep 78e54d95, trav_eyes 088dcc61, trav_nooo 21d7bf6e, attendant 738d1b73 (no airline logos),
parents_cheers 85cddde0, parents_phone d40bfbb2, parents_yawn 1a1b9705, parents_asleep 7adaf0cd.
Voices: sk13 boss = Bill (pqHfZKP75CvOlQylNhV4); sk14 captain = Daniel (onwK4e9ZLuTAKqWW03F9, stability .8); sk15 = Marta (bBNhdwrIjl4fcVYiRbT2).

## sk16-mojito, sk17-fancy-bar, sk18-last-lime

Transparent generations: sal_twitch 8a883eae, sal_muddle f427437f, sal_apron d45fe7f7, sal_sea f393e239, cust_sweet dd8fd237, crowd_hands 7e0c2308,
waiter d475d69e, fancy_props 42adcbbc (split into prop_boot / prop_slate), guy_stare c8122cc2, guy_pipette f4ef04dc, rico_dive a86b4958,
maya_lunge 7e459310, hb_triumph c9d400c5, hb_dry 49637e2c.
Voices: sk16 her = Jessica, crowd = Liam; sk17 guy = Alex, waiter = George (JBFqnCBsd6RMkjVDRZzb); sk18 trailer = Brian (nPczCjzI2devNBz1zQrb).

## sk19-minibar, sk20-split-evenly, sk21-photo-first

Transparent generations: mb_look a90f0493, mb_shock dd63bbca, mb_phone dce1ac78, mb_tiptoe 1874d152, split_cheer c36d9492, nina_water 6f867689,
nina_order 930ed5e3, waiter_tower 4e576745, inf_wait 06c6c641, inf_chair 941615cc, inf_crouch b1163db9, inf_selfie 29790341,
pals_reach 31e7d3cd, pals_bored 97a7b61b.
Voices: sk19 guest = Callum (N2lVS1w4EtoT3dr4eOWO), desk = Lily (pFZP5JQG7iQjIQuC4Bku); sk20 Rico = Liam, Nina = Sarah; sk21 her = Laura (FGY2WhTYpPnrIDTdsKH5), friend = Brian.

## sk22-empty-tray, sk23-karaoke, sk24-just-a-sip (3.5 credits: 7 new images, the rest reused)

det_look 32ae0f26, det_shock dca290de, kar_sing d79418ef, kar_cling 44b79942, sal_mop 0c389787, nina_sip 3e85088f, nina_empties 32a9e1ed.
Voices: sk22 noir narrator = Callum; sk23 her = Laura, Sal = Chris (iP95p4xoKVk53GoZ742B); sk24 Nina = Sarah, waiter = George (+ sk20 callbacks).

## sk25-drink-reading, sk26-flat-pack, sk27-wine-snob (2.5 credits: 5 new images, the rest reused)

sal_psychic 4a2d514d, hb_manual 6bed8783, hb_hexkey 16654e36, snob_swirl e8491986, snob_frozen aa7dfeb2.
Voices: sk25 Sal = Chris, Nina = Sarah; sk26 none (wordless); sk27 snob = George, host = Matilda (XrExE9yKIg1WjnnlVkGX).
SFX (ElevenLabs): elx-mystic, elx-paper-unfold, elx-ratchet, elx-parts-collapse, elx-swirl, elx-dinner-party, elx-kids-party.

## sk28-bank-app, sk29-eye-contact, sk30-leaving (3.5 credits: 7 new images)
rico_squint c1c17d55, rico_shock 5dab27c1, rico_swan fb7c9c68, cheers_up fefeac73, cheers_done abfa1b26, leave_wave 5d5aa1be, leave_boxes 92a98f13.
Voices: sk28 Rico = Liam; sk29 Laura, Nina = Sarah, Grandpa = Bill (pqHfZKP75CvOlQylNhV4); sk30 guest = Will (bIHbv24MWmeRgasZH58o), host = Matilda.

## sk31-watch-my-drink, sk32-brain-blank, sk33-no-corkscrew (2.5 credits images + 1.65 credits TTS)
theo_guard 9cda2546, theo_dive a92c34a2, theo_guilty 37e28c92, hb_shoe 32389624, hb_wine c1736886.
Voices: sk31 her = Laura, Theo = Daniel (onwK4e9ZLuTAKqWW03F9); sk32 Sal = Chris. ElevenLabs quota ran out mid-round, so the rest are Higgsfield text2speech_v2 (elevenlabs engine, presets): sk32 her = Kayla, brain crew = Pixie (pitched up x1.22); sk33 video host = Callum preset, flatmate = Marcus.

## sk34-take-a-photo, sk35-polite-sip, sk36-self-checkout (3.5 credits images + 1.8 credits TTS)
couple_fake 6173352b, couple_pour 7e9dea3e (ref guests e9174f41), gramps_joy 3049cf91, gramps_flat 6f1a57c0 (ref oldman 899a96c1), clerk 28d2c0f5, tourist_shoot e3e729cb, tourist_selfie 1893bd80.
Voices (Higgsfield text2speech_v2, elevenlabs presets): sk34 friend = Maya, tourist = Bob; sk35 host = Mabel, guest = Emily; sk36 machine = Tamsin, clerk = Evan, him = Alistair.

## sk37-i-know-a-place, sk38-long-story-short, sk39-airport-beer (1 credit images + 1.65 credits TTS)
tourist_shock 502fa55a, tourist_resign 3345c592 (ref tourist_shoot e3e729cb). Everything else reused (friend_*, guy_*, pals_*, couple_fake, bar_talk/bar_slide, sal_mop).
Voices (Higgsfield text2speech_v2, elevenlabs presets): sk37 Rico = Miles, bartender = Brooks; sk38 him = Reid, her = Isla; sk39 tourist = Bob, bartender = Barrett, announcement = Imogen (band-passed).

## Seasonal: sk40-espresso-martini (Coffee Day, 1 Oct), sk41-oktoberfest (2 Oct), sk42-halloween (31 Oct) — 4 credits images + 1.5 TTS
em_awake c4eec204, em_wired 23ded9fb, em_asleep 37817a48 (ref cust_ask ce4b86fd), okt_strain e704800b, okt_foam 83ef5a02 (ref tourist e3e729cb), okt_server 54019e50, hw_skeleton d829ef43, hw_vampire 0c4f8436.
Voices (Higgsfield text2speech_v2, elevenlabs presets): sk40 her = Kayla; sk41 Gary = Bob; sk42 Sal = Marcus, ghost = Gideon (pitched down + echo), vampire = Vlad, skeleton = Knox. skits/move_skit.py moved sk6 → 5 Nov, sk5 → 6 Nov, sk35 → 7 Nov.

## Seasonal: sk43-black-friday (27 Nov), sk44-christmas (25 Dec) — 1.5 credits images + 1.05 TTS
rico_cart d6d2d555 (ref friend_point 3a4f9857), xm_dad e465208b (ref guy_smile 2e0e6a7c), xm_kid 7f8a2ce7.
Voices (Higgsfield text2speech_v2, elevenlabs presets): sk43 Rico = Miles, Nina = Isla; sk44 kid = Pixie, dad = Julian.

## sk45-new-pricing, sk46-beer-2026, sk47-wine-tasting (8 credits: gpt_image_2 ×3 + image_background_remover ×5, 2 of them duplicates from timeouts)
gpt_image_2_5 was retired; gpt_image_2 has no transparent background and reference images failed, so w_spit e8629084, w_cheese dd388fa0, w_nina fde54415 were text-only, then background-removed (2d916233, e70d9d98, c54daa37).
Voices: ElevenLabs direct again (Sal = Chris, Jessica, Alex, Rico = Liam, Nina = Sarah, sommelier = George).

## sk48-one-at-a-time, sk49-five-min-away, sk50-ages (0 Higgsfield credits: all poses reused)
Voices: ElevenLabs (Jessica, Alex, Rico = Liam, Laura, Nina = Sarah, Sal = Chris, Grandpa = Bill). Formats: bartender pet peeve (one-at-a-time orders), fake-text "where are you", age brackets.

## sk51-cat-saw-everything, sk52-last-orders, sk53-designated-driver (2 credits: 1 gpt_image_2 + 1 background removal)
cat_guy_cheese 7e8a5e44 → 8c4adc62 (text-only). Voices: ElevenLabs (cat = Daniel, him = Will; Jessica, Rico = Liam, Laura, Alex, Sal = Chris, Nina = Sarah, Gary = Bill).

## sk54-holiday-drink, sk55-open-bar, sk56-craft-cocktail (~15 credits: gpt_image_2 ×10 incl. 1 re-roll after a content flag, image_background_remover ×5)
First skits with generated 9:16 background plates in assets/bg/ (752x1344 → 1080x1920): beach 16869b52, kitchen 72f56e58, wedding e2f5a6a6, speakeasy ccb2c082.
Cutouts (text-only, then background-removed): rico_hoodie 1595c6b8 → a48a1db0, fob_receipt 185e43ab → 2b64b035, mix_tweezers 4eb64162 → 3bdf55b4, mix_shock 491bb98f → cf823df0, wed_dancers e72f24b8 → d519c891.
Voices: ElevenLabs (Rico = Liam; DJ = Brian, auntie = Matilda, Grandpa = Bill, bride's dad = Callum; customer = Alex, mixologist = Charlie).

## sk57-club-bathroom, sk58-drunk-mode, sk59-cancelled-plans (~24 credits: gpt_image_2 ×14 incl. 1 re-roll after a content flag, image_background_remover ×10)
Backgrounds (752x1344 → 1080x1920): ladies fa8988b4, mens 0cf158fb, night 1e8086d5.
Cutouts (text-only, then background-removed): glam_point 91a30398 → 9de9e548, nina_aww e8101a44 → 80b2eb6d (re-roll of acd4dfb6), rico_nod 2e30b1d0 → ccaa084d, sal_bouncer d3159998 → 5904cf41, rico_drunk 9c516641 → 4394de84, rico_relief 3bc9603b → 917ca54b, pizza_guy 064560bc → 862a9e0d, jess_pj 8d1b9fdc → 2edcb33e, nina_popcorn 99ee9b1e → 5562bee6, rico_robe 69cfd6ec → 48eaa93d.
Voices: ElevenLabs (stranger = Laura, Nina = Sarah, Rico = Liam, Alex, Sal = Chris, delivery = Will, Jess = Jessica).

## sk60-never-again, sk61-camera-roll, sk62-doctor (25 credits: gpt_image_2 ×15, image_background_remover ×10)
Backgrounds: bedroom 1e48b288, gym 12c003f8, clinic 279b3218. Photos (no bg removal, assets/photos/): dog_selfie b2a1c933, cone_hug 9f83b4a6.
Cutouts: rico_oath dba8d6db → 2fcc5d16, rico_smoothie 4a9a2c89 → 943fc66a, rico_gym 673d1691 → 9184a980, rico_kombucha 2582136a → 7e0f3001, rico_party a48202c9 → 7dc28f69,
nina_morning f2d9cd71 → ed59f28a, kevin 705cee05 → d289934d, doc_skeptic ee279a77 → 8305128b, doc_sip 12725321 → f6ef5153, alex_pinch 93b97e80 → 89b22c9a.
Voices: ElevenLabs (Rico = Liam, Sal = Chris, Nina = Sarah, doctor = Matilda, Alex).

## sk63-how-i-dance, sk64-2am-philosophy, sk65-new-year-champagne (~29 credits: gpt_image_2 ×17 incl. 4 content-flagged, image_background_remover ×10)
Backgrounds: club b1d16a5e, kebab cfda0d7e, nye 6f9bcbf2. Flagged (not used): split fail b830e43b/3361ca40, group hug 1de04e18/8785c6f1.
Cutouts: dance_point 8012fda4 → 505d97b7, dance_split 8ca6ce5e → e0d8cb60, dance_flail 2e08eac6 → d72199f4, dance_worm a622d2b1 → 291258f5, dj_stare d3add434 → 284582b2,
alex_fry 27d64ed5 → a65f104f, rico_tear 6537dc98 → 8b1a4652, cook_tear 87ced63e → 051627bf, alex_cork 4ac00d6c → dd041911, alex_spray 58fe5e21 → 8daebad6.
Voices: ElevenLabs (Rico = Liam, DJ = Brian, Nina = Sarah, Jess = Jessica, Alex, cook/Grandpa = Bill).

## sk66-second-cheapest, sk67-fruity-not-sweet, sk68-pre-drinks (~9 credits: gpt_image_2_5 transparent ×4, gpt_image_2 ×2 backgrounds, no background removal)
First cutouts generated with a native transparent background (gpt_image_2_5, background: "transparent"): alex_menu 4c462f35, waiter_wink 129287ca, queue4 d101562c, walkhome4 3b267c5e.
Backgrounds: restaurant c6770841, queue 5e02fd9a. Reused: speakeasy, night, club, split_cheer, kar_sing, cheers_up, friend_point, sal_bouncer, cust_*, salc_wait, sal_twitch, w_nina.
Voices: ElevenLabs (Nina = Sarah, Alex, waiter = George, Jess = Jessica, Sal = Chris, Rico = Liam, DJ = Brian).
