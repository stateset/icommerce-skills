# Quality Inspections Reference

## Inspection Types

| Type | Trigger | Typical Items |
|------|---------|---------------|
| Incoming | New supplier shipment | Raw materials, components |
| Receiving | PO receipt | All received goods |
| InProcess | During manufacturing | WIP items at checkpoints |
| Final | End of production | Finished goods before storage |
| Random | Periodic audit | Random sample from inventory |
| Return | Customer return | Returned items for condition assessment |

## Inspection Flow

```
Create Inspection
  └─ Schedule (assign inspector, set date)
       └─ Start Inspection
            └─ Record Results per Item
                 ├─ Pass → Release to inventory
                 ├─ Fail → Create NCR, place hold
                 └─ ConditionalPass → Note conditions, may proceed
```

## Non-Conformance Report (NCR)

NCRs track quality failures from discovery to resolution:

| Field | Purpose |
|-------|---------|
| source | Where found: Inspection, CustomerComplaint, InternalAudit, SupplierIssue, ProductionDefect, ShippingDamage |
| severity | Critical, Major, Minor, Observation |
| disposition | What to do: UseAsIs, Rework, Repair, Scrap, ReturnToVendor, Downgrade, SortAndScreen |
| root_cause | Why it happened |
| corrective_action | Immediate fix |
| preventive_action | Prevent recurrence |

## Quality Holds

Prevent inventory movement until quality is verified:

| Hold Type | When Used |
|-----------|-----------|
| QualityInspection | Pending inspection results |
| CustomerReturn | Returned goods assessment |
| Recall | Product recall investigation |
| Damaged | Damage discovered in warehouse |
| Expired | Past expiration date |
| Quarantine | General isolation |
| RegulatoryHold | Regulatory investigation |
| InvestigationHold | Internal investigation |

## Defect Codes

Define reusable defect codes for consistent tracking:
- Code, name, description, severity, category
- Used across inspections for standardized reporting

## Key Metrics

- `pass_rate`: Items passed / total inspected
- `requires_immediate_action`: True if severity is Critical
- `all_items_inspected`: Check before completing inspection

## Inspection Fields

| Field | Description |
|-------|-------------|
| `inspection_id` | Unique identifier (QI-YYYY-NNNN) |
| `inspection_type` | Incoming, Receiving, InProcess, Final, Random, Return |
| `reference_type` | PurchaseOrder, WorkOrder, Receipt, Return |
| `reference_id` | ID of the source document |
| `inspector_id` | Assigned quality inspector |
| `scheduled_date` | When the inspection is planned |
| `completed_date` | When all items were inspected |
| `status` | Scheduled, InProgress, Completed, Cancelled |
| `notes` | Inspector observations |

## Common Operations

```bash
stateset --apply "create inspection type receiving for receipt RCV-2025-0042"
stateset --apply "record inspection QI-2025-0100 sku WIDGET-001 result pass quantity 48"
stateset --apply "record inspection QI-2025-0100 sku WIDGET-001 result fail quantity 2 defect_code SCRATCH"
stateset --apply "create ncr from inspection QI-2025-0100 severity major disposition rework"
stateset --apply "place quality hold on sku WIDGET-001 location LOC-A1-05 type quarantine"
stateset --apply "release quality hold HOLD-0023"
stateset "list inspections status in_progress"
stateset "ncr summary last 30 days"
```

## Sampling Plans

| Plan | Method | When Used |
|------|--------|-----------|
| 100% | Inspect every item | Critical components, high-value goods |
| AQL (Acceptable Quality Level) | Statistical sample per lot size | Standard incoming inspection |
| Skip-Lot | Inspect every Nth lot | Trusted suppliers with proven track record |
| Reduced | Smaller sample size than AQL | Suppliers with consistently high pass rates |

## Corrective Action Workflow

```
NCR Created
  └─ Root Cause Analysis
       └─ Corrective Action Assigned
            └─ Action Implemented
                 └─ Effectiveness Verified
                      └─ NCR Closed
```

## Practical Notes

- Inspections flagged as **Critical** severity trigger an automatic notification to the quality manager and pause any put-away for affected items.
- A quality hold prevents inventory from being picked, transferred, or shipped until the hold is explicitly released.
- Defect codes should be standardized across the organization to enable meaningful trend analysis and supplier scorecards.
- The `pass_rate` metric is calculated per inspection and also aggregated by supplier, SKU, and time period for reporting.
