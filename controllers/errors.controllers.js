exports.handleCustomErrors = (err, request, response, next) => {
    if (err.status && err.msg) {
        response.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handleServerErrors = (err, request, response, next) => {
    console.log(err);

    response.status(500).send({ msg: 'server error' });
};
