import AppError from "../error/error.js";
import {cacheProvider} from "../cache/init.js";

const idImpotency = ({ strict = true, ttl = 3600 } = {}) => {
    return async (req, res, next) => {

        const idempotencyKey = req.headers["idempotency-key"];

        if (!idempotencyKey) {
            if (strict === true) {
                throw new AppError("Missed idempotency key", 400);
            }
            return next();
        }

        const key = `${req.method}:${req.originalUrl}:${idempotencyKey}`;

        const cached = await cacheProvider.get(key);

        if (cached) {
            res.setHeader("X-Cache", "HIT");
            return res.json(JSON.parse(cached));
        }

        const originalJson = res.json.bind(res);


        res.json = ((body) => { 

            res.setHeader("X-Cache", "MISS");

            if (res.statusCode >= 200 && res.statusCode < 300) {
                cacheProvider.set(key, JSON.stringify(body), ttl);
            }

            return originalJson(body);
        });

        next();
    };
};


export{
    idImpotency
}