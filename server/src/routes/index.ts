import { Express } from "express";
import { createPaceCalculatorRoutes } from "./calculator";

export const createRoutes = (app: Express) => {

  createPaceCalculatorRoutes(app);
}