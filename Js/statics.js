URL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
$.ajax(URL)
.done(function(response){
    // currency: Official dollar 
    let dollarOf = [response[0].casa]
    for(currency of dollarOf){
    let compra = currency.compra
    let venta = currency.venta
    $(".compraOf").html(`COMPRA: $ ${compra}`);
    $(".ventaOf").html(`VENTA: $ ${venta}`);

    // currency: Informal dollar   
    let dollarBl = [response[1].casa]
    for(currency of dollarBl){
    let compra = currency.compra
    let venta = currency.venta
    $(".compraBl").html(`COMPRA: $ ${compra}`);
    $(".ventaBl").html(`VENTA: $ ${venta}`);
    }
}
})
.fail(function(error){
    console.log(error + "Algo no salio segun lo esperado")
})

const average = (arrCredito,arrDebito,arrEfectivo,totalCredito,totalDebito,totalEfectivo) =>{
    total = $("#ingresos--js").attr("value");
    $(".credito--js").remove();
    arrCredito.forEach(function(numero){
        totalCredito += numero 
    }) 
    averageCredito = (parseFloat(totalCredito / total * 100)).toFixed(2)
    $('#credito').append(`<span class= "credito--js info__item">${('&nbsp')}  ${averageCredito} %`)
    
    $(".debito--js").remove();
    arrDebito.forEach(function(numero){
        totalDebito += numero
    })
    averageDebito = (parseFloat(totalDebito / total * 100)).toFixed(2)
    $('#debito').append(`<span class= "debito--js info__item">${('&nbsp')}  ${averageDebito} %`)    
    $(".efectivo--js").remove();
    arrEfectivo.forEach(function(numero){
        totalEfectivo += numero  
    })
    averageEfectivo = (parseFloat(totalEfectivo / total * 100)).toFixed(2)
    $('#efectivo').append(`<span class= "efectivo--js info__item">${('&nbsp')}  ${averageEfectivo} %`)

}

// Total income 
const IngCdad = (arrTotal,total) =>{ 
    $("#ingresos--js").remove();
    arrTotal.forEach(function(numero){
        total += numero
    })
    $("#ingresos").append(`<span class="info__item" id="ingresos--js"  value="${total}" >${('&nbsp')} $ ${total}`)
    $("#unidades--js").remove();
        unidades = arrTotal.length
    $("#unidades").append(`<span class="info__item" id= "unidades--js">${('&nbsp')}  ${unidades} Unidades`)
}
// Taxes 
const taxes = () =>{
    total = $("#ingresos--js").attr("value");
    
    $("#IVA--js").remove();
    let iva = Math.round(total * 0.21)
    $("#iva").append(`<span class="info__item" id="IVA--js" value="${iva}">${('&nbsp')}  $ ${iva}`)

    $("#iibb--js").remove();
    let iibb = Math.round(total * 0.035)
    $("#iibb").append(`<span class="info__item" id= "iibb--js" value="${iibb}">${('&nbsp')}  $ ${iibb}`)
}

// Profit of the day
const profit = () =>{
    total = $("#ingresos--js").attr("value");
    iva = $("#IVA--js").attr("value");
    iibb = $("#iibb--js").attr("value");
    $("#rb--js").remove();
    let rb = Math.round(total - iva - iibb)
    $(".rb").append(`<span class="info__item" id="rb--js">${('&nbsp')}  $ ${rb}`)
}

$('#search').click(createTable)
function createTable(e){ 
    e.preventDefault();
    let keyDate = $(`#dateStatics`).val()
    const sales = JSON.parse(localStorage.getItem(keyDate))
    if( keyDate == ""){
        $("#modal__title").html("Ingrese una fecha")
        $("#modal__text").html("Por favor antes de ingresar la consulta ingrese una fecha")    
        $(".modal").fadeIn("slow");
        $(".modal").css("display", "flex");
        $(".btn-flex").css("display","none");
    }else if(sales == null) {
        $("#modal__title").html("")
        $("#modal__text").html("La fecha ingresada no tiene movimientos registrados")    
        $(".modal").fadeIn("slow");
        $(".modal").css("display", "flex");
        $(".btn-flex").css("display","none");
    }else{
        $(".test").remove();
        $("#ingresos--js").remove();
        let arrCredito = [],
            arrDebito = [],
            arrEfectivo = [],
            arrTotal =[];
        let totalCredito = 0,
            totalDebito = 0,
            totalEfectivo = 0;
            total = 0;
        for( i in sales){
            let row = sales[i]
            $(".table__container").append(`<tr class="test">
            <td>${row.articulo}</td>
            <td>${row.producto}</td>
            <td>${row.mP}</td>
            <td>$ ${row.total}</td>
            </tr>
            `);
            arrTotal.push(parseFloat(row.total))
            if(row.mP == "Credito"){            
                arrCredito.push(parseFloat(row.total))                   
            }else if(row.mP == "Debito"){            
                arrDebito.push(parseFloat(row.total))
            }else if( row.mP == "Efectivo"){           
                arrEfectivo.push(parseFloat(row.total))       
            }
        }     
        IngCdad(arrTotal,total);
        average(arrCredito,arrDebito,arrEfectivo,totalCredito,totalDebito,totalEfectivo)
        taxes()
        profit()
        $(`#dateStatics`).val("")
    }
};


// Example of funcionality  

let arrCreditoTest = [],
    arrDebitoTest = [],
    arrEfectivoTest = [],
    arrTotalTest =[];
var totalCreditoTest = 0,
    totalDebitoTest = 0,
    totalEfectivoTest = 0;
    totalTest = 0;
const testSales = JSON.parse(localStorage.getItem("2021-09-17"))
for( i in testSales){
    var rowTest = testSales[i]
    $(".table__container").append(`<tr class="test">
    <td>${rowTest.articulo}</td>
    <td>${rowTest.producto}</td>
    <td>${rowTest.mP}</td>
    <td>$ ${rowTest.total}</td>
    </tr>
    `);
    arrTotalTest.push(parseFloat(rowTest.total))
    if(rowTest.mP == "Credito"){            
        arrCreditoTest.push(parseFloat(rowTest.total))                   
    }else if(rowTest.mP == "Debito"){            
        arrDebitoTest.push(parseFloat(rowTest.total))
    }else if( rowTest.mP == "Efectivo"){           
        arrEfectivoTest.push(parseFloat(rowTest.total))       
    }
}

IngCdad(arrTotalTest,totalTest);
average(arrCreditoTest,arrDebitoTest,arrEfectivoTest,totalCreditoTest,totalDebitoTest,totalEfectivoTest)
taxes()
profit()