
const correlationId = (req, res, next) => {
    const id = crypto.randomUUID();
    req.correlationId = id;
    res.setHeader('X-CorrelationId', id);
    next();
}


export{
    correlationId
}