# Warranty Workflow Notes

## Key Steps

1. Parse ticket payload (ticket_id, order_id, description, tags, country).
2. Determine test store based on tags and approval flags; prefix RMA with T- when test.
3. Determine brand variant from tags (brand-a, brand-b, brand-c).
4. Validate address and map country codes (US, CA, AU).
5. Determine product SKU and replacement SKU.
6. Create ShipStation order for warranty replacement.
7. Update Zendesk ticket with status, RMA, and private notes.
8. Store warranty record and update custom fields.

## Duplicate Handling

- Check if ShipStation order already exists in DB.
- If duplicate, add private note and return a duplicate_prevented status.
- Do not throw errors that fail the workflow.

## Image Support

- When images are present, fetch image descriptions or references to help SKU selection.

## Source References

- Workflow: `/home/dom/next-temporal/temporal/src/<brand>/workflows.mjs`
- Activities: `/home/dom/next-temporal/temporal/src/<brand>/activities.mjs`
- Duplicate handling notes: `/home/dom/next-temporal/duplicate-order-handling-update.md`
