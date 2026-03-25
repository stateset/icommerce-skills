# Receiving Flow Reference

## Inbound Logistics Pipeline

```
PO / Transfer / Return
  └─ Receipt Created (Expected)
       └─ Goods Arrive (InProgress)
            └─ Items Received (quantities recorded)
                 └─ Quality Inspection (if required)
                      └─ Put-Away (move to warehouse location)
                           └─ Completed
```

## Receipt Fields

- `receipt_number`: Auto-generated (RCV-YYYY-NNNN)
- `reference_type` / `reference_id`: Links to PO, transfer, or return
- `carrier`, `tracking_number`: ASN (Advanced Shipping Notice) info
- `expected_date` / `received_date`: Timing tracking
- `dock_door`: Physical receiving location

## Receipt Item Fields

- `sku`, `product_name`: Item identification
- `quantity_expected`: From PO or source document
- `quantity_received`: Actual count
- `quantity_rejected`: Failed inspection
- `lot_number`, `serial_numbers`: Traceability data
- `condition`: New, Used, Damaged, Refurbished
- `pending_inspection_quantity`: Awaiting QC

## Receipt Types

| Type | Source | Typical Flow |
|------|--------|-------------|
| PurchaseOrder | Supplier shipment | Full inspection, put-away |
| Transfer | Another warehouse | Minimal inspection, direct put-away |
| Return | Customer return | Condition assessment, quarantine or restock |
| Production | Manufacturing floor | QC inspection, finished goods storage |
| Adjustment | Inventory correction | Direct put-away |

## Put-Away

After receiving and inspection:
1. Create put-away task with target location
2. Assign to warehouse worker
3. Worker moves goods and confirms placement
4. Inventory updated at destination location

## Common Operations

```bash
stateset --apply "create receipt for PO PO-2025-0100"
stateset --apply "receive items on RCV-2025-0042 SKU WIDGET-001 quantity 50"
stateset --apply "create put-away for RCV-2025-0042 to location LOC-A1-05"
stateset --apply "complete put-away PUTAWAY-001"
stateset "list receipts status in_progress"
stateset "receiving summary last 7 days"
stateset --apply "reject items on RCV-2025-0042 sku WIDGET-001 quantity 3 reason damaged"
```

## Discrepancy Handling

| Discrepancy | Description | Resolution |
|-------------|-------------|------------|
| Overage | Received more than expected | Accept and update PO, or refuse excess |
| Shortage | Received less than expected | Note shortage, contact supplier for backorder |
| Damaged | Items received in damaged condition | Reject items, file claim with carrier |
| Wrong Item | Incorrect SKU received | Reject, notify supplier for replacement |
| No PO Match | Shipment has no matching purchase order | Hold at dock, contact purchasing for verification |

## ASN (Advanced Shipping Notice) Fields

| Field | Description |
|-------|-------------|
| `asn_number` | Supplier-provided shipping notice ID |
| `carrier` | Freight carrier name |
| `tracking_number` | Carrier tracking reference |
| `ship_date` | Date supplier shipped goods |
| `expected_date` | Estimated arrival date |
| `pallet_count` | Number of pallets in shipment |
| `weight` | Total shipment weight |
| `contents[]` | Expected items with SKUs and quantities |

## Receipt Statuses

```
Expected → InProgress → Completed
                     → CompletedWithExceptions
                     → Cancelled
```

- **Expected**: Receipt created from PO or ASN, goods not yet arrived.
- **InProgress**: Goods arrived at dock, receiving in process.
- **Completed**: All items received and accounted for.
- **CompletedWithExceptions**: Receiving finished but discrepancies logged (overages, shortages, damage).
- **Cancelled**: Receipt voided before any goods were processed.

## Practical Notes

- Receipts linked to a purchase order automatically update the PO's received quantities as items are checked in.
- Items requiring quality inspection are placed in a pending inspection status and are not available for pick until cleared.
- Lot numbers and serial numbers captured during receiving enable full traceability through the supply chain.
- The `dock_door` field helps warehouse managers balance inbound workload across multiple receiving bays.
- Put-away tasks use location rules (zone preferences, storage type compatibility) to suggest optimal placement.
