//------------- forms-advanced.js -------------//
$(document).ready(function() {
  $.fn.serializeObject = function()
  {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name] !== undefined) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      } else {
        o[this.name] = this.value || '';
      }
    });
    return o;
  };

	//------------- Sparklines in header stats -------------//
    $('#spark-visitors').sparkline([5,8,10,8,7,12,11,6,13,8,5,8,10,11,7,12,11,6,13,8], {
        type: 'bar',
        width: '100%',
        height: '20px',
        barColor: '#dfe2e7',
        zeroAxis: false,
    });

    $('#spark-templateviews').sparkline([12,11,6,13,8,5,8,10,12,11,6,13,8,5,8,10,12,11,6,13,8,5,8], {
        type: 'bar',
        width: '100%',
        height: '20px',
        barColor: '#dfe2e7',
        zeroAxis: false,
    });

    $('#spark-sales').sparkline([19,18,20,17,20,18,22,24,23,19,18,20,17,20,18,22,24,23,19,18,20,17], {
        type: 'bar',
        width: '100%',
        height: '20px',
        barColor: '#dfe2e7',
        zeroAxis: false,
    });

    //------------- Fancy select -------------//
    $('.fancy-select').fancySelect();
    //custom templating
    $('.fancy-select1').fancySelect({
        optionTemplate: function(optionEl) {
            return optionEl.text() + '<i class="pull-left ' + optionEl.data('icon') + '"></i>';
        }
    });

	//------------- Select 2 -------------//
	$('#countries').select2({placeholder: 'Select a Country'});
  $('#states').select2({placeholder: 'Select a state'});
  $('#cities').select2({placeholder: 'Select a city'});

  $('#countries2').select2({placeholder: 'Select a Country'});
  $('#states2').select2({placeholder: 'Select a state'});
  $('#cities2').select2({placeholder: 'Select a city'});

  $('#countries').on('change', function() {
    doStates('#countries','#states','#cities');
  });
  
  $('#countries2').on('change', function() {
    doStates('#countries2','#states2','#cities2');
  });
  
  function doStates(countriesId,statesId,citiesId){
    var iso= $(countriesId).val(),
        states = $(statesId).select2(),
        cities = $(citiesId).select2();
    states.empty();
    cities.empty();
    getStates(iso,states,statesId,citiesId); 
  }

  $('#states').on('change', function() {
    doCities('#countries','#states','#cities')
  });
  
  $('#states2').on('change', function() {
    doCities('#countries2','#states2','#cities2')
  });
  
  function doCities(countriesId,statesId,citiesId){
    var state= $(statesId).val(),
        iso= $(countriesId).val(),
        cities = $(citiesId).select2();
    cities.empty();
    getCities(iso,state,cities,citiesId); 
  }


  function getStates(iso,states,statesId,citiesId){
    $.get('/getStates/'+iso,function(result){
      initSelect2Input(statesId,result);
      var state= $(statesId).val(),
          cities = $(citiesId).select2();
      getCities(iso,state,cities,citiesId);
    });
  }

  function getCities(iso,state,cities,citiesId){
    $.get('/getCities/'+iso+'/'+state,function(result){
      initSelect2Input(citiesId,result);
    });
  }

  function initSelect2Input(selection,data){
   $(selection).select2({
      placeholder: "Select report type",
      allowClear: false,
      data:data
   });
  }

  /*Submit Form*/
  $('#listTrip').on('click', function(e) {
    e.preventDefault();
    $('#tripForm').submit();
  });

  $("#tripForm").submit(function(e) {
    e.preventDefault();
    console.log($("#tripForm").serializeObject());
    // var isvalidate=$("#tripForm").valid();
    //   if(isvalidate){
    //     $.post("/newTrip", $("#tripForm").serializeObject(), function(data, error){
    //       console.log(data);
    //     });
    //   }
  });

  // // init for first data source
  // initSelect2Input(data1);
  // // destroy for new data soruce init!
  // $('#select2InputId').select2('destroy');
  // // init for secound data source
  // initSelect2Input(data2);

  // $('input.typeahead').typeahead({
  //       name: 'typeahead',
  //       remote: {
  //         url: '/getCity/search?key=%QUERY',
  //         filter: function(list) {
  //           return $.map(list, function(search) {
  //               return {
  //                   name: sear
  //               };
  //           });
  //       }
  //       display : 'name',
  //       limit: 10,
  //       hint: true,
  //       highlight: true,
  //       minLength: 2
  //       // templates: {
  //       //     suggestion: function (data) {
  //       //       console.log(data);
  //       //         return '<p><strong>' + data.name + '</strong> - ' + data.id + '</p>';
  //       //     }
  //       // }
  //   });
