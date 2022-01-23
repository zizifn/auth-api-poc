import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';

import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions'
// import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
// import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
// import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

const provider = new WebTracerProvider(
    {
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: "my-node-service-client"
        })
    }
);

const collectorOptions = {
    // url is optional and can be omitted - default is grpc://localhost:4317
    url: 'http://127.0.0.1:4318/v1/traces',
};
provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter(collectorOptions)));
provider.register();
// provider.register({
//     // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
//     contextManager: new ZoneContextManager(),
// });

// Registering instrumentations
registerInstrumentations({
    instrumentations: [
        new DocumentLoadInstrumentation(),
    ],
});
console.log("done");