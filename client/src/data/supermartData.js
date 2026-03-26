// Supermart Sales Dataset — derived from supermart_sales_data.csv (sample rows)
// Mirrors the Power BI dashboard columns

export const supermartColumns = [
  { key: "OrderID",     label: "Order ID"    },
  { key: "OrderDate",   label: "Order Date"  },
  { key: "CustomerName",label: "Customer"    },
  { key: "Segment",     label: "Segment"     },
  { key: "Region",      label: "Region"      },
  { key: "State",       label: "State"       },
  { key: "Category",    label: "Category"    },
  { key: "SubCategory", label: "Sub-Cat"     },
  { key: "ProductName", label: "Product"     },
  { key: "Sales",       label: "Sales ($)"   },
  { key: "Quantity",    label: "Qty"         },
  { key: "Discount",    label: "Discount"    },
  { key: "Profit",      label: "Profit ($)"  },
];

export const supermartData = [
  { OrderID:"CA-2014-138688", OrderDate:"11/9/2014",  CustomerName:"Chloris Kastensmidt", Segment:"Consumer",   Region:"West",    State:"California",    Category:"Office Supplies", SubCategory:"Labels",      ProductName:"Avery 479",              Sales:12.96,   Quantity:2,  Discount:0.0,  Profit:6.218  },
  { OrderID:"CA-2014-138688", OrderDate:"11/9/2014",  CustomerName:"Chloris Kastensmidt", Segment:"Consumer",   Region:"West",    State:"California",    Category:"Office Supplies", SubCategory:"Storage",     ProductName:"Stur-D-Stor Steel Frame", Sales:61.97,   Quantity:2,  Discount:0.0,  Profit:12.394 },
  { OrderID:"CA-2014-138688", OrderDate:"11/9/2014",  CustomerName:"Chloris Kastensmidt", Segment:"Consumer",   Region:"West",    State:"California",    Category:"Furniture",       SubCategory:"Chairs",      ProductName:"Global Task Chair",       Sales:957.578, Quantity:3,  Discount:0.45, Profit:-383.03},
  { OrderID:"US-2014-156909", OrderDate:"10/20/2014", CustomerName:"Corey Lock",          Segment:"Corporate",  Region:"East",    State:"New York",      Category:"Technology",      SubCategory:"Phones",      ProductName:"Apple Smartphone",       Sales:863.19,  Quantity:3,  Discount:0.0,  Profit:172.638},
  { OrderID:"US-2014-156909", OrderDate:"10/20/2014", CustomerName:"Corey Lock",          Segment:"Corporate",  Region:"East",    State:"New York",      Category:"Office Supplies", SubCategory:"Binders",     ProductName:"Avery EZD Rings",        Sales:15.552,  Quantity:3,  Discount:0.2,  Profit:5.443  },
  { OrderID:"CA-2014-115020", OrderDate:"6/9/2014",   CustomerName:"Ed Braxton",          Segment:"Consumer",   Region:"Central", State:"Texas",         Category:"Furniture",       SubCategory:"Tables",      ProductName:"Bretford CR4500",        Sales:957.578, Quantity:5,  Discount:0.45, Profit:-383.03},
  { OrderID:"CA-2014-115020", OrderDate:"6/9/2014",   CustomerName:"Ed Braxton",          Segment:"Consumer",   Region:"Central", State:"Texas",         Category:"Technology",      SubCategory:"Accessories", ProductName:"Belkin Flash Drive",     Sales:22.72,   Quantity:2,  Discount:0.2,  Profit:7.384  },
  { OrderID:"CA-2014-143567", OrderDate:"8/27/2014",  CustomerName:"Zuschuss Donatelli",  Segment:"Consumer",   Region:"West",    State:"California",    Category:"Office Supplies", SubCategory:"Paper",       ProductName:"Ativa V4110MDD",         Sales:19.46,   Quantity:2,  Discount:0.0,  Profit:9.342  },
  { OrderID:"CA-2015-100811", OrderDate:"3/5/2015",   CustomerName:"Seth Vernon",         Segment:"Home Office",Region:"East",    State:"Pennsylvania",  Category:"Technology",      SubCategory:"Phones",      ProductName:"Mophie Powerstation",   Sales:1097.54, Quantity:7,  Discount:0.0,  Profit:164.631},
  { OrderID:"CA-2015-100811", OrderDate:"3/5/2015",   CustomerName:"Seth Vernon",         Segment:"Home Office",Region:"East",    State:"Pennsylvania",  Category:"Office Supplies", SubCategory:"Binders",     ProductName:"Cardinal Slant-D Rings", Sales:13.33,   Quantity:1,  Discount:0.0,  Profit:7.998  },
  { OrderID:"CA-2015-133648", OrderDate:"7/14/2015",  CustomerName:"Daniel Byrd",         Segment:"Consumer",   Region:"South",   State:"Florida",       Category:"Furniture",       SubCategory:"Bookcases",   ProductName:"Sauder Camden County",  Sales:4711.527,Quantity:9,  Discount:0.0,  Profit:919.748},
  { OrderID:"CA-2015-158940", OrderDate:"4/8/2015",   CustomerName:"Andrea Chhajed",      Segment:"Consumer",   Region:"West",    State:"California",    Category:"Technology",      SubCategory:"Copiers",     ProductName:"Canon PC1080F",          Sales:1199.98, Quantity:2,  Discount:0.0,  Profit:359.994},
  { OrderID:"CA-2016-112326", OrderDate:"1/11/2016",  CustomerName:"Sylvia Foulston",    Segment:"Corporate",  Region:"West",    State:"California",    Category:"Office Supplies", SubCategory:"Appliances",  ProductName:"Fellowes PB500",        Sales:5117.739,Quantity:7,  Discount:0.0,  Profit:818.838},
  { OrderID:"CA-2016-140166", OrderDate:"5/4/2016",   CustomerName:"Jim Sink",            Segment:"Consumer",   Region:"Central", State:"Illinois",      Category:"Technology",      SubCategory:"Phones",      ProductName:"Motorola Headset",       Sales:154.99,  Quantity:1,  Discount:0.1,  Profit:27.648 },
  { OrderID:"CA-2016-118437", OrderDate:"9/3/2016",   CustomerName:"David Arters",        Segment:"Home Office",Region:"South",   State:"Georgia",       Category:"Furniture",       SubCategory:"Chairs",      ProductName:"HON 5400 Series",       Sales:2669.634,Quantity:9,  Discount:0.3,  Profit:-720.8 },
  { OrderID:"CA-2016-163265", OrderDate:"12/28/2016", CustomerName:"Justin Ritter",       Segment:"Consumer",   Region:"East",    State:"New York",      Category:"Office Supplies", SubCategory:"Envelopes",   ProductName:"Staple Brand Env",      Sales:46.72,   Quantity:8,  Discount:0.0,  Profit:20.524 },
  { OrderID:"CA-2017-107503", OrderDate:"2/24/2017",  CustomerName:"Pauline Chand",       Segment:"Consumer",   Region:"Central", State:"Texas",         Category:"Technology",      SubCategory:"Accessories", ProductName:"Sennheiser HD",         Sales:90.93,   Quantity:3,  Discount:0.2,  Profit:11.366 },
  { OrderID:"CA-2017-140432", OrderDate:"8/17/2017",  CustomerName:"Karen Seio",          Segment:"Corporate",  Region:"West",    State:"Washington",    Category:"Office Supplies", SubCategory:"Storage",     ProductName:"Avery Heavy-Duty",      Sales:65.984,  Quantity:4,  Discount:0.0,  Profit:26.394 },
  { OrderID:"CA-2017-152900", OrderDate:"10/4/2017",  CustomerName:"Penelope Sewall",     Segment:"Consumer",   Region:"West",    State:"Oregon",        Category:"Furniture",       SubCategory:"Tables",      ProductName:"Chromcraft Rectangular",Sales:609.98,  Quantity:2,  Discount:0.0,  Profit:-60.998},
  { OrderID:"CA-2017-169551", OrderDate:"12/21/2017", CustomerName:"Alejandro Grove",     Segment:"Consumer",   Region:"South",   State:"Tennessee",     Category:"Technology",      SubCategory:"Phones",      ProductName:"Cisco SPA 504G",        Sales:912.84,  Quantity:3,  Discount:0.0,  Profit:182.568},
];

