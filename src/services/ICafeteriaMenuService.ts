import { ICafeteriaMenu } from "../models/ICafeteriaMenu";
import { PageContext } from "@microsoft/sp-page-context";

export interface ICafeteriaMenuService {
  readonly pageContext: PageContext;
  getCafeteriaMenus(): Promise<ICafeteriaMenu[]>;
}