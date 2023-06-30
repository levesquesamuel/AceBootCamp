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

  export class ICafeteriaMenu implements ICafeteriaMenu {
    constructor(
      public id: number = 0,
      public title: string = "",
      public description: string = "",
      public imageURL: string = "",
      public linkURL: string = "",
      
    ) { }
  }