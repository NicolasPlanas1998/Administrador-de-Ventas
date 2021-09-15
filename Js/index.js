$(document).ready(function () {
    
let quantity = 1;
var arrSell = []

// ---------------button for close and save the sale
$("#btn--0").click(addSave);

function addSave(e){
    e.preventDefault()

    if($(`#date`).val() == ""){
        $("#modal__title").html("Ingrese una fecha")
        $("#modal__text").html("Por favor antes de ingresar la venta ingrese una fecha en el cuadro de Resumen de Ventas")    
        $(".modal").fadeIn("slow");
        $(".modal").css("display", "flex");
        $(".btn-flex").css("display","none");
    }else{
        identificator = this.id
        $(`#${identificator}`).html("ingresada");       
        $(`#${identificator}`).addClass("pressBtn");
        $(`#${identificator}`).attr("disabled","true");

        ubication = (this.id.slice(3))

        let formIds = {
                form: `form${ubication}`,
                articulo: `art${ubication}`,
                producto: `prod${ubication}`,
                descripcion: `descrip${ubication}`,
                medio: `mp${ubication}`,
                monto: `mont${ubication}`,
                descuento: `desc${ubication}`,
                total: `total${ubication}`
        }
        const calcTotal = (precio, porcentaje) => {
            return precio * (1-(porcentaje /100)); 
        }
    
        $(`#${formIds.total}`).val(Math.round(calcTotal($(`#${formIds.monto}`).val(), $(`#${formIds.descuento}`).val())))

        const venta = {
            articulo : $(`#${formIds.articulo}`).val(),
            producto : $(`#${formIds.producto}`).val(),
            descripcion : $(`#${formIds.descripcion}`).val(),
            importe : $(`#${formIds.monto}`).val(),
            mP: $(`#${formIds.medio}`).val(),
            descuento : $(`#${formIds.descuento}`).val(),
            total :$(`#${formIds.total}`).val()
        }
        arrSell.push(venta)

        var arrCredito = [],
            arrDebito = [],
            arrEfectivo = [],
            arrTotal =[];

        for(importe of arrSell){
            medio = importe.mP
            if( medio == "Credito"){
                arrCredito.push(parseFloat(importe.total))
            }else if(medio == "Debito"){
                arrDebito.push(parseFloat(importe.total))
            }else if(medio == "Efectivo"){
                arrEfectivo.push(parseFloat(importe.total))
            }
        }
        var totalCredito = 0,
            totalDebito = 0,
            totalEfectivo = 0;
            resumenTotal = 0;

        if(venta.mP == "Credito"){
            $(".credito--js").remove();
            arrCredito.forEach(function(numero){
                totalCredito += numero
            })
            $(`.resume__mp--credito`).append(`<span class= "credito--js">${('&nbsp')} $ ${totalCredito}`)    
        }else if(venta.mP == "Debito"){
            $(".debito--js").remove();
            arrDebito.forEach(function(numero){
                totalDebito += numero
            })
            $(`.resume__mp--debito`).append(`<span class= "debito--js"> ${('&nbsp')}$ ${totalDebito}`)
        }else if( venta.mP == "Efectivo"){
            $(".efectivo--js").remove();
            arrEfectivo.forEach(function(numero){
                totalEfectivo += numero
            })
            $(`.resume__mp--efectivo`).append(`<span class= "efectivo--js">${('&nbsp')} $ ${totalEfectivo}`)
        }

        const resumenVenas = (credito, debito, efectivo) =>{
            let resultado = credito + debito + efectivo
            return resultado
        }
        sumTotal = arrTotal.push(resumenVenas(totalCredito,totalDebito,totalEfectivo))
        arrTotal.forEach(function(numero){
            resumenTotal += numero
        })

        $(".resultado").remove();
        $(`#resumenTotal`).append(`<span class="resultado"> $ ${resumenTotal}`)
    }
}

// ---------------Button for new sales
$("#newLine").click(addLine);
function addLine (e){
    e.preventDefault();
    createor = quantity++;

    $(".container__lines").append(`<form class="lines__input " id= "form--${createor}"> 
    <div class="input__usuarios art">
    <input  class="complete complete--short"  id="art--${createor}" name="articulo" type="number" placeholder="Articulo">
    </div>
    <div class="input__usuario producto">
    <select class="complete" id= "prod--${createor}" placeholder="Producto">
        <option value="Vestido">Vestido</option>
        <option value="Blusa">Blusa</option>
        <option value="Accesorio">Accesorio</option>
        <option value="Pantalon">Pantalon</option>
    </select>
    </div>
    <div class="input__usuarios">
    <input class="complete" id= "descrip--${createor}" type="text" placeholder="Descripcion" >
    </div>
    <div class="input__usuarios">
    <input  class="complete complete--short"  type="number" id="mont--${createor}" placeholder="Importe">
    </div>
    <div class="input__usuarios">
    <select class="complete" id="mp--${createor}">
        <option value="Credito">Credito</option>
        <option value="Debito">Debito</option>
        <option value="Efectivo">Efectivo</option>
    </select>
    </div>
    <div class="input__usuarios">
    <input class="complete" type="number" id="desc--${createor}" placeholder="Descuento/Aumento">
    </div>
    <div class="input__usuarios">
    <label for="total" id="labelTotal" >Total</label>
    <input class="complete complete--total" disabled type="number" id= "total--${createor}">
    </div>
    <div class= "input__usuarios--boton">
    <button class="save" id= "btn--${createor}">Ingresar Venta</button>
    </div>`)
    $(`#form--${createor}`).hide().fadeIn("slow");
    $(`#btn--${createor}`).click(addSave);
}

// ---------------Button navbar
$("#hamburger").click(menu);

function menu (e){
    e.preventDefault();

    estado = $("nav").css("display");
    if(estado == "none"){
        $('nav').css("display", "flex")
        $("#hamburger").css("borderRadius", "8px 0 0 8px")
    }else{
        $('nav').css("display","none")
        $("#hamburger").css("borderRadius", "8px")
    }
}

// ---------------Button "cerrar dia"
$("#endDay").click(saveDay);
function saveDay(){
    $("#modal__title").html("¿Deseas cerrar el día?")
    $("#modal__text").html("")
    $(".modal").fadeIn("slow");
    $(".modal").css("display", "flex");
    $(".btn-flex").css("display","flex");
}

$("#rechazar").click(reject);
$("#x").click(reject);
function reject(){
    $(".modal").css("display", "none");
}

$("#aceptar").click(accept);
function accept(){
    $(".container__modal").css("display", "none");
    // upload to local storage
    const dayJSON = JSON.stringify(arrSell); 
    localStorage.setItem($(`#date`).val(), dayJSON);

    window.location.reload()
}
});


// To see the functionality of this website you might complete some fields,
// Here are some presets random values just with the objetive to understand how it works
class preset {
    constructor(articulo, producto, descripcion, importe, mP, descuento, total){
    this.articulo = articulo
    this.producto = producto
    this.descripcion = descripcion
    this.mP = mP
    this.descuento = descuento
    this.importe = importe
    this.total = total
    }
}

example1 = new preset("4345","vestido", "", "1000","Credito","10", "900");
example2 = new preset("1234","blusa", "", "4000","Credito", "5", "3800");
example3 = new preset("5542","vestido", "", "3500","Efectivo", "10", "900");


arrExample = [example1,example2,example3,example1,example2,example3,example1,example2,example3,example1,example2,example3,example2,example3]
const JSONexample1 = JSON.stringify(arrExample);

localStorage.setItem("2021-09-17", JSONexample1);

