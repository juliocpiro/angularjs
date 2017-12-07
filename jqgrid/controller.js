angular.module("gridModule",[])
.controller("gridController",function($scope){
	$scope.titulo="Hola Mundo";
	$scope.nombre="fcdgsg";
	$scope.apellido="dsfgsdfg";
	/*$scope.config2 = {
		datatype: "local", 
    	height: 250, 
    	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'], 
    	colModel:[ 
    		{name:'id',index:'id', width:60, sorttype:"int"}, 
    		{name:'invdate',index:'invdate', width:90, sorttype:"date"}, 
    		{name:'name',index:'name', width:100}, 
    		{name:'amount',index:'amount', width:80, align:"right",sorttype:"float"}, 
    		{name:'tax',index:'tax', width:80, align:"right",sorttype:"float"}, 
    		{name:'total',index:'total', width:80,align:"right",sorttype:"float"}, 
    		{name:'note',index:'note', width:150, sortable:false} 
		], 
		caption: "angularJS" 
	}*/
	$scope.config = {
		url:'server.php', 
		datatype: "json", 
		colNames:['ID','Nombre', 'Apellido', 'Nick'], 
		colModel:[ 
			{name:'idalumno',index:'idalumno', width:200}, 
			{name:'nombre',index:'nombre', width:200}, 
			{name:'apellido',index:'apellido', width:300}, 
			{name:'nickname',index:'nickname', width:200, align:"right"}
		], 
		postData: {
            nombre:$scope.nombre,     
            apellido:$scope.apellido
        },
		rowNum:5, 
		rowList:[5,10], 
		mtype: "POST",
		pager: '#pager', 
		sortname: 'idalumno', 
		viewrecords: true, 
		sortorder: "asc", 
		caption:"ANGULAR SERVER" 
	};
	$scope.buscarGrid = function(){
		$scope.api.setData(
			{
				postData:{
					nombre:$scope.nombre,
	            	apellido:$scope.apellido
				},
				page:1
			}
		);		
	};
	/*$scope.data = [ 
    	{id:"1",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"}, 
    	{id:"2",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"}, 
    	{id:"3",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}, 
    	{id:"4",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"}, 
    	{id:"5",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"}, 
    	{id:"6",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}, 
    	{id:"7",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"}, 
    	{id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"}, 
    	{id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"} 
	]; */
})
.directive("ngJqgrid",function(){
	return {
		restrict: 'A',
		scope: {
			config: '=',
            data:   '=?',
            api:    '=?',
		},
		link: function (scope, element, attrs) {
            var table, div;

            scope.$watch('config', function (value) {
                element.children().empty();
                table = angular.element('<table id="' + attrs.gridid + '"></table>');
                element.append(table);
                if (attrs.pagerid) {
                    value.pager = '#' + attrs.pagerid;
                    var pager = $(value.pager);
                    if (pager.length == 0) {
                        div = angular.element('<div id="' + attrs.pagerid + '"></div>');
                        element.append(div);
                    }
                }
                $(table).jqGrid(value);

                // allow to insert(), clear(), refresh() the grid from
                // outside (e.g. from a controller). Usage:
                //   view:  <ng-jqgrid ... api="gridapi">
                //   ctrl:  $scope.gridapi.clear();
                scope.api = {
                	setData:function(data){
                		$(table).jqGrid('setGridParam',data).trigger("reloadGrid");
                	},
                	//   ctrl:  $scope.apicall('method', 'arg1', ...);
                	metodo:function(){
                		var args = Array.prototype.slice.call(arguments,0);
                    	return $(table).jqGrid.apply(table, args);
                	},
                    insert: function(rows) {
                        if (rows) {
                            for (var i = 0; i < rows.length; i++) {
                                scope.data.push(rows[i]);
                            }
                            $(table).jqGrid('setGridParam', { data: scope.data })
                                 .trigger('reloadGrid');
                        }
                    },

                    clear: function() {
                        scope.data.length = 0;
                        $(table).jqGrid('clearGridData', { data: scope.data })
                            .trigger('reloadGrid');
                    },

                    refresh: function() {
                        $(table)
                            /*.jqGrid('clearGridData')
                            .jqGrid('setGridParam', { data: scope.data })*/
                            .trigger('reloadGrid');
                    }
                };
            });

            scope.$watch('data', function (value) {
                $(table).jqGrid('setGridParam', { data: value })
                     .trigger('reloadGrid')
                ;
            });

        }
	};
})

/*$(document).ready(function () {
    jQuery("#list2").jqGrid({ 
		url:'server.php', 
		datatype: "json", 
		colNames:['Inv No','Date', 'Client', 'Amount'], 
		colModel:[ 
			{name:'id',index:'id', width:200}, 
			{name:'invdate',index:'invdate', width:200}, 
			{name:'name',index:'name asc, invdate', width:300}, 
			{name:'amount',index:'amount', width:200, align:"right"}
		], 
		postData: {
            nombres:$('#nombre').val(),
            apellidos:$('#apellido').val(),            
        },
        rowNum:5, 
		rowList:[5,10], 
		pager: '#pager2', 
		sortname: 'idalumno', 
		viewrecords: true, 
		sortorder: "asc", 
		caption:"JSON Example",
		pager: '#pager2',
	}); 
	jQuery("#list2").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});	
});
function gridReload(){ 
		var nombre = jQuery("#nombre").val(); 
		var apellido = jQuery("#apellido").val(); 
		jQuery("#list2").jqGrid('setGridParam',{
			postData:{
				nombres:$('#nombre').val(),
            	apellidos:$('#apellido').val()
			},
			page:1
		}).trigger("reloadGrid"); 	
}
*/
