export interface Product {
    id:          number;
    title:       string;
    price:       number;
    description: Description;
    images:      string[];
    creationAt:  Date;
    updatedAt:   Date;
    category:    Category;
}

export interface Category {
    id:         number;
    name:       Name;
    image:      string;
    creationAt: Date;
    updatedAt:  Date;
}

export enum Name {
    Clothes = "Clothes",
}

export enum Description {
    ADescription = "A description",
    DescriptionOfTheProduct = "Description of the product...",
    UpdatedProductDescription = "Updated product description",
}