// ── KPI summary (matches Power BI screenshot) ──────────────────
export const supermartKPIs = {
  totalSales:    2300000,
  totalProfit:   286400,
  profitMargin:  12.47,
  totalOrders:   5009,
  totalQuantity: 37873,
};

// ── Sales by Year/Month (line chart) ───────────────────────────
export const salesByYearMonth = [
  { period:"Jan 2014", Sales:30000   },
  { period:"Apr 2014", Sales:45000   },
  { period:"Jul 2014", Sales:68000   },
  { period:"Oct 2014", Sales:55000   },
  { period:"Jan 2015", Sales:48000   },
  { period:"Apr 2015", Sales:72000   },
  { period:"Jul 2015", Sales:85000   },
  { period:"Oct 2015", Sales:77000   },
  { period:"Jan 2016", Sales:62000   },
  { period:"Apr 2016", Sales:91000   },
  { period:"Jul 2016", Sales:110000  },
  { period:"Oct 2016", Sales:98000   },
  { period:"Jan 2017", Sales:80000   },
  { period:"Apr 2017", Sales:112000  },
  { period:"Jul 2017", Sales:130000  },
  { period:"Oct 2017", Sales:120000  },
];

// ── Sales + Profit Margin by Region & Segment ──────────────────
export const salesByRegionSegment = [
  { region:"West",    Consumer:220000, Corporate:110000, HomeOffice:45000, profitMargin:14.2 },
  { region:"East",    Consumer:280000, Corporate:140000, HomeOffice:60000, profitMargin:13.1 },
  { region:"Central", Consumer:180000, Corporate:95000,  HomeOffice:38000, profitMargin:10.8 },
  { region:"South",   Consumer:150000, Corporate:80000,  HomeOffice:30000, profitMargin:11.5 },
];

