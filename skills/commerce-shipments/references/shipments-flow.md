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
