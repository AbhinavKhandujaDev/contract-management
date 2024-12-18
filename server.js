const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

let defwss = {};

app.prepare().then(() => {
  const server = createServer();
  server.listen(8080, () => console.log("socket server started"));

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    const reqUrl = new URL(req.url || "", "http://dummy.com");
    const params = reqUrl.searchParams;
    const sessionId = params.get("sessionId");

    defwss[sessionId] = ws;

    console.log(sessionId);
    ws.send(
      Buffer.from(
        JSON.stringify({
          error: false,
          message: "connection successful",
        })
      )
    );
    ws.on("error", console.error);

    ws.onmessage = (evt) => {
      const parsed = JSON.parse(evt.data);

      const strData = JSON.stringify(parsed);

      // ws.send(strData);
      Object.values(defwss).forEach((conn) => {
        conn.send(strData);
      });
    };
  });
});
