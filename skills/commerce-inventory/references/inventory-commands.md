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
