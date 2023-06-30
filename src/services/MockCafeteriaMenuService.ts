/*import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { PageContext } from "@microsoft/sp-page-context";
import { SPHttpClient } from '@microsoft/sp-http';
import { ICafeteriaMenuItem } from '../models/ICafeteriaMenuItem';
*/
/*
export class SPOCafeteria{
  public async fetchCafeteriaMenus(): Promise<void> {
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
  };
}

*/


/*
public async fetchCafeteriaMenus(): Promise<void> {
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
  };
*/