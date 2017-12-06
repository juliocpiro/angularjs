<?php 
	$dbhost="localhost";
	$dbuser="root";
	$dbpassword="";
	$database="escuela";

	$page = $_GET['page']; // get the requested page 
	$limit = $_GET['rows']; // get how many rows we want to have into the grid 
	$sidx = $_GET['sidx']; // get index row - i.e. user click to sort 
	$sord = $_GET['sord']; // get the direction 
	if(!$sidx) $sidx =1; 
	// connect to the database 
	$db = mysql_connect($dbhost, $dbuser, $dbpassword) 
	or die("Connection Error: " . mysql_error()); 
	mysql_select_db($database) or die("Error conecting to db."); 
	$result = mysql_query("SELECT COUNT(*) AS count FROM alumno"); 
	$row = mysql_fetch_array($result,MYSQL_ASSOC); 
	$count = $row['count']; 
	if( $count >0 ) { 
		$total_pages = ceil($count/$limit); 
	} else { 
		$total_pages = 0; 
	} 
	if ($page > $total_pages) $page=$total_pages; 
	$start = $limit*$page - $limit; // do not put $limit*($page - 1) 
	$SQL = "SELECT * FROM alumno ORDER BY $sidx $sord LIMIT $start , $limit"; 

	$result = mysql_query( $SQL ) or die("Couldn t execute query.".mysql_error()); 


	$responce=array("page"=>$page,"total"=>$total_pages,"records"=>$count);

	$i=0; 
	$dataRow=array();
	while($row = mysql_fetch_array($result,MYSQL_ASSOC)) { 
		array_push($dataRow, array("id"=>$row["idalumno"],"cell"=>array(
					$row["idalumno"],
					$row["nombre"],
					$row["apellido"],
					$row["nickname"]
				)
			)
		);
	} 
	$responce["rows"]=$dataRow;
	
	echo json_encode($responce);
?>