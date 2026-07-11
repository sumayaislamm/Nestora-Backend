export const notFound = (req, res) => {
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "API endpoint not found",
        error: {
            path: req.originalUrl,
            message: "No route found with this URL",
        },
    });
};
//# sourceMappingURL=notFound.js.map