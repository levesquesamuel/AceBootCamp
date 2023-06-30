import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { CafeteriaMenuPropertyPane } from './CafeteriaMenuPropertyPane';
import { SPHttpClient } from '@microsoft/sp-http'
import { ICafeteriaMenu } from '../../models/ICafeteriaMenu';

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

    return this._fetchCafeteriaMenus();
  }

  protected get iconProperty(): string {
    return 'warning';
  }

  
  private _fetchCafeteriaMenus(): Promise<void> {
    return this.context.spHttpClient
       .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/getByTitle('MealsBootCamp')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'accept': 'application/json;odata.metadata=none'
          }
        })
      .then(response => response.json())
      .then(cafeteriaMenus => {
        const spoCafeteriaMenuItem = cafeteriaMenus.value.pop();
        this.setState({
          cafeteriaMenu: {
            cuisine: spoCafeteriaMenuItem.Cuisine,
            dayname: spoCafeteriaMenuItem.DayName,
            dayoftheweek: spoCafeteriaMenuItem.DayofTheWeek,
            mealdescription: spoCafeteriaMenuItem.MealDescription,
            mealname: spoCafeteriaMenuItem.MealName,
            mealrecipe: spoCafeteriaMenuItem.MealRecipe,
            vegetarian: spoCafeteriaMenuItem.Vegetarian,
            vegan: spoCafeteriaMenuItem.Vegan,
            dairyfree: spoCafeteriaMenuItem.DairyFree,
            url: `${this.context.pageContext.web.absoluteUrl}/lists/MealsBootCamp/DispForm.aspx?ID=${spoCafeteriaMenuItem.ID}`
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
