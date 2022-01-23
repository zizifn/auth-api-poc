import { ConsoleMetricExporter, MeterProvider } from '@opentelemetry/sdk-metrics-base';

import { OTLPMetricExporter } from '@opentelemetry/exporter-otlp-http';

// const collectorMetricOptions = {
//     // url is optional and can be omitted - default is grpc://localhost:4317
//     url: 'http://127.0.0.1:8888/metrics',
// };
const meterProvider = new MeterProvider({
    // exporter: new OTLPMetricExporter(collectorMetricOptions),
    exporter: new ConsoleMetricExporter(),
    interval: 1000,
})

const meter = meterProvider.getMeter('example-meter');
// const meter = .getMeter('your-meter-name');

const openTelCounterHTTP = meter.createCounter('metric_name', {
    description: 'Example of a counter'
});

export {
    openTelCounterHTTP
}