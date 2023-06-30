import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CafeteriaMenuPropertyPane } from './CafeteriaMenuPropertyPane';
import { SPHttpClient } from '@microsoft/sp-http'

export interface ICafeteriaMenu {
  dayoftheweek: string;
  cuisine: string;
  dayname: string;
  mealname: string;
  mealdescription: string;
  mealrecipe: string;
  vegetarian: boolean;
  vegan: boolean;
  dairyfree: boolean;
  url: string;
}

export interface ICafeteriaMenuAdaptiveCardExtensionProps {
  title: string;
}

export interface ICafeteriaMenuAdaptiveCardExtensionState {
  cafeteriaMenu: ICafeteriaMenu | undefined;
}

const CARD_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'CafeteriaMenu_QUICK_VIEW';

export default class CafeteriaMenuAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ICafeteriaMenuAdaptiveCardExtensionProps,
  ICafeteriaMenuAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: CafeteriaMenuPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = { 
      cafeteriaMenu: undefined
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    //return Promise.resolve();
    return this._fetchCafeteriaMenus();
  }

  protected get iconProperty(): string {
    return 'warning';
  }

  private _fetchCafeteriaMenus(): Promise<void> {
    return this.context.spHttpClient
    //.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('Announcements')/items?$filter=Important eq 1&$select=Title,ID`,  
    .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('MealsBootCamp')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'accept': 'application/json;odata.metadata=none'
          }
        })
      .then(response => response.json())
      .then(cafeteriaMenus => {
        const cafeteriaMenu = cafeteriaMenus.value.pop();
        this.setState({
          cafeteriaMenu: {
            cuisine: cafeteriaMenu.Cuisine,
            dayname: cafeteriaMenu.DayName,
            dayoftheweek: cafeteriaMenu.DayofTheWeek,
            mealdescription: cafeteriaMenu.MealDescription,
            mealname: cafeteriaMenu.MealName,
            mealrecipe: cafeteriaMenu.MealRecipe,
            vegetarian: cafeteriaMenu.Vegetarian,
            vegan: cafeteriaMenu.Vegan,
            dairyfree: cafeteriaMenu.DairyFree,
            url: `${this.context.pageContext.web.absoluteUrl}/lists/MealsBootCamp/DispForm.aspx?ID=${cafeteriaMenu.ID}`
          }
        });
      })
      .catch(error => console.error(error));
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'CafeteriaMenu-property-pane'*/
      './CafeteriaMenuPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.CafeteriaMenuPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
