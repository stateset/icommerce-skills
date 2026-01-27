# Duplicate Order Handling

## Pattern

- Detect duplicate order in DB or ShipStation.
- Add a private note to the ticket.
- Return a success payload with status duplicate_prevented.
- Attempt to record existing order if missing from DB.

## Example Return

```json
{
  "status": "duplicate_prevented",
  "message": "Order already exists in ShipStation",
  "rma": "W-12345",
  "existing_order_id": "98765",
  "ticket_id": "12345"
}
```

Source: `/home/dom/next-temporal/duplicate-order-handling-update.md`
