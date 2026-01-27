# NetSuite and DCL Workflow Patterns

## Workflows

- shopifyToNetsuiteWorkflow
- netsuiteToDCLWorkflow
- dclFulfillmentWorkflow
- netsuiteInvoiceWorkflow
- netsuitePaymentWorkflow
- dclTrackingUpdateWorkflow
- dclPoNotificationWorkflow
- dclPoReceiptWorkflow
- inventorySyncWorkflow
- inventoryBundlesSyncWorkflow

## Activity Configs

- transform: short, fast, retry 3 times
- apiCall: long, retry 5 times, nonRetryable errors list
- response and reason: medium timeouts for AI and messaging
- reporting: short timeouts for notifications

## Batching and Concurrency

- Use processBatchWithConcurrency to control parallelism.
- Use chunkArray for batch sizes.
- Collect per-item success or failure to avoid full workflow failure.

## Error Handling

- Wrap activity failures with ApplicationFailure.
- Mark nonRetryable errors for invalid input or hard API errors.

## Source References

- Workflows: `/home/dom/next-temporal/temporal/src/<org>/workflows.mjs`
- Activities: `/home/dom/next-temporal/temporal/src/<org>/activities.mjs`
