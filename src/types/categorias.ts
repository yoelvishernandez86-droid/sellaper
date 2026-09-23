export const categorias: Record<string, string[]> = {
  tecnologia: ["laptops", "smartphones", "tablets", "mobile-accessories"],
  ropa: [
    "mens-shirts",
    "mens-shoes",
    "womens-dresses",
    "womens-shoes",
    "tops",
    "mens-watches",
    "womens-watches",
    "sunglasses",
    "womens-bags",
    "womens-jewellery",
  ],
  lifestyle: [
    "beauty",
    "fragrances",
    "skin-care",
    "furniture",
    "home-decoration",
    "kitchen-accessories",
    "sports-accessories",
  ],
};

export const subCategorias = Object.values(categorias).flat();
