---
name: commerce-quality
description: Manage quality inspections, non-conformance reports, and quality holds. Use when inspecting received goods, production output, or customer returns for defects.
---

# Commerce Quality

Run quality inspections, track non-conformances, and place quality holds on inventory.

## How It Works

1. Create an inspection for incoming goods, production output, or returns.
2. Inspect items and record pass/fail results with defect codes.
3. Create non-conformance reports (NCRs) for failures.
4. Place quality holds to prevent movement of suspect inventory.
5. Resolve NCRs with root cause analysis and corrective actions.
6. Release holds when items pass re-inspection.

## Usage

- CLI: `stateset quality ...` or `stateset "create inspection for lot LOT-001"`
- Writes require `--apply`.
- MCP tools: `create_inspection`, `list_inspections`, `record_inspection_result`, `create_ncr`, `update_ncr`, `create_quality_hold`, `release_quality_hold`.

## Permissions

- Read: `list_inspections` — no `--apply` needed.
- Write: `create_inspection`, `record_inspection_result`, `create_ncr`, `update_ncr`, `create_quality_hold`, `release_quality_hold` — requires `--apply`.

## Examples

```bash
stateset --db ./store.db "create inspection type=Receiving po_id=PO-100 sku=WIDGET-BLK" --apply
stateset --db ./store.db "record inspection result inspection_id=INS-001 result=Fail defect=Cosmetic" --apply
stateset --db ./store.db "create quality hold sku=WIDGET-BLK reason='Pending re-inspection'" --apply
stateset --db ./store.db "list inspections status=Fail"
```

## Status Flows

**Inspection:** Pending -> InProgress -> Pass/Fail/ConditionalPass
**NCR:** Open -> UnderReview -> PendingDisposition -> CorrectiveAction -> PreventiveAction -> Verification -> Closed (or Cancelled)
**Quality Hold:** Placed -> UnderReview -> Released (or Escalated)

## Inspection Types

- Incoming, Receiving, InProcess, Final, Random, Return

## Severity & Disposition

- Severity: Critical, Major, Minor, Observation
- Disposition: UseAsIs, Rework, Repair, Scrap, ReturnToVendor, Downgrade, SortAndScreen

## Output

```json
{"status":"inspection_completed","inspection_id":"INS-001","result":"conditional_pass","pass_rate":0.96,"ncr_created":"NCR-2025-0012"}
```

## Present Results to User

- Inspection result and pass rate.
- Defect codes and quantities affected.
- NCR number and required disposition.
- Active quality holds and affected SKUs.

## Troubleshooting

- Cannot complete inspection: ensure all items have been inspected.
- Hold blocking shipment: release the hold or re-route to quarantine location.
- NCR stuck open: check that corrective action and verification steps are completed.
- Disposition not available: ensure the NCR severity level permits that disposition type.

## Error Codes

- `INSPECTION_INCOMPLETE`: Cannot finalize inspection until all items have been inspected.
- `HOLD_BLOCKING_SHIPMENT`: A quality hold is preventing inventory movement; release or re-route first.
- `NCR_DISPOSITION_INVALID`: The requested disposition is not permitted for the current NCR severity level.

## Related Skills

- **commerce-receiving**: Trigger inspections on inbound goods during receiving.
- **commerce-warehouse**: Quality holds prevent inventory movement at location level.
- **commerce-backorders**: Failed inspections reduce available stock for backorder allocation.

## References
- references/quality-inspections.md
- /home/dom/stateset-icommerce/crates/stateset-core/src/models/quality.rs
- /home/dom/stateset-icommerce/crates/stateset-embedded/src/quality.rs
