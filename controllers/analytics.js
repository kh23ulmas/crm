module.exports.overview = function (req,res) {
    res.status(200).json({
        analytics: 'you get overview'
    })
}

module.exports.analytics = function (req,res) {
    res.status(200).json({
        analytics: 'you get analytics'
    })
}

