# Response Workflow Patterns

See `response-workflows-map.md` for the current workflow list and file locations.

## Standard Flow

1. Receive webhook and validate payload.
2. Start workflow with idempotent workflowId (brand-response-{ticket_id}).
3. Fetch org settings and tokens (StateSet config, Gorgias/Zendesk, Shopify, etc).
4. Build context:
   - ticket + message metadata
   - Shopify order data from ticket.customer.integrations
   - subscription or returns data (Recharge, Skio, Ordergroove, Loop)
   - shipping data (ShipHero, ShipMonk, ShipStation)
   - vector memory (Pinecone or similar)
5. Build chat history (system prompt, prior messages).
6. Call LLM for response, optionally with tool calls.
7. Apply tags/custom fields and detect escalation.
8. Send response and update ticket.
9. Log response in StateSet.

## Common Activities (examples)

- Auth/settings: getAccessToken, getGorgiasToken, getRefreshToken
- Rules/attributes: fetchStatesetSystemRules, fetchStatesetAgentSystemRules, fetchStatesetAgentSystemAttributes
- Context: createContext, createShopifyDataContext, createRechargeDataContext, createLoopDataContext, createShipheroDataContext, createShipmonkDataContext, createMemoryContext
- Prompt assembly: create<Brand>ContextQuery, createAdvanced<Brand>ContextQuery
- Response generation: generate<Brand>MessageBody, generate<Brand>ChatMessage, format<Brand>Email
- Tagging: apply<Brand>TagsFromMessage
- Ticket ops: updateGorgiasTicket, createGorgiasTicketMessage, update<Brand>CustomFieldValues
- Logging: createStateSetResponseMessage, trackAutomatedResolution

## Escalation Detection Pattern

Use layered checks to avoid auto-responses when escalation is needed:
- Direct phrases: "escalated your case", "forwarded your request"
- Team handover phrases combined with action verbs
- Investigation phrases: "let me look into this", "need to investigate"
- Exact canned responses that require handoff

If escalation is detected:
- Skip auto-close or follow-up automation.
- Add internal note or tag for agent takeover.

## Rate Limiting and Retries

- Prefer activity retry configs with short backoff.
- Add throttles for high-volume API calls (LLM + external APIs).

## Response Logging

Store a response object with:
- ticket_id, workflow_id, workflow_run_id
- customer_message and agent_response
- function_call or action info
- status and rating

## Source References

- Workflow registry: `/home/dom/next-temporal/temporal/src/workflows-index.mjs`
- Shared workflows: `/home/dom/next-temporal/temporal/src/workflows.mjs`
- Activities index: `/home/dom/next-temporal/temporal/src/activities-index.mjs`
- Brand workflows/activities: `/home/dom/next-temporal/temporal/src/<brand>/workflows.mjs` and `/home/dom/next-temporal/temporal/src/<brand>/activities.mjs`
