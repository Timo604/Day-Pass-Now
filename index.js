let toggle1 = document.getElementById('info1');

let domNode1 = document.getElementById('gym1');

toggle1.addEventListener("click", setVisibility(domNode1)) 

function setVisibility(domNode){
    {
        if(domNode.style == "display: none"){
        domNode.style = "display: visible";
        } else{
        domNode.style = 'display: none';
        }
    }
}

