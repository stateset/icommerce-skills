# Backorder Management Reference

## Backorder Lifecycle

```
Out of Stock
  └─ Backorder Created (Pending)
       └─ Inventory Arrives
            ├─ Partial → PartiallyFulfilled
            └─ Full → Allocated
                 └─ ReadyToShip
                      └─ Fulfilled (complete)
```

## Backorder Fields

- `backorder_number`: Auto-generated (BO-YYYY-NNNN)
- `order_id`, `order_item_id`: Original order reference
- `customer_id`: Customer waiting for fulfillment
- `sku`, `product_name`: Item backordered
- `quantity_ordered`: Total quantity needed
- `quantity_fulfilled`: Quantity shipped so far
- `quantity_remaining`: Still outstanding
- `priority`: Low, Normal, High, Critical
- `expected_date`: When stock is expected
- `promised_date`: Date promised to customer

## Allocation

Reserve incoming inventory for specific backorders:
- `allocation_id`: Unique allocation reference
- `quantity`: Amount reserved
- `source_type`: Where inventory is coming from
- `source_id`: PO number, transfer ID, or work order
- `expiration`: Auto-release if not confirmed

**Allocation Statuses:** Reserved -> Confirmed -> Released/Expired

## Fulfillment Sources

| Source | Description |
|--------|-------------|
| Inventory | Existing warehouse stock becomes available |
| PurchaseOrder | Supplier PO received |
| Transfer | Stock transferred from another warehouse |
| Production | Manufacturing work order completed |

## Priority Processing

Process backorders in priority order:
1. **Critical** - Customer escalation, SLA breach
2. **High** - Important customer, time-sensitive
3. **Normal** - Standard processing (default)
4. **Low** - Non-urgent, can wait

## Reporting

### SKU Backorder Summary
- Total quantity backordered across all orders
- Number of affected orders and customers
- Earliest expected date

### Backorder Summary
- Total backorders by status
- Overdue backorders (past promised date)
- Average days outstanding

## Notification Events

| Event | Trigger | Recipient |
|-------|---------|-----------|
| BackorderCreated | New backorder logged | Customer, Sales Rep |
| AllocationConfirmed | Inventory reserved against backorder | Warehouse, Customer |
| ExpectedDateChanged | Supplier updates ETA | Customer, Sales Rep |
| PromisedDateBreached | Current date passes promised date | Customer Service, Manager |
| PartialShipment | Some quantity shipped, remainder pending | Customer |
| BackorderFulfilled | Entire quantity shipped | Customer, Sales Rep |
| AllocationExpired | Reserved stock released after timeout | Purchasing, Warehouse |

## Common Operations

```bash
stateset --apply "create backorder for order ORD-2025-1234 sku WIDGET-001 quantity 50"
stateset --apply "allocate 25 WIDGET-001 to backorder BO-2025-0010 from PO PO-2025-0200"
stateset --apply "fulfill backorder BO-2025-0010 quantity 25"
stateset "list backorders status pending priority high"
stateset "backorder aging report"
stateset --apply "cancel backorder BO-2025-0010 reason customer_cancelled"
```

## Aging Buckets

| Bucket | Days Outstanding | Action Required |
|--------|-----------------|-----------------|
| Current | 0-14 days | Standard monitoring |
| Aging | 15-30 days | Contact supplier for update |
| Overdue | 31-60 days | Escalate to purchasing manager |
| Critical | 60+ days | Customer outreach, consider alternatives |

## Practical Notes

- Backorders with **Critical** priority bypass the standard allocation queue and are filled first when stock arrives.
- When a PO is partially received, allocations are filled in priority order until incoming quantity is exhausted.
- Expired allocations automatically return reserved stock to the available pool; a new allocation must be created.
- Customers can opt out of backorder fulfillment, which cancels the backorder and triggers a refund for any prepaid amount.
- The `quantity_remaining` field is computed: `quantity_ordered - quantity_fulfilled`.
