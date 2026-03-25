---
name: commerce-inventory
description: Manage inventory counts, adjustments, and stock health. Use when running `stateset-inventory`, `stateset-direct inventory`, checking low-stock levels, or managing reservations.
---

# Commerce Inventory

Track stock levels, reservations, and adjustments across locations.

## How It Works

1. Check stock and availability for SKUs across all locations.
2. Adjust inventory with a reason code (`received`, `damaged`, `cycle_count`, `correction`).
3. Reserve stock for pending orders to prevent overselling.
4. Confirm reservations on fulfillment or release on cancellation.
5. Report updated availability, low-stock signals, and reorder points.

## Usage

- CLI: `stateset-inventory ...` or `stateset-direct inventory <action>`
- Writes require `--apply`.
- MCP tools: `get_stock`, `create_inventory_item`, `adjust_inventory`, `reserve_inventory`, `confirm_reservation`, `release_reservation`.

## Examples

```bash
stateset inventory get-stock --sku WIDGET-001 --location loc_main
stateset inventory adjust --sku WIDGET-001 --qty 50 --reason received --apply
stateset inventory reserve --sku WIDGET-001 --qty 5 --order-id ord_456 --apply
stateset inventory release-reservation res_789 --apply
```

## Status Flows

**Reservation:** Pending -> Confirmed (or Released/Expired)

**Adjustment:** Submitted -> Applied

## Output

```json
{"status":"adjusted","sku":"WIDGET-001","available":75,"reserved":10,"on_hand":85,"location_id":"loc_main"}
```

## Present Results to User

- Updated stock levels (`available`, `reserved`, `on_hand`) per location.
- Any low-stock or reorder warnings with suggested quantities.
- Reason notes and adjustment amounts applied.
- Reservation IDs created or released.

## Troubleshooting

- Insufficient stock: check reservations and `on_hand` counts; release stale reservations.
- Unknown SKU: ensure the product and inventory item exist via `create_inventory_item`.
- Negative available: reservations exceed on-hand; investigate and correct with adjustment.
- Location mismatch: verify the `location_id` exists in commerce-warehouse.

## Error Codes

- `INSUFFICIENT_STOCK`: Available quantity is below the requested amount.
- `UNKNOWN_SKU`: No inventory item exists for the given SKU.
- `RESERVATION_EXPIRED`: Reservation timed out and was automatically released.

## Related Skills

- commerce-warehouse — warehouse locations and bin management
- commerce-fulfillment — pick tasks consume reserved inventory
- commerce-products — product catalog linked to inventory items
- commerce-backorders — tracks unfulfilled demand when stock is zero

## References
- references/inventory-commands.md
- /home/dom/stateset-icommerce/cli/.claude/skills/commerce-inventory/SKILL.md
- /home/dom/stateset-icommerce/examples/workflows.md
