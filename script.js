
const buttons = document.querySelectorAll("button");
let screenContent = document.getElementById("screen");

function sinDeg(degre){
    return Math.sin((degre*Math.PI)/180);
} 
function cosDeg(degre){
    return Math.cos((degre*Math.PI)/180);
} 
function tanDeg(degre){
    return Math.tan((degre*Math.PI)/180);
}

function fact(n){
    if(n===0){
        return 1;
    }else{
        return n*fact(n-1);
    }
}

function permute(n, r){
    if(n<r){
        return false ;
    }else if(r===0){
        return 1;
    }else{
        return n*permute(n-1, r-1);
    }
}

function combine(n, r){
    return permute(n,r)/fact(r);
}

let tokens = [];

function refresh(){
    screenContent.value = tokens.map(btn => btn.affichage).join("");
}

buttons.forEach(function(btn){
    btn.addEventListener("click", function(){
        
        if(this.dataset.value !== undefined){
            let calculus = this.dataset.value;
            if(this.dataset.eval!==undefined){
                calculus = this.dataset.eval;
            }

            tokens.push({ affichage:this.dataset.value, calculus: calculus}); 
            refresh();
        }else if(this.dataset.action === "clear"){
            tokens = []; 
            refresh();

        }else if(this.dataset.action==="backspace"){
            tokens.pop(); 
            refresh();
        }else if(this.dataset.action ==="calculate"){
            try{
                let calculer = tokens.map(btn=>btn.calculus).join("");
                let result = Math.round(eval(calculer)*1e10)/1e10;
                tokens = [{affichage: String(result), calculus: String(result)}];
                refresh();
            }catch(error){
                console.log(error);
                tokens = [];
                screenContent.value="syntax-error";
            }
        }
        
    });
});

document.addEventListener("keydown", function(event){

    event.preventDefault();
    let aButton = null;

    if(event.key === "Enter"){
        aButton = document.querySelector('[data-action="calculate"]');
    }else if(event.key === "Backspace"){
        aButton = document.querySelector('[data-action="backspace"]');
    }else if(event.key === "Escape"){
        aButton = document.querySelector('[data-action="clear"]');
    }else{
        aButton = document.querySelector(`[data-value="${event.key}"]`);
    }
    if (aButton!==null){
        aButton.click();
    }
});

