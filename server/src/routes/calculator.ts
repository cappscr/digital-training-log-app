import { Express } from "express";

export const createPaceCalculatorRoutes = (app: Express) => {

  app.get("/", (req, resp) => {
    resp.render("index");
  });
}