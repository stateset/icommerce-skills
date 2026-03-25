# Warehouse & Location Reference

## Warehouse Types

| Type | Use Case |
|------|----------|
| Distribution | General fulfillment center |
| Manufacturing | Production facility |
| Retail | Store-attached warehouse |
| ThirdParty | 3PL managed facility |
| Consignment | Vendor-owned stock |
| Returns | Reverse logistics center |

## Location Hierarchy

```
Warehouse
  └─ Zone (e.g., ZONE-A)
       └─ Aisle (e.g., A1)
            └─ Rack (e.g., A1-R01)
                 └─ Level/Bin (e.g., A1-R01-B03)
```

## Location Types

| Type | Purpose |
|------|---------|
| Bulk | Long-term high-volume storage |
| Pick | Active picking face |
| Staging | Temporary hold before shipping |
| Receiving | Inbound dock area |
| Shipping | Outbound dock area |
| Quarantine | Quality hold area |
| Returns | Returned goods processing |
| Production | Manufacturing floor |
| Packing | Pack stations |
| CrossDock | Direct transfer, no storage |

## Movement Types

| Type | Description |
|------|-------------|
| Receipt | Goods received into location |
| Transfer | Move between locations |
| Pick | Picked for fulfillment |
| Adjustment | Cycle count or correction |
| Shipment | Shipped out of location |
| Return | Returned goods placed |

## Location Inventory Fields

- `on_hand`: Total physical quantity
- `reserved`: Quantity reserved for orders
- `available`: on_hand minus reserved
- `min_quantity` / `max_quantity`: Replenishment thresholds

## Common Operations

```bash
stateset --apply "create warehouse WH-EAST type distribution"
stateset --apply "create location ZONE-A type bulk in warehouse WH-EAST"
stateset --apply "move 25 WIDGET-001 from LOC-A1-01 to LOC-B2-03"
stateset --apply "adjust location LOC-A1-01 SKU WIDGET-001 by -5 reason cycle_count"
stateset "list locations zone ZONE-A type pick"
stateset "location utilization report warehouse WH-EAST"
stateset --apply "create cycle count for zone ZONE-A"
```

## Zone Configuration

| Zone | Typical Use | Storage Conditions |
|------|------------|-------------------|
| A | Fast-moving / high-velocity SKUs | Standard ambient |
| B | Medium-velocity SKUs | Standard ambient |
| C | Slow-moving / bulk storage | Standard ambient |
| D | Cold chain / temperature-controlled | Refrigerated (2-8C) |
| E | Frozen goods | Frozen (-18C or below) |
| F | Hazardous materials | Ventilated, fire-suppressed |
| Q | Quarantine / quality hold | Restricted access |

## Replenishment Rules

| Rule | Trigger | Action |
|------|---------|--------|
| MinMax | `available` drops below `min_quantity` | Transfer from bulk to pick location |
| TopOff | Pick location below 50% capacity | Refill to max during off-peak hours |
| Demand-Based | Forecasted orders exceed pick stock | Pre-stage from bulk before wave release |
| Emergency | Pick location empty, orders pending | Immediate replenishment task created |

## Cycle Count Fields

| Field | Description |
|-------|-------------|
| `count_id` | Unique cycle count identifier |
| `location_id` | Location being counted |
| `sku` | Item counted |
| `system_quantity` | Expected quantity from inventory records |
| `counted_quantity` | Actual physical count |
| `variance` | Difference between system and counted |
| `status` | Scheduled, InProgress, Completed, Reviewed |
| `counted_by` | Worker who performed the count |

## Practical Notes

- Locations with `max_quantity` set will reject put-away tasks that would exceed capacity.
- The **CrossDock** location type allows goods to flow directly from receiving to shipping without storage, reducing handling time.
- Cycle counts should be scheduled on a rolling basis with high-velocity locations counted more frequently (ABC analysis).
- Quarantine locations require a quality release before inventory can be transferred to a standard storage location.
- Location naming conventions should encode the hierarchy (e.g., `WH01-ZA-A1-R01-B03` = Warehouse 01, Zone A, Aisle 1, Rack 01, Bin 03).