//   $('input.typeahead').bind('typeahead:selected', function(obj, datum, name) {
//   console.log($('.typeahead').val());
// });

	//minumum 2 symbols input
	// $('#getCity').select2({
 //    ajax: {
 //      url: "/getCity/",
 //      dataType: 'json',
 //      delay: 250,
 //      data: function (term) {
 //        return {
 //          term: term
 //        };
 //      },
 //      processResults: function (data, page) {
 //        // parse the results into the format expected by Select2.
 //        // since we are using custom formatting functions we do not need to
 //        // alter the remote JSON data
 //        return {
 //          results: data.items
 //        };
 //      },
 //      cache: true
 //    },
 //    escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
 //    minimumInputLength: 2,
    
 //  });

	//------------- Masked input fields -------------//
	$("#mask-phone").mask("(999) 999-9999");
	$("#mask-phoneExt").mask("(999) 999-9999? x99999");
	$("#mask-phoneInt").mask("+99 999 999 9999");
	$("#mask-date").mask("99/99/9999");
	$("#mask-ssn").mask("999-99-9999");
	$("#mask-productKey").mask("a*-999-a999", { placeholder: "*" });
	$("#mask-eyeScript").mask("~9.99 ~9.99 999");
	$("#mask-percent").mask("99%");

	//------------- Dual list box -------------//
	$('.duallistbox').bootstrapDualListbox({
	    nonSelectedListLabel: 'Non-selected',
  		selectedListLabel: 'Selected',
	    preserveSelectionOnMove: 'moved',
	    moveOnSelect: false,
	});

	// //------------- Spinners -------------//
	// $("#basic-spinner").TouchSpin({
 //        min: 0,
 //        max: 100
 //    });
 //    //with postfix
 //    $("#postfix-spinner").TouchSpin({
 //        min: 0,
 //        max: 100,
 //        postfix: '%'
 //    });
 //    //with prefix
 //    $("#prefix-spinner").TouchSpin({
 //        min: 0,
 //        max: 100,
 //        prefix: '$'
 //    });
 //    //decimal spinner
 //    $("#decimal-spinner").TouchSpin({
 //        min: 1,
 //        max: 10,
 //        step: 0.1,
 //        decimals: 2
 //    });
    // //vertical buttons
    // $("#vertical-spinner").TouchSpin({
    //     verticalbuttons: true,
    //     verticalupclass: 'fa fa-angle-up s12',
    //     verticaldownclass: 'fa fa-angle-down s12'
    // });

    //------------- Datepicker -------------//
    $("#basic-datepicker").datepicker();
    $("#basic-datepicker2").datepicker();
    // //multiple date
    // $("#multiple-datepicker").datepicker({
    // 	multidate: true
    // });
    // //date range
    // $(".input-daterange").datepicker();
    // //inline
    // $("#inline-datepicker").datepicker();

    //------------- Timepicker -------------//
    $('#default-timepicker').timepicker({
    	upArrowStyle: 'fa fa-angle-up',
    	downArrowStyle: 'fa fa-angle-down',
    });
    $('#default-timepicker2').timepicker({
      upArrowStyle: 'fa fa-angle-up',
      downArrowStyle: 'fa fa-angle-down',
    });
    // //custom time
    // $('#customtime-timepicker').timepicker({
    // 	upArrowStyle: 'fa fa-angle-up',
    // 	downArrowStyle: 'fa fa-angle-down',
    // 	defaultTime: '22:45 AM'
    // });
    // //custom minute step
    // $('#minute-step-timepicker').timepicker({
    // 	upArrowStyle: 'fa fa-angle-up',
    // 	downArrowStyle: 'fa fa-angle-down',
    // 	minuteStep: 30
    // });
    // //show seconds
    // $('#show-seconds-timepicker').timepicker({
    // 	upArrowStyle: 'fa fa-angle-up',
    // 	downArrowStyle: 'fa fa-angle-down',
    // 	showSeconds: true
    // });

    // //------------- Colorpicker -------------//
    // $('#default-colorpicker').colorpicker();
    // //as component
    // $('#component-colorpicker').colorpicker({
    // 	color: '#1fba5d'
    // });
    // //horizontal
    // $('#horizontal-colorpicker').colorpicker({
    // 	horizontal: true
    // });
    // //inline
    //  $('#inline-colorpicker').colorpicker({
    // 	inline: true,
    // 	container: '.inline-picker'
    // });

    //------------- Tags -------------//
    //from json
 //    var citynames = new Bloodhound({
	//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
	//   queryTokenizer: Bloodhound.tokenizers.whitespace,
	//   prefetch: {
	//     url: 'ajax/citynames.json',
	//     filter: function(list) {
	//       return $.map(list, function(cityname) {
	//         return { name: cityname }; });
	//     }
	//   }
	// });
	// citynames.initialize();

	// $('#json-tags').tagsinput({
	// 	typeaheadjs: {
	// 		name: 'citynames',
	// 		displayKey: 'name',
	// 		valueKey: 'name',
	// 		source: citynames.ttAdapter()
	// 	}
	// });

 //    //------------- WYSIWYG summernote -------------//
 //    $('#summernote').summernote({
 //        height: 200
 //    });

});