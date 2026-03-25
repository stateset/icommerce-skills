# Manufacturing Flow

## BOM Lifecycle

```
Draft -> Active -> Archived
```

## Work Order Lifecycle

```
Created -> Started -> Completed
             \-> Cancelled
```

## BOM Steps

1. Create BOM for a product
2. Add components with SKU, quantity, and unit of measure
3. Activate BOM to make available for work orders

## Common Commands

```bash
stateset --apply "create bom for SKU WIDGET-DELUXE"
stateset --apply "add component PART-001 qty 2 to bom BOM-123"
stateset --apply "activate bom BOM-123"
stateset --apply "create work order from BOM-123 qty 100"
stateset --apply "start work order WO-123"
stateset --apply "complete work order WO-123 output 98 scrap 2"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `create_bom` | Create a bill of materials | Yes |
| `add_bom_component` | Add component to BOM | Yes |
| `activate_bom` | Activate BOM for production | Yes |
| `create_work_order` | Create production work order | Yes |
| `start_work_order` | Begin production | Yes |
| `complete_work_order` | Record output and complete | Yes |

## BOM Component Fields

| Field | Description |
|-------|-------------|
| `sku` | Component SKU |
| `quantity` | Units required per finished unit |
| `unit_of_measure` | UOM (each, kg, meter) |
| `scrap_factor` | Expected scrap percentage |

## Work Order Fields

| Field | Description |
|-------|-------------|
| `work_order_id` | Unique WO identifier |
| `bom_id` | Bill of materials reference |
| `target_quantity` | Units to produce |
| `completed_quantity` | Actual output |
| `scrap_quantity` | Units scrapped |
| `due_date` | Production due date |

## Quality Control Fields

| Field | Type | Description |
|-------|------|-------------|
| `inspection_id` | string | Unique QC inspection identifier |
| `work_order_id` | string | Associated work order |
| `inspector` | string | Person performing inspection |
| `sample_size` | number | Units inspected |
| `pass_count` | number | Units passing QC |
| `fail_count` | number | Units failing QC |
| `defect_codes` | array | List of defect classifications |
| `disposition` | string | accept, rework, scrap |

## Units of Measure

| UOM | Code | Use Case |
|-----|------|----------|
| Each | `ea` | Discrete parts and assemblies |
| Kilogram | `kg` | Raw materials by weight |
| Liter | `L` | Liquid components |
| Meter | `m` | Wire, tubing, fabric |
| Square Meter | `m2` | Sheet materials |
| Pair | `pr` | Matched component sets |

## Work Order Status Commands

```bash
# List all open work orders
stateset "list work orders status started"

# Get work order details including component consumption
stateset "get work order WO-123"

# Record quality inspection
stateset --apply "inspect work order WO-123 pass 95 fail 3 scrap 2"

# Log material consumption against a work order
stateset --apply "consume component PART-001 qty 200 from work order WO-123"
```

## Error Codes

| Error | Cause | Fix |
|-------|-------|-----|
| `BOM_NOT_ACTIVE` | BOM is draft or archived | Activate BOM before creating WO |
| `INSUFFICIENT_MATERIAL` | Component stock below requirement | Procure materials or adjust qty |
| `WO_ALREADY_COMPLETED` | Cannot modify completed work order | Create a new work order |
| `INVALID_SCRAP_QTY` | Scrap exceeds target quantity | Verify output + scrap <= target |
| `COMPONENT_NOT_IN_BOM` | SKU not listed in BOM | Add component to BOM first |
