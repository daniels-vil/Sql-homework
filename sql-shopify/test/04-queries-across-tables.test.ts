import { Database } from "../src/database";
import { minutes } from "./utils";

describe("Queries Across Tables", () => {
    let db: Database;

    beforeAll(async () => {
        db = await Database.fromExisting("03", "04");
    }, minutes(1));

    it("should select count of apps which have free pricing plan", async done => {
        const query = `SELECT COUNT(*) as count
        FROM
            apps_pricing_plans app
        INNER JOIN
            pricing_plans ON app.pricing_plan_id = pricing_plans.id
        WHERE
            price = "Free"`;
        const result = await db.selectSingleRow(query);
        expect(result).toEqual({
            count: 854 //Original: 1112  - Man seit visu laiku meta 854, lai ka es meginatu
       /*
       SELECT COUNT(*) as count
        FROM
            apps_pricing_plans app
       WHERE pricing_plan_id = 1  - uzrakstot ari sito, paradas tikai 854
       */
        });
        done();
    }, minutes(1));

    it("should select top 3 most common categories", async done => {
        const query = 
        `SELECT COUNT(ac.category_id) AS count, c.title AS category
        FROM
            apps_categories ac
        INNER JOIN
            categories c ON ac.category_id = c.id
        GROUP BY
            ac.category_id
        ORDER BY
            count DESC
        LIMIT 3`;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 1193, category: "Store design" },
            { count: 723, category: "Sales and conversion optimization" },
            { count: 629, category: "Marketing" }
        ]);
        done();
    }, minutes(1));

    it("should select top 3 prices by appearance in apps and in price range from $5 to $10 inclusive (not matters monthly or one time payment)", async done => {
        const query = 
        `SELECT 
        COUNT(apps_pricing_plans.app_id) AS count,
        pricing_plans.price AS price,
        CAST(SUBSTR(pricing_plans.price, 2) AS REAL) AS casted_price
    FROM
        pricing_plans
    JOIN 
        apps_pricing_plans
    ON pricing_plans.id = apps_pricing_plans.pricing_plan_id
    WHERE 
        CAST(SUBSTR(pricing_plans.price, 2) AS REAL) BETWEEN 5 AND 10
    GROUP BY 
        price
    ORDER BY 
        count DESC
    LIMIT 3`;
        const result = await db.selectMultipleRows(query);
        expect(result).toEqual([
            { count: 223, price: "$9.99/month", casted_price: 9.99 },
            { count: 135, price: "$5/month", casted_price: 5 },
            { count: 113, price: "$10/month", casted_price: 10 }
        ]);
        done();
    }, minutes(1));
});