// ── Sales by Category (pie / donut) ───────────────────────────
export const salesByCategory = [
  { name:"Furniture",       value:430000, percent:18.62 },
  { name:"Office Supplies", value:710000, percent:30.87 },
  { name:"Technology",      value:1160000,percent:50.43 },
];

// ── Top 10 Products by Sales (bar) ───────────────────────────
export const topProducts = [
  { ProductName:"Canon imageCLASS",  Sales:61600, Category:"Technology"      },
  { ProductName:"Fellowes PB500",    Sales:27400, Category:"Office Supplies"  },
  { ProductName:"Cisco TelePresence",Sales:20800, Category:"Technology"      },
  { ProductName:"HON 5400 Series",   Sales:18700, Category:"Furniture"       },
  { ProductName:"GBC DocuBind P400", Sales:14600, Category:"Office Supplies"  },
  { ProductName:"GBC Ibimaster",     Sales:12800, Category:"Office Supplies"  },
  { ProductName:"HP Designjet",      Sales:11600, Category:"Technology"      },
  { ProductName:"GBC DocuBind T400", Sales:10900, Category:"Office Supplies"  },
  { ProductName:"GBC DocuBind 200",  Sales:10200, Category:"Office Supplies"  },
  { ProductName:"High Speed Auto",   Sales:9400,  Category:"Technology"      },
];

// ── Profit vs Discount scatter ────────────────────────────────
export const profitVsDiscount = [
  { Discount:0.0,  Profit:8000,  Category:"Furniture"      },
  { Discount:0.1,  Profit:6500,  Category:"Furniture"      },
  { Discount:0.2,  Profit:2000,  Category:"Furniture"      },
  { Discount:0.3,  Profit:-4000, Category:"Furniture"      },
  { Discount:0.45, Profit:-9000, Category:"Furniture"      },
  { Discount:0.0,  Profit:9500,  Category:"Office Supplies"},
  { Discount:0.1,  Profit:7000,  Category:"Office Supplies"},
  { Discount:0.2,  Profit:3500,  Category:"Office Supplies"},
  { Discount:0.3,  Profit:-1500, Category:"Office Supplies"},
  { Discount:0.0,  Profit:12000, Category:"Technology"     },
  { Discount:0.1,  Profit:8500,  Category:"Technology"     },
  { Discount:0.2,  Profit:4000,  Category:"Technology"     },
  { Discount:0.3,  Profit:-2000, Category:"Technology"     },
  { Discount:0.5,  Profit:-8000, Category:"Technology"     },
];

export const CATEGORY_COLORS = {
  Furniture:        "#4472C4",
  "Office Supplies":"#ED7D31",
  Technology:       "#FFC000",
};

export const SEGMENT_COLORS = {
  Consumer:   "#4472C4",
  Corporate:  "#ED7D31",
  HomeOffice: "#A5A5A5",
};

export default supermartData;
