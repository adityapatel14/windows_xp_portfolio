// SQL content for supermart_sql.sql — displayed in CodeViewer
const SQL_CONTENT = `-- ═══════════════════════════════════════════════════
--  Supermart Sales Analysis — SQL Queries
--  Database: Salesdb  |  Table: sales
-- ═══════════════════════════════════════════════════

USE Salesdb;

-- ── 1. Basic exploration ──────────────────────────
SELECT * FROM sales LIMIT 10;

SELECT "Order ID", "Customer Name", Sales, Profit
FROM sales;

-- ── 2. Filtering ──────────────────────────────────
SELECT * FROM sales WHERE Region = 'West';

SELECT * FROM sales WHERE Sales > 1500;

SELECT * FROM sales WHERE Profit < 0;

SELECT * FROM sales WHERE Discount = 0;

SELECT * FROM sales WHERE Category = 'Technology';

SELECT * FROM sales WHERE Sales BETWEEN 100 AND 500;

SELECT * FROM sales WHERE State LIKE 'A%';

-- ── 3. Aggregate functions ────────────────────────
SELECT SUM(Sales)   AS Total_Sales   FROM sales;
SELECT SUM(Profit)  AS Total_Profit  FROM sales;
SELECT AVG(Sales)   AS Avg_Sales     FROM sales;
SELECT MAX(Sales)   AS Max_Sale      FROM sales;
SELECT COUNT(DISTINCT Segment) AS Segments FROM sales;

-- ── 4. GROUP BY analysis ──────────────────────────
SELECT Category, ROUND(SUM(Sales), 2) AS CategorySales
FROM sales
GROUP BY Category;

SELECT Region, ROUND(SUM(Profit), 2) AS RegionProfit
FROM sales
GROUP BY Region;

SELECT Segment, AVG(Sales) AS AvgSales
FROM sales
GROUP BY Segment;

SELECT Region, COUNT(OrderID) AS OrderCount
FROM sales
GROUP BY Region;

SELECT SubCategory, SUM(Sales) AS SubCatSales
FROM sales
GROUP BY SubCategory;

SELECT ShipMode, AVG(Profit) AS AvgProfit
FROM sales
GROUP BY ShipMode;

-- ── 5. Sorting & limiting ─────────────────────────
SELECT Sales FROM sales ORDER BY Sales DESC LIMIT 10;

SELECT CustomerName, SUM(Sales) AS TotalSales
FROM sales
GROUP BY CustomerName
ORDER BY TotalSales DESC LIMIT 5;

SELECT Region, SUM(Profit) AS TotalProfit
FROM sales
GROUP BY Region
ORDER BY TotalProfit DESC LIMIT 3;

-- ── 6. HAVING clause ──────────────────────────────
SELECT Category, SUM(Sales) AS TotalSales
FROM sales
GROUP BY Category
HAVING TotalSales > 100000;

SELECT CustomerName, SUM(Profit) AS TotalProfit
FROM sales
GROUP BY CustomerName
HAVING TotalProfit < 0
ORDER BY TotalProfit;

SELECT Region, COUNT(OrderID) AS TotalOrders
FROM sales
GROUP BY Region
HAVING TotalOrders > 2500;

-- ── 7. Subqueries ─────────────────────────────────
SELECT * FROM sales
WHERE Sales > (SELECT AVG(Sales) FROM sales);

SELECT ProductName, SUM(Sales) AS TotalSales
FROM sales
GROUP BY ProductName
HAVING SUM(Sales) > (SELECT AVG(Sales) FROM sales);

-- ── 8. Business insight queries ───────────────────

-- Most profitable category
SELECT Category, SUM(Profit) AS TotalProfit
FROM sales
GROUP BY Category
ORDER BY TotalProfit DESC LIMIT 1;

-- Region with lowest profit but highest sales
SELECT Region, SUM(Profit) AS TotalProfit, SUM(Sales) AS TotalSales
FROM sales
GROUP BY Region
ORDER BY TotalProfit ASC, TotalSales DESC LIMIT 3;

-- Final KPI queries
SELECT COUNT(DISTINCT OrderID) AS UniqueOrders FROM sales;
SELECT SUM(Quantity) AS TotalQuantity FROM sales;
SELECT SUM(Profit)   AS TotalProfit   FROM sales;
`;

export default SQL_CONTENT;
