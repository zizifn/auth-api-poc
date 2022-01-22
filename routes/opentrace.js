import HttpsProxyAgent from 'https-proxy-agent';
import { Router } from "express";
import axios from 'axios';
import fetch from 'node-fetch';
// import https from 'https';
var router = Router();

router.get("/", async function (req, res, next) {
  // const { default: fetch } = await import('node-fetch');
  // const proxyAgent = new HttpsProxyAgent('http://172.26.240.1:8888');
  // const response = await fetch('https://zizi.press', { agent: proxyAgent });
  const response = await fetch('http://zizi.press');

  const body = await response.text();
  console.log(body);
  res.json({
    message: "open trace"
  });
});

export default router;
