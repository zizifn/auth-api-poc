/* tracing.js */

import { ConsoleMetricExporter, MeterProvider } from '@opentelemetry/sdk-metrics-base';
// Require dependencies
import { NodeSDK, tracing } from "@opentelemetry/sdk-node";
// import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { OTLPMetricExporter, OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc';

import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

// const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const collectorOptions = {
    // url is optional and can be omitted - default is grpc://localhost:4317
    url: 'grpc://localhost:4317',
};
const collectorMetricOptions = {
    // url is optional and can be omitted - default is grpc://localhost:4317
    url: 'grpc://localhost:4317',
};

const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'my-node-service',
    }),
    // traceExporter: new OTLPTraceExporter(collectorOptions),
    traceExporter: new ConsoleSpanExporter(),

    // metricExporter: new OTLPMetricExporter(collectorMetricOptions),
    instrumentations: [getNodeAutoInstrumentations(
        {
            "@opentelemetry/instrumentation-http": {
                applyCustomAttributesOnSpan: (span, request, resp) => {
                    if (span.attributes['http.target']) {
                        span.updateName(span.attributes['http.target'])
                    }
                    span.setAttribute("james-test", resp.statusCode)
                }
            },
            "@opentelemetry/instrumentation-express": {
                ignoreLayers: [(name) => {
                    console.log('ddddddddddddddd' + name);
                    return name === 'bodyParser';
                }
                ]
            }
        }
    )]
});

const meterProvider = new MeterProvider({
    exporter: new ConsoleMetricExporter(),
    interval: 1000,
})

console.log('ddddddddddddddddddd');
await sdk.start();
console.log('started---');

export {
    meterProvider
}
