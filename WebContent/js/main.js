// The root URL for the RESTful services
var rootURL = "http://localhost:8080/zuoyoou/rest/users";

var currentUser;

// Retrieve user list when application starts 
renderTable();

// Nothing to delete in initial application state
$('#btnDelete').hide();

// Register listeners
$('#btnSearch').click(function() {
	search($('#searchKey').val());
	return false;
});

// Trigger search when pressing 'Return' on search key input field
$('#searchKey').keypress(function(e){
	if(e.which == 13) {
		search($('#searchKey').val());
		e.preventDefault();
		return false;
    }
});

$('#userList a').live('click', function() {
	findById($(this).data('identity'));
});

function search(searchKey) {
	if (searchKey == '') 
		findAll();
	else
		findByName(searchKey);
}


function findAll() {
	console.log('findAll');
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json", // data type of response
		success: renderTable
	});
////	$.getJSON( rootURL, function() {
////		console.log( "success" );
////		})
////		.done(function() {
////		console.log( "second success" );
////		})
////		.fail(function( jqxhr, textStatus, error ) {
////			var err = textStatus + ", " + error;
////			console.log( "Request Failed: " + err );
////		})
////		.always(function() {
////	    console.log( "complete" );
////	    });
//	$.ajax({
//		type: 'GET',
//		url: rootURL,
//	    dataType: 'json',
//	    success: function( data ) {
//	      alert( "SUCCESS:  " + data );
//	    },
//	    error: function( data ) {
//	      alert( "ERROR:  " + data );
//	    }
//	  });
}

function findByName(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
}

function findById(id) {
	console.log('findById: ' + id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			$('#btnDelete').show();
			console.log('findById success: ' + data.name);
			currentUser = data;
			renderDetails(currentUser);
		}
	});
}

function renderList(data) {
	// JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
	var list = data == null ? [] : (data instanceof Array ? data : [data]);

	$('#userList tr').remove();
	$.each(list, function(index, user) {
		$('#userList').append('<tr><td><a href="#" data-identity="' + user.uid + '">'+user.name+'</a></td><td>'+user.uid+'</td><td></td></tr>');
	});
}

function renderTable() {
	// Initialize jQuery DataTable
	$(document).ready(function() {
	    $('#defaultUserGroup').dataTable( {
	        "bPaginate": true,
	        "bLengthChange": false,
	        "bFilter": true,
	        "bSort": true,
	        "bInfo": true,
	        "bAutoWidth": false,
	        "bJQueryUI": true,
	        "sScrollY": "400px",
	        "sPaginationType": "full_numbers",
	        "oLanguage": {
	            "sProcessing":   "处理中...",
	            "sLengthMenu":   "显示 _MENU_ 项结果",
	            "sZeroRecords":  "没有匹配结果",
	            "sInfo":         "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
	            "sInfoEmpty":    "显示第 0 至 0 项结果，共 0 项",
	            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
	            "sInfoPostFix":  "",
	            "sSearch":       "搜索:",
	            "sUrl":          "",
	            "sEmptyTable":     "表中数据为空",
	            "sLoadingRecords": "载入中...",
	            "sInfoThousands":  ",",
	            "oPaginate": {
	                "sFirst":    "首页",
	                "sPrevious": "上页",
	                "sNext":     "下页",
	                "sLast":     "末页"
	            },
	            "oAria": {
	                "sSortAscending":  ": 以升序排列此列",
	                "sSortDescending": ": 以降序排列此列"
	            }
	        },
	        "sDom": '<"H"fTr>t<"F"ip>',
	        "sSwfPath": "../media/swf/copy_csv_xls_pdf.swf",
			"oTableTools": {
				"sRowSelect": "multi",
				"aButtons": [ 
				             {
				            	 "sExtends": "select_all",
				            	 "sButtonText": "全选"
				             }
				             ]
			},
	        "bProcessing": true,
	        "sAjaxSource": rootURL,
	        "sAjaxDataProp": "",
	        "aoColumns": [
	                      {"mData": "name" },
	                      {"mData": "uid" },
	                      {"mData": "activeStatus" }]
	    } );
	} );
}

function renderDetails(user) {
	$('#userId').val(user.uid);
	$('#name').val(user.name);
	$('#contactid').val(user.contactInfoId);
	$('#activestatus').val(user.activeStatus);
	$('#roleid').val(user.roleId);
}

//// Helper function to serialize all the form fields into a JSON string
//function formToJSON() {
//	var userId = $('#usrId').val();
//	return JSON.stringify({
//		"id": userId == "" ? null : userId, 
//		"name": $('#name').val(), 
//		"contactid": $('#contactid').val(),
//		"activestatus": $('#activestatus').val(),
//		"roleid": $('#roleid').val()
//		});
//}
