---
name: commerce-warehouse
description: Manage warehouses, locations, and inventory movements. Use when setting up warehouses, creating zones/bins, moving stock between locations, or tracking location-level inventory.
---

# Commerce Warehouse

Manage warehouse facilities, location hierarchies, and inventory movements across zones, aisles, racks, and bins.

## How It Works

1. Create a warehouse with type and address.
2. Define locations within the warehouse (zones, aisles, racks, bins).
3. Track inventory at each location with on-hand, reserved, and available quantities.
4. Move inventory between locations with full audit trail.
5. Adjust location inventory with reason codes and references.

## Usage

- CLI: `stateset warehouse ...` or `stateset "list warehouse locations"`
- Writes require `--apply`.
- MCP tools: `list_warehouses`, `get_warehouse`, `create_warehouse`, `update_warehouse`, `list_locations`, `get_location`, `create_location`, `get_location_inventory`, `adjust_location_inventory`, `move_inventory`, `list_movements`.

## Permissions

- Read: `list_warehouses`, `get_warehouse`, `list_locations`, `get_location`, `get_location_inventory`, `list_movements` — no `--apply` needed.
- Write: `create_warehouse`, `update_warehouse`, `create_location`, `adjust_location_inventory`, `move_inventory` — requires `--apply`.

## Examples

```bash
stateset warehouse create --name "East DC" --type Distribution --apply
stateset warehouse create-location WH-EAST --type Pick --code LOC-A1-01 --apply
stateset warehouse move --sku WIDGET-001 --from LOC-A1-01 --to LOC-B2-03 --quantity 25 --apply
stateset warehouse inventory LOC-A1-01 --include-reserved
```

## Warehouse Types

- Distribution (default), Manufacturing, Retail, ThirdParty, Consignment, Returns

## Location Types

- Bulk, Pick, Staging, Receiving, Shipping, Quarantine, Returns, Production, Packing, CrossDock

## Status Flows

**Warehouse:** Active -> Inactive -> Decommissioned
**Movement:** Pending -> InProgress -> Completed (or Cancelled)
**Location:** Active -> Inactive -> Blocked

## Movement Types

- Receipt, Transfer, Pick, Adjustment, Shipment, Return

## Output

```json
{"status":"moved","from_location":"LOC-A1-01","to_location":"LOC-B2-03","sku":"WIDGET-001","quantity":25}
```

## Present Results to User

- Warehouse and location identifiers created or updated.
- Inventory quantities at affected locations.
- Movement audit trail with reason and reference.
- Location utilization and capacity status.

## Troubleshooting

- Insufficient stock at location: check on-hand minus reserved before moving.
- Location not found: verify the warehouse and location hierarchy exist.
- Duplicate location code: location codes must be unique within a warehouse.
- Movement stuck in progress: verify both source and destination locations are active.

## Error Codes

- `INSUFFICIENT_LOCATION_STOCK`: On-hand quantity minus reserved is insufficient for the requested move.
- `LOCATION_NOT_FOUND`: The specified warehouse or location code does not exist in the hierarchy.
- `DUPLICATE_LOCATION_CODE`: A location with this code already exists within the warehouse.

## Related Skills

- **commerce-receiving**: Put-away tasks move received goods into warehouse locations.
- **commerce-quality**: Quality holds block inventory movement at specific locations.
- **commerce-backorders**: Warehouse stock levels determine backorder allocation.

## References
- references/warehouse-locations.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/warehouse.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/warehouse.rs
