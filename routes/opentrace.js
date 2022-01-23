import { context, trace } from '@opentelemetry/api';

import HttpsProxyAgent from 'https-proxy-agent';
import { Router } from "express";
import axios from 'axios';
import fetch from 'node-fetch';
import { openTelCounterHTTP } from '../utils/opnetel-metric.js'

// import https from 'https';
var router = Router();

router.get("/", async function (req, res, next) {
  // const { default: fetch } = await import('node-fetch');
  // const proxyAgent = new HttpsProxyAgent('http://172.26.240.1:8888');
  // const response = await fetch('https://zizi.press', { agent: proxyAgent });
  const response = await fetch('http://zizi.press');
  const resp2 = await fetch("http://127.0.0.1:4000/corss-origin-header/json");
  const body2 = await resp2.text();
  const body = await response.text();
  console.log(body);
  const currentContext = context.active();
  const spanContext = trace.getSpanContext(currentContext);
  //"00-a3375d28545cb05e45ac93657690d2ce-44c534ef43efcae3-01"
  //     '{version}-{traceId}-{spanId}-{sampleDecision}'
  //https://opentelemetry.io/docs/instrumentation/js/getting-started/browser/
  const traceparent = `00-${spanContext.traceId}-${spanContext.spanId}-01`;
  res.set('traceparent', traceparent);
  if (res.statusCode === 200) {
    const attributes = { api: 'opentrace' };
    openTelCounterHTTP.add(10, attributes);
  }
  res.render('opentel', { title: 'opentel', text: body, traceparent });
});

export default router;
