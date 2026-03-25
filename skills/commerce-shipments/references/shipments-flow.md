# Shipments Flow

## Status Flow

```
Created -> Shipped -> In Transit -> Out for Delivery -> Delivered
                          \-> Exception (damaged, refused, lost)
                          \-> Returned to Sender
```

## Common Commands

```bash
stateset --apply "create shipment for order ORD-123 carrier fedex tracking 7946..."
stateset --apply "ship order ORD-123 with tracking TRACK123"
stateset --apply "update tracking SHIP-123 status in_transit"
stateset --apply "deliver shipment SHIP-123"
stateset "list shipments for order ORD-123"
```

## MCP Tool Reference

| Tool | Action | Requires --apply |
|------|--------|-----------------|
| `list_shipments` | List all shipments | No |
| `create_shipment` | Create shipment with tracking | Yes |
| `ship_order` | Mark order as shipped | Yes |
| `update_tracking` | Update tracking status | Yes |
| `deliver_shipment` | Mark as delivered | Yes |

## Shipment Fields

| Field | Description |
|-------|-------------|
| `shipment_id` | Unique shipment identifier |
| `order_id` | Associated order |
| `carrier` | UPS, FedEx, USPS, DHL |
| `service_level` | ground, express, overnight |
| `tracking_number` | Carrier tracking number |
| `status` | created, shipped, in_transit, delivered |
| `ship_date` | Date shipped |
| `delivered_date` | Date delivered |
| `estimated_delivery` | ETA from carrier |

## Supported Carriers

| Carrier | Tracking Format |
|---------|----------------|
| UPS | 1Z followed by 16 alphanumeric |
| FedEx | 12-22 digit number |
| USPS | 20-22 digit number |
| DHL | 10-digit number |

## Service Levels

| Level | Carrier Availability | Typical Delivery |
|-------|---------------------|-----------------|
| `ground` | UPS, FedEx, USPS | 5-7 business days |
| `express` | UPS, FedEx, DHL | 2-3 business days |
| `overnight` | UPS, FedEx | Next business day |
| `economy` | USPS, DHL | 7-14 business days |
| `freight` | UPS Freight, FedEx Freight | 5-10 business days |

## Error Handling

| Error Code | Meaning | Resolution |
|------------|---------|------------|
| `INVALID_TRACKING` | Tracking number format invalid for carrier | Verify format against carrier table |
| `SHIPMENT_NOT_FOUND` | Shipment ID does not exist | Check the shipment ID |
| `ORDER_ALREADY_SHIPPED` | Shipment already exists for this order | Use existing shipment or create split shipment |
| `CARRIER_UNAVAILABLE` | Carrier API not responding | Retry or select alternate carrier |
| `ADDRESS_VALIDATION_FAILED` | Ship-to address could not be verified | Confirm address with customer |

## Shipment Events

| Event | Trigger |
|-------|---------|
| `shipment.created` | Shipment record created |
| `shipment.shipped` | Package handed to carrier |
| `shipment.in_transit` | Carrier scan detected |
| `shipment.out_for_delivery` | On delivery vehicle |
| `shipment.delivered` | Delivered confirmation |
| `shipment.exception` | Delivery exception reported |
| `shipment.returned` | Returned to sender |

## Split Shipments

When an order ships from multiple locations or in multiple packages:

```bash
stateset --apply "create shipment for order ORD-123 items SKU-001,SKU-002 carrier ups tracking 1Z999..."
stateset --apply "create shipment for order ORD-123 items SKU-003 carrier fedex tracking 7946..."
```

Each shipment tracks independently. The order `fulfillmentStatus` becomes `partially_fulfilled` until all items ship.

## Tracking Webhook Configuration

```bash
stateset --apply "subscribe tracking updates for carrier ups webhook https://example.com/hooks/tracking"
stateset --apply "subscribe tracking updates for carrier fedex webhook https://example.com/hooks/tracking"
```

## Integration Notes

- Tracking status polling runs every 2 hours; webhook updates are real-time.
- Signature-required shipments include `signature_image_url` after delivery.
- International shipments include `customs_declaration` and `duties_amount` fields.
- Carrier rate shopping is available via `get_shipping_rates` before creating a shipment.
