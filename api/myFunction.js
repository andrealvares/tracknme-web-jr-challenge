function points() {
    return [
        {
            "dateTime": "2017-10-12T21:34:15",
            "latitude": -23.962676666666667,
            "longitude": -46.3884785
        },
        {
            "dateTime": "2017-10-12T21:40:15",
            "latitude": -23.982676666666667,
            "longitude": -46.4084785
        }
    ];
}

function posicoes(data) {
    let posicoes = [
        [
            {
                "dateTime": "2017-10-02T21:34:15",
                "latitude": -4.970391,
                "longitude": -39.024988
            },
            {
                "dateTime": "2017-10-02T21:40:15",
                "latitude": -4.956320,
                "longitude": -39.027249
            }
        ],
        [
            {
                "dateTime": "2017-10-02T21:34:15",
                "latitude": -4.933794,
                "longitude": -38.783780
            },
            {
                "dateTime": "2017-10-02T21:40:15",
                "latitude": -5.198797,
                "longitude": -39.305525
            }
        ],
        [
            {
                "dateTime": "2017-10-03T21:34:15",
                "latitude": -4.972395,
                "longitude": -39.016436
            },
            {
                "dateTime": "2017-10-03T21:40:15",
                "latitude": -3.736803,
                "longitude": -38.529155
            }
        ]
    ];

    let result = [];

    for (let i = 0; i < posicoes.length; i++) {
        for (let j = 0; j < posicoes[i].length; j++) {
            let date = posicoes[i][j]['dateTime'].slice(0, 10);
            if (date === data) {
                let aux = posicoes[i][j];
                result.push(aux);
            }
        }
    }

    return result;

}

module.exports = {
    points,
    posicoes
}
