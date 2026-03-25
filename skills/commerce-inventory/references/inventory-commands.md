# Inventory Commands

## CLI (Natural Language)

```bash
stateset "stock level for WIDGET-001"
stateset "show low stock items"
stateset --apply "add 50 units of WIDGET-001 to inventory"
stateset --apply "adjust inventory WIDGET-001 by -5 reason 'Damaged'"
stateset --apply "reserve 5 units of WIDGET-001 for order ORD-123"
stateset --apply "confirm reservation RES-001"
stateset --apply "release reservation RES-002"
```

## Direct CLI

```bash
stateset-direct inventory stock <sku>
stateset-direct inventory adjust <sku> <qty> <reason>
stateset-direct inventory reserve <sku> <qty> <order_id>
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `get_stock` | Check available/on-hand/reserved for a SKU | No |
| `create_inventory_item` | Create inventory record for a new SKU | Yes |
| `adjust_inventory` | Adjust quantity with reason code | Yes |
| `reserve_inventory` | Reserve stock for an order | Yes |
| `confirm_reservation` | Confirm reserved stock as consumed | Yes |
| `release_reservation` | Release reserved stock back to available | Yes |

## Reservation Flow

```
Reserve -> Confirm (consumed by fulfillment)
    \-> Release (order cancelled or expired)
```

Reservation holds reduce `available` stock until confirmed or released.

## Stock Calculation

| Field | Formula |
|-------|---------|
| `on_hand` | Physical units at location |
| `reserved` | Units held for pending orders |
| `available` | `on_hand - reserved` |

## Reason Codes

| Code | Use Case |
|------|----------|
| `received` | Goods received from purchase order |
| `damaged` | Write-off for damaged goods |
| `cycle_count` | Correction after physical count |
| `correction` | Manual adjustment |
| `returned` | Customer return restocked |
| `shrinkage` | Unexplained inventory loss |
| `transfer` | Moved between locations |

## Multi-Location Inventory

| Field | Description |
|-------|-------------|
| `location_id` | Warehouse or store identifier |
| `location_name` | Human-readable location name |
| `sku` | Product SKU |
| `on_hand` | Units at this location |
| `reserved` | Units reserved at this location |
| `available` | on_hand - reserved |

```bash
stateset "stock level for WIDGET-001 at location WH-EAST"
stateset --apply "transfer 20 units of WIDGET-001 from WH-EAST to WH-WEST"
stateset "list locations for sku WIDGET-001"
```

## Low Stock Alerts

```bash
stateset --apply "set reorder point WIDGET-001 threshold 25"
stateset --apply "set reorder point WIDGET-001 threshold 25 location WH-EAST"
stateset "list items below reorder point"
stateset "list items out of stock"
```

| Field | Description |
|-------|-------------|
| `reorder_point` | Quantity that triggers low-stock alert |
| `reorder_quantity` | Suggested reorder amount |
| `safety_stock` | Minimum buffer stock to maintain |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `SKU_NOT_FOUND` | No inventory record for this SKU | Create inventory item first |
| `INSUFFICIENT_STOCK` | Not enough available units | Wait for restock or reduce quantity |
| `RESERVATION_NOT_FOUND` | Reservation ID invalid | Verify the reservation ID |
| `DUPLICATE_RESERVATION` | Reservation already exists for this order | Use the existing reservation |
| `NEGATIVE_ADJUSTMENT` | Adjustment would make on_hand negative | Verify the adjustment quantity |

## Events Emitted

| Event | Trigger |
|-------|---------|
| `inventory.adjusted` | Stock quantity changed |
| `inventory.reserved` | Units reserved for order |
| `inventory.released` | Reserved units released |
| `inventory.low_stock` | Available fell below reorder point |
| `inventory.out_of_stock` | Available reached zero |
| `inventory.transferred` | Units moved between locations |

## Integration Notes

- Reservations expire after 30 minutes by default if not confirmed (configurable per store).
- Inventory adjustments from PO receiving use reason code `received` and link to the PO ID.
- The `cycle_count` reason code triggers a reconciliation audit log entry.
- Backorder support: when `available` is 0, orders can still be placed if `allow_backorder` is true on the product.
