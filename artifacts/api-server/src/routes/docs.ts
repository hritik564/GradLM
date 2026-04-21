import { Router, type IRouter } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const specPath = resolve(__dirname, "openapi.yaml");
const spec = yaml.load(readFileSync(specPath, "utf8")) as Record<string, unknown>;

const docsRouter: IRouter = Router();

docsRouter.use("/docs", swaggerUi.serve);
docsRouter.get("/docs", swaggerUi.setup(spec, { explorer: true }));
docsRouter.get("/docs/openapi.yaml", (_req, res) => {
  res.setHeader("Content-Type", "application/yaml");
  res.send(readFileSync(specPath, "utf8"));
});

export default docsRouter;
