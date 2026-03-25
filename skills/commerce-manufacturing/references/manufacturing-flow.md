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
