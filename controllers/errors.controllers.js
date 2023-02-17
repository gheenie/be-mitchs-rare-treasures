exports.handle404StatusCodes = (err, request, response, next) => {
    if (err.status === 404) {
        response.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handle500StatusCodes = (err, request, response, next) => {
    console.log(err);

    response.status(500).send({ msg: 'server error' });
};
