$(document).ready(function(){
    let formulario = $('#formulario').on('submit', function(e){
        let numero = parseInt($('#idHero').val())
        e.preventDefault();
        $('#resultado').html(" ");
        $('#idHero').val(" ")
        $('#chartContainer').html(" ")
        validar(numero)
    });

    function validar (num) {
        let expression = /^[0-9]+$/
        if(expression.test(num)){
            console.log(num)
        } else{
            alert('Ingrese un número válido')
        };
        $.ajax({
            datatype: "json",
            method: "GET",
            url: `https://superheroapi.com/api.php/2619421814940190/${num}`,
            success: function (respuesta) {
                if(respuesta.response ==="success") {
                    let respResult = `
                <div class="card container">
                    <div class="card-header">
                    Resultados del superhéroe
                    </div>
                    <img src="${respuesta.image.url}">
                    <div class="card-body">
                        <h5 class="card-title">${respuesta.name}</h5>
                        <p class="card-text">Altura: ${respuesta.appearance.height}</p>
                        <p class="card-text">Peso: ${respuesta.appearance.weight}</p>
                        <p class="card-text">Ocupación: ${respuesta.work.occupation}</p>
                    </div>
                </div>`
                $('#resultado').append(respResult)

                let statsXY = []
                for(let key in respuesta.powerstats){
                    statsXY.push({x: key, y: respuesta.powerstats[key]})
                }

                let opcion = {
                    title: {
                        text: `Estadísticas de poder de ${respuesta.name}`
                    },
                    data: [
                        {
                            type: "pie",
                            startAngle: 45,
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabel: "{label} ({y})",
                            yValueFormatString: "#, ##0.#" % " ",
                            dataPoints: statsXY,
                        },
                    ],
                };
                $('#chartContainer').CanvasJSChart(opcion);
                } else {
                    alert('Tu número excede la cantidad permitida');
                };
                
            },

            error: function(error) {
                console.log('No se encontró el héroe')
            }
        })
    }

})