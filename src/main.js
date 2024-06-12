function InitializeNodeItens(statusInicial = null){
    InitializeNodesStatus(statusInicial)

    $(".node__item").click(function(){
        OpenCloseNode($(this))
    })
}

function OpenCloseNode($nodeClick){
    let idNodeOrigem = $nodeClick.data("nodeItem")
    let status = $("[data-node-item='"+idNodeOrigem+"']").data('nodeStatus')
    acao = status == "open" ? "close" : "open";
    
    ShowAndHideNodeChilds($nodeClick,idNodeOrigem,acao);

    if(status == "open"){
        $nodeClick.data("nodeStatus","closed")
    }else{
        $nodeClick.data("nodeStatus","open")
    }
}

function ShowAndHideNodeChilds($element, idNodeOrigem,acao){
    let idNode = $element.data("nodeItem")
    let qtdFilhos = $element.nextAll("[data-node-parent='"+idNode+"']").length
    let statusItem = $("[data-node-item='"+idNode+"']").data('nodeStatus')        
    let Filhos = $element.nextAll("[data-node-parent='"+idNode+"']");

    if(qtdFilhos > 0){
        if(statusItem != "closed" ||(idNodeOrigem == idNode)){
            for(let i=0;i<qtdFilhos;i++){
                ShowAndHideNodeChilds($(Filhos[i]),idNodeOrigem,acao)
            }    
        }
    }
    if(idNode != idNodeOrigem){
        if(acao == "close"){
            $element.css("display","none")
        }else{
            $element.css("display","table-row")
        }
    }
}

function InitializeNodesStatus(statusInicial = null){
    $(".node__item").each(function(){
        if($(this).data("nodeStatus") == "closed"){
            $(this).data("nodeStatus","open")
            OpenCloseNode($(this))
        }else{
            $(this).data("nodeStatus","open")
        }
        // if($(this).data("nodeStatus") == undefined){
        //     $(this).data("nodeStatus","open")
        // }

        
    })

    if(statusInicial == "closed"){
        $(".node__item").each(function(){
            if($(this).data("nodeStatus") == "open"){
                OpenCloseNode($(this),"close")
            }
            
        })
    }
}