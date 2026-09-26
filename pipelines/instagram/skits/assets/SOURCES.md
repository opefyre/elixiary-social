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
