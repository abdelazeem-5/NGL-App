import { cacheProvider } from "./init.js";

const withCache = (ttl = 3600) => {
    return async (req, res, next) => {

        const key = `${req.method}:${req.originalUrl}`;
        const cached = await cacheProvider.get(key);

        if (cached) {
            res.setHeader("X-Cache", "From cache `HIT`");
            return res.json(JSON.parse(cached));
        }

        const originalJson = res.json.bind(res);


        res.json = async (body) => {
            if(res.statusCode >= 200 && res.statusCode < 300){
            await cacheProvider.set(key, JSON.stringify(body), ttl);
            res.setHeader("X-Cache", "Not from cache `MISS`");
            return originalJson(body);
            }
        };

        next();
    };
};

export {
    withCache
};