angular.module("gridModule",[])
.controller("gridController",function($scope){
	$scope.titulo="Hola Mundo";
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
		rowNum:5, 
		rowList:[5,10], 
		pager: '#pager2', 
		sortname: 'idalumno', 
		viewrecords: true, 
		sortorder: "asc", 
		caption:"ANGULAR SERVER" 
	}
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
			data: '=',
		},
		link: function (scope, element, attrs) {
			var table;

			scope.$watch('config', function (newValue) {
				element.children().empty();
				table = angular.element('<table id="'+attrs.ngJqgrid+'"></table>');
				element.append(table);
				//angular.element(table).jqGrid(newValue);
				$(table).jqGrid(newValue);
			});

			/*scope.$watch('data', function (newValue, oldValue) {
				var i;
				for (i = oldValue.length - 1; i >= 0; i--) {
				$(table).jqGrid('delRowData', i);
				}
				for (i = 0; i < newValue.length; i++) {
				$(table).jqGrid('addRowData', i, newValue[i]);
				}
			});*/
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
		rowNum:5, 
		rowList:[5,10], 
		pager: '#pager2', 
		sortname: 'idalumno', 
		viewrecords: true, 
		sortorder: "asc", 
		caption:"JSON Example" 
	}); 
	jQuery("#list2").jqGrid('navGrid','#pager2',{edit:false,add:false,del:false});
});*/
