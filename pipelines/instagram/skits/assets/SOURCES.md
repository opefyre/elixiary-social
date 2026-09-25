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
