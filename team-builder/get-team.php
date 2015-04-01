<?php

	// get connection details
	include_once 'connection-strings.php';

	// create mysql connection
	$con=mysqli_connect(HOST, USER, PASSWORD, DATABASE);

	// check connection
	if (mysqli_connect_errno()) {
	  echo "Failed to connect to MySQL: " . mysqli_connect_error();
	}

	// query gets the page details from database
	$query =   "SELECT 
					posts.post_title,
	  				posts.post_content,
	  				posts.ID
	    		FROM  wp_orbu_posts posts
	    		WHERE
	    			posts.post_status = 'publish'
	    		AND posts.post_name = 'affiliates'
	    		AND posts.post_type = 'page'
	    		LIMIT 1";

	// get data from database
	$result = mysqli_query($con, $query);
	$pagedetails = $result -> fetch_assoc();

	// build response object
	$response = new stdClass();

	$teamMemberNames = array();
	$teamMemberNames[] = "Anthimos Christofi";
	$teamMemberNames[] = "Charlotte Wilson";
	$teamMemberNames[] = "Chris Drake";
	$teamMemberNames[] = "Dan Boot";
	$teamMemberNames[] = "Dan Williams";
	$teamMemberNames[] = "Fran Wilson";
	$teamMemberNames[] = "Frank Treanor";
	$teamMemberNames[] = "Hammad Malik";
	$teamMemberNames[] = "James Richford";
	$teamMemberNames[] = "James Symon";
	$teamMemberNames[] = "Jeremy Rui";
	$teamMemberNames[] = "Jonathan Millbank";
	$teamMemberNames[] = "Jonathan Posner";
	$teamMemberNames[] = "Kaj Bains";
	$teamMemberNames[] = "Kathryn Collinson";
	$teamMemberNames[] = "Kathryn Williams";
	$teamMemberNames[] = "Kersteen Kummer";
	$teamMemberNames[] = "Lina Balanta";
	$teamMemberNames[] = "Lisa Qiao";
	$teamMemberNames[] = "Marie Treanor";
	$teamMemberNames[] = "Martin Taylor";
	$teamMemberNames[] = "Mick Farrow";
	$teamMemberNames[] = "Sam Wilson";
	$teamMemberNames[] = "Scarlett Thomas";
	$teamMemberNames[] = "Simon Adcock";
	$teamMemberNames[] = "Sue Hall";
	$teamMemberNames[] = "Veronica Tierney";

	// add data to response object
	$teamMembers = array();

	foreach ($teamMemberNames as $teamMemberName){
		$teamMember = new stdClass();

		$teamMember -> name = $teamMemberName;

		$teamMembers[] = $teamMember;
	}

	$response -> teamMembers = $teamMembers;

	// close connection
	mysqli_close($con);

	// send response as json
	echo json_encode($response);
?>