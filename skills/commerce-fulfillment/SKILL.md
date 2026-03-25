---
name: commerce-fulfillment
description: Manage fulfillment waves, pick tasks, pack tasks, and ship tasks. Use when processing outbound orders through the warehouse pick-pack-ship workflow.
---

# Commerce Fulfillment

Orchestrate outbound order fulfillment through wave planning, picking, packing, and shipping handoff.

## How It Works

1. Create a wave to group orders for efficient processing.
2. Generate pick tasks for items in the wave.
3. Workers complete picks, recording actual quantities.
4. Create pack tasks and assign items to cartons.
5. Create ship tasks and complete with carrier and tracking.

## Usage

- CLI: `stateset fulfillment ...` or `stateset "create wave for orders ORD-001 ORD-002"`
- Writes require `--apply`.
- MCP tools: `create_wave`, `list_waves`, `release_wave`, `create_pick_task`, `complete_pick`, `create_pack_task`, `add_carton`, `create_ship_task`, `complete_ship`.

## Permissions

- Read: `list_waves` — no `--apply` needed.
- Write: `create_wave`, `release_wave`, `complete_pick`, `add_carton`, `complete_ship` — requires `--apply`.

## Examples

```bash
stateset fulfillment create-wave --type batch --orders ORD-101,ORD-102,ORD-103 --apply
stateset fulfillment release-wave WAVE-2025-001 --apply
stateset fulfillment complete-pick PICK-0042 --quantity 10 --apply
stateset fulfillment complete-ship SHIP-0018 --carrier UPS --tracking 1Z999AA1012345 --apply
```

## Wave Types

- Batch (default): group multiple orders
- Priority: expedited orders
- Zone: orders for a specific warehouse zone
- Single: one order per wave

## Status Flows

**Wave:** Draft -> Released -> InProgress -> Completed (or Cancelled)

**Pick:** Pending -> Assigned -> InProgress -> Completed (or Short/Cancelled)

**Pack:** Pending -> Assigned -> ReadyToPack -> InProgress -> Completed (or Cancelled)

**Ship:** Pending -> ReadyToShip -> LabelPrinted -> Shipped (or Cancelled)

## Package Types

- Box (default), Envelope, Tube, Pallet, Custom

## Output

```json
{"status":"shipped","wave_id":"WAVE-2025-001","picks_completed":12,"cartons_packed":3,"tracking":"1Z999AA10123456784"}
```

## Present Results to User

- Wave number and order count.
- Pick completion rates and any short picks.
- Carton counts with dimensions and weights.
- Shipping labels and tracking numbers.

## Troubleshooting

- Short pick: item not at expected location; check inventory and create adjustment.
- Wave stuck in progress: verify all pick tasks are completed.
- Carton overweight: split items across multiple cartons.
- Label generation failed: verify carrier credentials and shipment `tracking_number` format.

## Error Codes

- `FULFILL_SHORT_PICK`: Item not found at expected location; inventory adjustment required.
- `FULFILL_WAVE_INCOMPLETE`: Wave cannot complete because one or more pick tasks are still pending.
- `FULFILL_CARTON_OVERWEIGHT`: Carton exceeds maximum weight limit; split items across cartons.

## Related Skills

- commerce-inventory — stock consumed during picking
- commerce-shipments — shipping handoff after pack/ship completion
- commerce-warehouse — location data for pick tasks

## References
- references/fulfillment-flow.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/fulfillment.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/fulfillment.rs
