
function modifyUserPwd() {
    let opts = {
        id: 'pwdDialog',
        title: message.core.login.changepwd,
        width: 600,
        height: 400,
        iconCls: 'fa fa-key',
        buttons: [{
            text: message.core.label.confirm,
            iconCls: 'fa fa-save',
            btnCls: 'cubeui-btn-green',
            handler: function () {
                if($("#pwdDialog").form('validate')==true){
                    $("#pwdDialog").iDialog('close').form(
                        'reset');
                    console.log("Logout")
                }
            }
        }, {
            text: message.core.label.close,
            iconCls: 'fa fa-close',
            btnCls: 'cubeui-btn-red',
            handler: function () {
                $("#pwdDialog").iDialog('close');
            }
        }]
    };

    $.app.openDialog(opts.id, contextpath + '/modifypwd.html', 'test=1', opts);
    //$('#' + opts.id).iDialog('openDialog', opts);
};

//// For utility
function removeSubTree(id) {
    let nodes = $('#databaseDg').treegrid('getChildren', id);
    if (nodes == null)
        return;

    let row = $('#databaseDg').treegrid('find', id);

    if(row.children){
        let ids = $.extends.collect(row.children, function (v) {
            return v.id;
        })

        $.each(ids, function (idx, v) {

            $('#databaseDg').treegrid('remove', v);

        })

        delete row.children;
    }
}

function toggleRow(row, initExpandFn){
    if(row.children!=null){
        $('#databaseDg').treegrid('toggle', row.id)
    }else{

        let datas = initExpandFn.call(row, row);

        if(datas !== false){
            $('#databaseDg').treegrid('append', {
                parent:row.id,
                data:datas
            });

            $('#databaseDg').treegrid('expand', row.id)
        }
    }
}
//// For utility end


function removeChildrenNode(row){
    if(row.node && row.node.nodes){

        $.each(row.node.nodes, function (idx,v) {
            if($('#databaseDg').iTreegrid('find',v.id)){
                $('#databaseDg').iTreegrid('remove',v.id);
            }
        })
    }
}

