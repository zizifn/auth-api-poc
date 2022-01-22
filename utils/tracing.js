/* tracing.js */

// Require dependencies
import { NodeSDK, tracing } from "@opentelemetry/sdk-node";

// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'my-service',
    }),
    traceExporter: new tracing.ConsoleSpanExporter(),
    instrumentations: [getNodeAutoInstrumentations()]
});

console.log('ddddddddddddddddddd');
await sdk.start();
console.log('started---');
