       
	$('a.ark_adv_search_help').fancybox({
			type		: 'inline',
			maxWidth	: 1200,
			maxHeight	: 900,
			fitToView	: true,
			width		: '70%',
			height		: '70%',
			autoSize	: true,
			closeClick	: false,
			openEffect	: 'fade',
			closeEffect	: 'fade', 
			openSpeed 	: 1000,
			closeSpeed  : 300,

			tpl: {
				wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin ark-fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				image    : '<img class="fancybox-image" src="{href}" alt="" />',
				iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
				error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn : '<a title="Ausblenden" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
				prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
			},    
			helpers : {
				overlay : {
					css : {
			                'background' : 'rgba(0, 0, 0, 0.80)'
			            }
			        }
				}
		});

	var $_GET = {};
	var aglID = '';

	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        $_GET[decode(arguments[1])] = decode(arguments[2]);
	});



/*	window.onbeforeunload = function() {                                                  
		if($('#ark_adv_search').val().length > 0){
        return "Bist du sicher, dass du diese Seite verlassen möchtest? Alle Sucheingaben gehen damit verloren.";
		}
	};*/
			
	window.location.hash=""; // kill hash

	var arkGetLecturerID = function(input){
		var arkLecturerInput = input;
		arkLecturerOutput = '';
			var name = arkLecturerInput.replace( /((Prof. Dr.)|(Dr. )|(Profe?s?s?o?r?i?n? )|(Prof.)|(Prof\sDr\s))/,'');

			if(name!=='' && name.length>3){
			$.ajax({ url: '../wp-content/plugins/KISDarchive/ark-get-lecturer-id-by-name.php?name='+name,
			data: {action: 'name'},
			async: false,
			type: 'post',
			cache: true,
			contentType: 'application/x-www-form-urlencoded; charset=ISO-8859-1',
			success: function(output) {
				aglID = output;
			}
		});
	}
	};

	var arkSearchEval = function(pointer) {

    pointer = $('#ark_adv_search').prop('value');
		
		$('#ark_responder li').removeClass('active');
		
		//unselect/unset first
		$('#arkRecordLecturerID').attr('value','');
		$('#arkRecordLecturer').attr('value','');
		$('#arkRecordExamType option').attr('selected',false);
		$('#arkRecordSubexam option').attr('selected',false);
		$('#arkRecordLanguage option').attr('selected',false);
		$('#arkRecordArea option').attr('selected',false);
		$('#arkRecordOrder option').attr('selected',false);

		//ark_record_exam_type
		if (/\b[I][Nn]\b|\b[Ii]ntermediate(\w*)\b/g.test(pointer)){	$('#aRET_ip').attr('selected',true); $('#aret_ip').addClass('active'); }
		if (/\b[Bb][Aa]\b|[Bb]achelor(\w*)\b/g.test(pointer)){		$('#aRET_ba').attr('selected',true); $('#aret_ba').addClass('active');}
		if (/\b[Mm][Aa]\b|[Mm]aster(\w*)\b/g.test(pointer)){		$('#aRET_ma').attr('selected',true); $('#aret_ma').addClass('active'); }
		if (/\b[Vv][Dd]\b|[Vv]ordipl(\w*)\b/g.test(pointer)){		$('#aRET_vordipl').attr('selected',true); $('#aret_vordipl').addClass('active'); }
		if (/\b[Dd]\b|\b\s[Dd]\b|[D]ipl(\w*)\b/g.test(pointer)){		$('#aRET_dipl').attr('selected',true); $('#aret_dipl').addClass('active'); }

		//ark_record_subexam
		if (/([Nn]ebenthem(\w*))|\b[Nn][Tt](\d*)\b/g.test(pointer)){	$('#aRS_nt').attr('selected',true); $('#ars_nt').addClass('active');}
		if (/([Hh]auptthem(\w*))|\b[Hh][Tt]\b/g.test(pointer)){	$('#aRS_ht').attr('selected',true); $('#ars_ht').addClass('active');}

		//ark_record_language
		if (/([Dd]eutsch(\w*))|\b[d][e]\b/g.test(pointer)){	$('#aRL_de').attr('selected',true); $('#arl_de').addClass('active');}
		if (/([Ee]nglisc?h(\w*))|\b[Ee][Nn]\b/g.test(pointer)){	$('#aRL_en').attr('selected',true); $('#arl_en').addClass('active');}			
		if (/([Ss]panisc?h(\w*))|\b[Ee][Ss]\b/g.test(pointer)){	$('#aRL_es').attr('selected',true); $('#arl_es').addClass('active');}			
		
		//ark_record_area
		if (/\b[Aa][Vv]\b|\b[Aa]udiovisu(elle|al)\s[Mm]edi(en|a)\b/g.test(pointer)){
			$('#aRA_av').attr('selected',true); $('#ara_av').addClass('active');
		}if(/\b[Dd][Ff][Mm]\b|\b[Dd]esign [Ff]or [Mm]anufacturing\b/g.test(pointer)){
			$('#aRA_dfm').attr('selected',true); $('#ara_dfm').addClass('active');
		}if (/\b[Dd][Kk]\b|\b[Dd]esign(\s?)[Kk]onzepte\b/g.test(pointer)){
			$('#aRA_dk').attr('selected',true); $('#ara_dk').addClass('active');
		}if (/\b[D][E]\b|\b[Dd][Mm]\b|\b[Dd]esign(\s?[UuAa]?n?d?\s?)[Ee]conomy\b/g.test(pointer)){
			$('#aRA_de').attr('selected',true); $('#ara_de').addClass('active');
		}if (/\b[Dd][Tt][Ff]?\b|\b[Dd]esign ?([Tt]heor(ie|y)|[Gg]eschichte)\b/g.test(pointer)){
			$('#aRA_dtf').attr('selected',true); $('#ara_dtf').addClass('active');
		}if (/\b[Gg][Dd]\b|\b[Gg]ender(\w*)\b/g.test(pointer)){
			$('#aRA_gd').attr('selected',true); $('#ara_gd').addClass('active');
		}if (/\b[Ii][Dd]\b|\b[Cc][Ii]\b|\b[Ii]dentit(ät|y) ?[UuAa]?n?d? [Dd]esign\b/g.test(pointer)){
			$('#aRA_id').attr('selected',true); $('#ara_id').addClass('active');
		}if (/\b[Ii][Ff]\b|\b[Ii]nterface ?[Dd]esign\b/g.test(pointer)){
			$('#aRA_if').attr('selected',true); $('#ara_if').addClass('active');
		}if (/[ÖOöo][Dd]\b|\b([ÖOöo]?kologie|[Ee]cology)(\w*)\b/g.test(pointer)){
			$('#aRA_od').attr('selected',true); $('#ara_od').addClass('active');
		}if (/\b[Pp][Tt]\b|\b[Pp]roduktionstechnologie\b/g.test(pointer)){
			$('#aRA_pt').attr('selected',true); $('#ara_pt').addClass('active');
		}if (/\b[Ss][Dd]\b|\b[Ss]ervice ?[Dd]esign\b/g.test(pointer)){
        $('#aRA_sd').attr('selected',true); $('#ara_sd').addClass('active');
		}if (/\b[Tt][Ll]\b|\b[Tt]ypogra(ph|f)ie\b/g.test(pointer)){
			$('#aRA_tl').attr('selected',true); $('#ara_tl').addClass('active');
		}

		// lecturerpointer


		if(/\b([Vv]on\s|[Bb]ei\s)([Pp]rof\.?e?s?s?o?r?i?n?\s?)?([Dd]r.?\s)?(([A-Z][a-züäöß]+)\s?([A-Z][a-z]+)?|([a-züäöß]+)(\s?[a-züäöß]{4,})?)\b/g.test(pointer)){
			var supposedLecturer = pointer.match(/\b([Vv]on\s|[Bb]ei\s)([Pp]rof\.?e?s?s?o?r?i?n?\s?)?([Dd]r.?\s)?(([A-Z][a-züäöß]+)\s?([A-Z][a-z]+)?|([a-züäöß]+)(\s?[a-züäöß]{4,})?)\b/g);

			if(supposedLecturer && supposedLecturer.length==1){
				//one lecturer
				console.log(supposedLecturer);
				//2. check if LecturerID is current ID
				if($('#arkRecordLecturerID').val().length > 0){
					// it's set, retrieve it
					theSetLecturerID = $('#arkRecordLecturerID').attr('value');
					supposedLecturer = supposedLecturer[0].substring(4);
					arkGetLecturerID(supposedLecturer);
					theNewLecturer = aglID.split(',');
					theNewLecturerID = theNewLecturer[0];
					
					if(theSetLecturerID==theNewLecturerID){
						//console.log('samesame');
					}else{
						// not the same ID? reset it all!
						
						$('#arkRecordLecturerID').val(theNewLecturer[0]);
						$('#arkRecordLecturer').val(theNewLecturer[1]);

						//update #arl
						$('#arl').html('<span>pr</span>'+theNewLecturer[1]).prop('title',theNewLecturer[1]);
						
					}

					// it has to be visible in any case...
					$('#arl').addClass('active');
					// ...and aglID resetted.
					aglID = '';
					
				}else{
					// no lecturer id set
					// get the lecturer minus bei or von
					supposedLecturer = supposedLecturer[0].substring(4);

					// get new ID 
					theNewLecturerArray = arkGetLecturerID(supposedLecturer); 
					if(aglID !== ''){

					var tNLA = aglID.split(",");

					theNewLecturerID = tNLA[0];
					theNewLecturerName = tNLA[1];

					// set new ID
					$('#arkRecordLecturerID').val(theNewLecturerID);
					$('#arkRecordLecturer').val(theNewLecturerName);
					
					//update #arl
$('#arl').html('<span>pr</span>'+theNewLecturerName).addClass('active').prop('title',theNewLecturerName);
					
					// set aglID to zero again
					aglID = '';
					}
				}
			}else{
				//two lecturers...?
				//supposedLecturer = supposedLecturer[0].substring(4)+','+supposedLecturer[1].substring(4);
				//$('#arkRecordLecturer').val(supposedLecturer);
				//$('#arkRecordLecturerID').val(arkGetLecturerID(supposedLecturer));
				//$('#arl').html('<span>pr</span>'+supposedLecturer).addClass('active')
			}
		}else{
			// no lecturer			
		}	
		
		//find year(s), look for »bis xxxx« first
		$yearMaxFlag = false;
		$yearMinFlag = false;
		var years;    
		
		
		if(/\bbis\s\d{4}|bis\s\d{2}\b/g.test(pointer)){
			//if there is a bis before the year pointer will go in the according field.
			$yearMaxFlag = true;
			years = pointer.match(/\b\d{4}|\d{2}\b/g);
		}else if(/\bseit\s\d{4}|seit\s\d{2}\b/g.test(pointer)){
			// if seit appears
			$yearMinFlag = true;
			years = pointer.match(/\b\d{4}|\d{2}\b/g);
		}else if(/\b\d{4}|\d{2}\b/g.test(pointer)){
			//business as usual
			years = pointer.match(/\b\d{4}|\d{2}\b/g);
		}
		var currentYear = (new Date).getFullYear();
		
		$('#arkRecordYearMin').val('');
		$('#arkRecordYearMax').val('');
		
		// if there's multiple years, sort em
		if (years && years.length > 1) {
			//mögliche eingaben 99-04, 2003-10 2004, 2005 und 2006.
			
			$.each( years, function( i, val ) {
				//if two digit year
            if(val.length==2||val.length==3){
				//larger than 90 -> prepend 19 / smaller than 90 -> prepend 20
				if(parseInt(val)<90){ 
					years[i] = '20'+val; 
					if(parseInt(years[i])>currentYear){
						years[i] = currentYear;
					}
				}else{ 
					years[i] = '19'+val; 
					if(parseInt(years[i])<1990){
						years[i] = 1990;
					}
				}
			}else{ // anything but two or three digit input presumably
				if(parseInt(years[i])>currentYear){
					years[i] = currentYear;
				}else if(parseInt(years[i])<1990){
					years[i] = 1990;
				}
			}
			
			});
			
			//sort array to get earliest and latest
        years.sort(function(a, b) { return a - b; });
			
			$('#arkRecordYearMin').val(years[0]); // yearMin
			$('#ary').html('<span>jg</span>'+years[0][2]+years[0][3]).attr('title',years[0]).addClass('active');
			if(years[0]!=years[years.length - 1]){
			$('#arkRecordYearMax').val(years[years.length - 1]); // yearMax
			$('#ary').html('<span>jg</span>'+years[0][2]+years[0][3]+'-'+years[years.length-1].toString().substring(2)).attr('title',years[0]+'-'+years[years.length-1]).addClass('active');
			}
			
		}else if(years){
			//just one year? set it!
			years = years[0];
			
			if(years.length==2||years.length==3){

			//larger than 90 -> prepend 19 / smaller than 90 -> prepend 20
			if(parseInt(years)<50){ 
				years = '20'+years; 

				if(parseInt(years)>currentYear){
					years = currentYear;
				}
			}else{ 
				years = '19'+years; 
				if(parseInt(years)<1990){
					years = 1990;
				}
			}

			}else{ // anything but two/three digits
				if(parseInt(years)>currentYear){
					years = currentYear;
				}else if(parseInt(years)<1990){
					years = 1990;
				}
			}
			
			if($yearMaxFlag===true){
				$('#arkRecordYearMax').val(years); 
				$('#arkRecordYearMin').val(1990);
				$('#ary').html('<span>jg</span>'+'90-'+years.substring(2)).attr('title','1990-'+years).addClass('active');
			}else if($yearMinFlag===true){
				$('#arkRecordYearMin').val(years);
				$('#arkRecordYearMax').val(currentYear);
				$('#ary').html('<span>jg</span>'+years[2]+years[3]+'-'+currentYear.toString().substring(2)).attr('title',years+'-'+currentYear).addClass('active');
			}else{
				$('#arkRecordYearMin').val(years);
				var anotheryear = years.toString();
				$('#ary').html('<span>jg</span>'+anotheryear[2]+anotheryear[3]).attr('title',anotheryear).addClass('active');
			}
		}
		
		//sorting		
		if(/\bnach Jahre?n? sortiert|(sortiert nach )([Jj]ahr)|chronologisch/g.test(pointer)){
			$('#aRO_year').attr('selected',true); $('#aro_year').addClass('active');
		}else if(/\bnach Titeln? sortiert|(sortiert nach Titel)/g.test(pointer)){
			$('#aRO_title').attr('selected',true); $('#aro_title').addClass('active');
		}else if(/\bnach Prü?fungsstufe/g.test(pointer)){
			$('#aRO_exam_type').attr('selected',true); $('#aro_exam_type').addClass('active');
		}
		
		if($('li.active').length > 0){
			$('#ark_responder h2').animate({opacity:1},1000);
			$('#ark_adv_search_submit').animate({opacity:1},1000);
		}else{
			$('#ark_responder h2').animate({opacity:0},200);
			$('#ark_adv_search_submit').animate({opacity:0},200);
		}

	};

	jQuery.fn.outerHTML = function(s) {
	return s ? this.before(s).remove()
            : jQuery("<p>").append(this.eq(0).clone()).html();
	};

	if($('#ark_adv_search_input').val()){
		
		arkSearchEval();
		$('input#ark_adv_search').focus();
	}else{
		$('input#ark_adv_search').focus();
	}
				
	$('#ark_adv_search_submit').live('click',function(){
		$('#ark_adv_search_form').submit();
	});
		
	$('#ark_adv_search_form').submit(function(e){
	
		e.preventDefault();
 
	   if($('#ark_responder li.active').length !== 0 || $('input#ark_adv_search').val() === 'Zeige mir alles'){

		
//		window.location.hash = 'q_'+$('input#ark_adv_search').val();

		$('#favicon').prop('href','../wp-content/themes/ark/assets/img/favicon.gif').prop('type','image/gif');
		$('#ark-icon-folder-loader').animate({opacity:1},1000);
		$('#ark_adv_search_submit img').prop('src','../wp-content/themes/ark/assets/img/ajax-loader-active.gif');
		//ark_search_icon.png
		$('#ark_adv_search_input').val($('input#ark_adv_search').val());


		$('h2.ark_adv_search_headline').animate({height:'0',opacity:'0',marginBottom:'0'},500,function(){
			$('h2.ark_adv_search_headline').hide();
		});

//		alert($('#arkRecordLecturerID').val());

		var frm_data = $("#ark_adv_search_form").serialize();

		//console.log(frm_data);
		
		var hash_page = document.location.hash;
		if(!hash_page){ 
			offset = 1; 
		}else{
			offset = hash_page.substring(1);
		}
       
       $.ajax(
       {
       type: "POST",
       url: "../wp-content/plugins/KISDarchive/ark-get-adv-search-results.php?offset="+offset,
       data: frm_data,
       cache: false,
       success: function(response)
       {
        $('#ark_adv_search_results').empty().append(response).animate({opacity:1},500);
        $('#ark_adv_search_submit img').fadeOut(500,function(){
				$(this).prop('src','../wp-content/themes/ark/assets/img/ark_search_icon.png').fadeIn(500);	
				$('#ark-icon-folder-loader').animate({opacity:0},1000);
				$('#favicon').prop('href','../wp-content/themes/ark/assets/img/favicon.ico').prop('type','image/png');
			});
			arkHighlightBookmarks();
       }
	});	
	}else{ // no input, show help
		
		$('a.ark_adv_search_help').fancybox({
				type		: 'inline',
				maxWidth	: 1200,
				maxHeight	: 900,
				fitToView	: true,
				width		: '70%',
				height		: '70%',
				autoSize	: true,
				closeClick	: false,
				openEffect	: 'fade',
				closeEffect	: 'fade', 
				openSpeed 	: 1000,
				closeSpeed  : 300,

				tpl: {
					wrap     : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin ark-fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
					image    : '<img class="fancybox-image" src="{href}" alt="" />',
					iframe   : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
					error    : '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
					closeBtn : '<a title="Ausblenden" class="fancybox-item fancybox-close" href="javascript:;"></a>',
					next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
					prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
				},    
				helpers : {
					overlay : {
						css : {
				                'background' : 'rgba(0, 0, 0, 0.80)'
				            }
				        }
					}
			}).click();
		
	} 
	
	
	});	
		
	if($('#ark_adv_search').length > 0){

		$('#ark_adv_search').keyup(function( event ) {

		}).keydown(function( event ) {
			if(event.which == 8){

				if($('#ark_adv_search').val().length < 2){
					$('#ark_responder li').removeClass('active');
					$('#ark_responder h2').animate({opacity:0},200);
					$('#ark_adv_search_submit').animate({opacity:0},200);
					$('#arkRecordLecturerID').val('');
					$('#arkRecordLecturer').val('');
				}else{
					arkSearchEval();
				}

		}else if(event.which == 32){
			// user has pressed space			
			
			arkSearchEval();
					
		}else if ( event.which == 13 ) {		
        event.preventDefault();

			arkSearchEval();

			$('#ark_adv_search_form').submit();
		
        }
		});


		}
		
		var stoppedTyping;
		$('#ark_adv_search').on('keypress', function(){
		  // is there already a timer? clear if if there is
		  if (stoppedTyping) clearTimeout(stoppedTyping);
		  // set a new timer to execute 3 seconds from last keypress
		  stoppedTyping = setTimeout(function(){    
			arkSearchEval();
		    // code to trigger once timeout has elapsed
		  }, 2e3); // 3 seconds
		});
	   
		if($_GET["q"]){

			// TODO: in which instances does this override other information,
			// how to keep it up to date/
			// when to delete get var from url?
			$('#ark_adv_search_input').prop('value',$_GET["q"]);
			$('#ark_adv_search').prop('value',$_GET["q"]);				
			arkSearchEval();

			$('#ark_adv_search_form').submit();

		}	
	 		
});
	