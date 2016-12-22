var db = require('diskdb');
var gui = require('nw.gui');
db.connect('DB', ['records']);


//Display data as a Table with Sorting as per last letter of Aircraft
function DisplayRecords() {
    var Db = db.records.find();
    var sortedDb = Db.sort(function(a, b) {
    return a.registration.substr(-1).localeCompare(b.registration.substr(-1));
});
    var allRecord = sortedDb;
    var table = '';
    for (var i = 0; i < allRecord.length; i++) {
         var row;
        if (i%2 === 0){
            row = '<tbody class="delete"><tr class="stripe"><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].registration +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].date +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].tlprange +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].msn +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].e1esn +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].e2esn +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].apusn +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].chka +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].chkc +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].remarks +'</td></tr><tr class="stripe"><td style="vertical-align: middle;">'+ allRecord[i].afhrs +'</td><th style="vertical-align: middle; width: 10px;">FH</th><td style="vertical-align: middle;">'+ allRecord[i].e1hrs +'</td><th style="vertical-align: middle; width: 10px;">FH</th><td style="vertical-align: middle;">'+ allRecord[i].e2hrs +'</td><th style="vertical-align: middle; width: 10px;">FH</th><td style="vertical-align: middle;">'+ allRecord[i].apuhrs +'</td><th style="vertical-align: middle; width: 10px;">Hrs</th></tr><tr class="stripe"><td>'+ allRecord[i].afcyc +'</td><th>FC</th><td>'+ allRecord[i].e1cyc +'</td><th>FC</th><td>'+ allRecord[i].e2cyc +'</td><th>FC</th><td>'+ allRecord[i].apucyc +'</td><th>Cyc</th></tr></tbody>';
        } else {
            row = '<tbody class="delete"><tr class=""><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].registration +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].date +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].tlprange +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].msn +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].e1esn +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].e2esn +'</td><td colspan="2" style="font-weight: 400; color: DarkCyan;">'+ allRecord[i].apusn +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].chka +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].chkc +'</td><td style="vertical-align: middle;" rowspan="3">'+ allRecord[i].remarks +'</td></tr><tr class=""><td style="vertical-align: middle;">'+ allRecord[i].afhrs +'</td><th style="vertical-align: middle; width: 10px;">FH</th><td style="vertical-align: middle;">'+ allRecord[i].e1hrs +'</td><th style="vertical-align: middle; width: 10px;">FH</th><td style="vertical-align: middle;">'+ allRecord[i].e2hrs +'</td><th style="vertical-align: middle; width: 10px;">FH</th><td style="vertical-align: middle;">'+ allRecord[i].apuhrs +'</td><th style="vertical-align: middle; width: 10px;">Hrs</th></tr><tr class=""><td>'+ allRecord[i].afcyc +'</td><th>FC</th><td>'+ allRecord[i].e1cyc +'</td><th>FC</th><td>'+ allRecord[i].e2cyc +'</td><th>FC</th><td>'+ allRecord[i].apucyc +'</td><th>Cyc</th></tr></tbody>';
        }
        table += row;
    }
    
    $('.delete').remove(); //Delete Table before inserting new one
    document.getElementById('data').insertAdjacentHTML('afterend', table); //Inser tBodies after Thead.
}


//Display drop down selection list of Aircrafts.
function selectionDisplay() {
    var Db = db.records.find();
    var sortedDb = Db.sort(function(a, b) {
    return a.registration.substr(-1).localeCompare(b.registration.substr(-1));
});
    var allRecord = sortedDb;
    var selection = '';
    for (var j = 0; j < allRecord.length; j++) {
        var option = '<option value="' +allRecord[j]._id+ '">' + allRecord[j].registration +'</option>';
        selection += option;
    }
    
    document.getElementById('remselection').innerHTML = selection;
    document.getElementById('updateselection').innerHTML = selection;
    document.getElementById('adjustselection').innerHTML = selection;
}


//Adds Padding of zero if digits in hours or minutes are less then two
function zeroPadding(num) {
  var numStr = num.toString();
  if (numStr.length < 2) {
    var padded = "0" + numStr;
    return (padded);
  } else {
    return numStr;
  }
}

function addtime(a, b) {
  var arrA = a.split(":");
  var arrB = b.split(":");
  var totalTime = [];
  var hrs = parseInt(arrA[0]) + parseInt(arrB[0]);
  var min = parseInt(arrA[1]) + parseInt(arrB[1]);
  var tmin = (hrs*60)+min;
  
  var rhrs = (tmin-(tmin%60))/60;
  var rmin = tmin%60;
  totalTime.push(zeroPadding(rhrs));
  totalTime.push(zeroPadding(rmin));
  
  var T = totalTime.join(":");
  return T;
}

function subtractTime(a, b) {
  var arrA = a.split(":");
  var arrB = b.split(":");
  var totalTime = [];
  var hrs1 = parseInt(arrA[0]);
  var hrs2 = parseInt(arrB[0]);
  var min1 = parseInt(arrA[1]);
  var min2 = parseInt(arrB[1]);
  
  var t1mins = (hrs1*60) + min1;
  var t2mins = (hrs2*60) + min2;
  var ftime;
  if (t2mins > t1mins) {
    ftime = t2mins - t1mins;
    var c = (ftime-(ftime%60))/60;
    var d = ftime%60;
    totalTime.push("-"+ zeroPadding(c));
    totalTime.push(zeroPadding(d));
  } else {
    ftime = t1mins - t2mins;
    var e = (ftime-(ftime%60))/60;
    var f = ftime%60;
    totalTime.push(zeroPadding(e));
    totalTime.push(zeroPadding(f));
  }

  var T = totalTime.join(":");
  return T;
}


//Estimates hours and for Estimator table
function hoursEstimator(obj, target, record) {
    obj.setAttribute('value',obj.value);
    var hrs = obj.value;
    var tarId = "estihrs-" + target;
    var result = addtime(record, hrs);
    document.getElementById(tarId).innerHTML = result;
}

//Estimates Cycles and for Estimator table
function cycEstimator(obj, target, record) {
    obj.setAttribute('value',obj.value);
    var cyc = obj.value;
    var tarId = "esticyc-" + target;
    var result = parseInt(record) + parseInt(cyc);
    document.getElementById(tarId).innerHTML = result;
}

//Toggles To or & in tlp range inputs.
function toOrAnd(obj){
    var inside = obj.innerHTML;
    if (inside === "TO"){
        obj.innerHTML = "&";
    } else {
        obj.innerHTML = "TO";
    }
}


//Changes Text Area as per the selected status.
function statusSelection(id, txtarea, idname) {
    var selectedStatus = document.getElementById(id).value;
    if (selectedStatus === "completed") {
        document.getElementById(txtarea).innerHTML = '<textarea rows="1" type="text" class="form-control text-center" name="'+idname+'" id="'+idname+'" placeholder="" disabled>Completed</textarea>';
    } else if (selectedStatus === "missing-pages") {
        document.getElementById(txtarea).innerHTML = '<textarea rows="1" type="text" class="form-control text-center" name="'+idname+'" id="'+idname+'" placeholder="Enter Missing TLP Ranges over here!"></textarea>';
    } else if (selectedStatus === "ac-us") {
        document.getElementById(txtarea).innerHTML = '<textarea rows="1" type="text" class="form-control text-center" name="'+idname+'" id="'+idname+'" placeholder="Enter Reason for Unserviceability over here!"></textarea>';
    } else if (selectedStatus === "ac-nofly") {
        document.getElementById(txtarea).innerHTML = '<textarea rows="1" type="text" class="form-control text-center" name="'+idname+'" id="'+idname+'" placeholder="Enter Reason for not flying over here!"></textarea>';
    }
}


//Updates the status as per the selected status And adds the value from textare to display
function statusUpdate(val, idname){
    if(val === "missing-pages"){
        return '<span style="color: orange;"><strong>Missing Pages</strong></span><br>' + document.getElementById(idname).value;
    } else if (val === "ac-us") {
        return '<span style="color: red;"><strong>Aircraft U/S</strong></span><br>' + document.getElementById(idname).value;
    } else if(val === "ac-nofly") {
        return '<span style="color: blue;"><strong>Aircraft No-Fly</strong></span><br>' + document.getElementById(idname).value;
    } else {
        return document.getElementById(idname).value;
    }
}


//Open external URLs using NW.js Shell.
function openUrl(url){
    gui.Shell.openExternal(url);
}


//DIsplays Estimator Table.
function DisplayEstimator() {
    var Db = db.records.find();
    var sortedDb = Db.sort(function(a, b) {
    return a.registration.substr(-1).localeCompare(b.registration.substr(-1));
});
    var allRecord = sortedDb;
    var table = '';
    for (var i = 0; i < allRecord.length; i++) {
         var row;
        if (i%2 === 0){
            row = '<tr class="stripe"><td style="vertical-align: middle;">'+ allRecord[i].registration +'</td><td style="vertical-align: middle;">'+ allRecord[i].afhrs +'</td><td>'+ allRecord[i].afcyc +'</td><td style="padding: 0;"><input style="width: 100%; height: 100%; background-color: #f9f9f9; border: none" class="timepicker" type="text" placeholder="00:00" value="" onkeyup="hoursEstimator(this, \''+ allRecord[i].registration +'\', \''+ allRecord[i].afhrs +'\')"></td><td style="padding: 0;"><input style="width: 100%; height: 100%; background-color: #f9f9f9; border: none" type="number" placeholder="00" value="" onkeyup="cycEstimator(this, \''+ allRecord[i].registration +'\', \''+ allRecord[i].afcyc +'\')"></td><td id="estihrs-'+ allRecord[i].registration +'">'+ allRecord[i].afhrs +'</td><td id="esticyc-'+ allRecord[i].registration +'">'+ allRecord[i].afcyc +'</td></tr>';
        } else {
            row = '<tr><td style="vertical-align: middle;">'+ allRecord[i].registration +'</td><td style="vertical-align: middle;">'+ allRecord[i].afhrs +'</td><td>'+ allRecord[i].afcyc +'</td><td style="padding: 0;"><input style="width: 100%; height: 100%; border: none" class="timepicker" type="text" placeholder="00:00" value="" onkeyup="hoursEstimator(this, \''+ allRecord[i].registration +'\', \''+ allRecord[i].afhrs +'\')"></td><td style="padding: 0;"><input style="width: 100%; height: 100%; border: none" type="number" placeholder="00" value="" onkeyup="cycEstimator(this, \''+ allRecord[i].registration +'\', \''+ allRecord[i].afcyc +'\')"></td><td id="estihrs-'+ allRecord[i].registration +'">'+ allRecord[i].afhrs +'</td><td id="esticyc-'+ allRecord[i].registration +'">'+ allRecord[i].afcyc +'</td></tr>';
        }
        table += row;
    }
    
    
    document.getElementById('estimator-table').innerHTML = table;
}






//Adds New Aircraft to record
var acForm = document.getElementById("aircraft-form");
acForm.onsubmit = function (e) {
    e.preventDefault();
    var aircraft = {};
    aircraft.registration = acForm.reg.value;
    aircraft.date = acForm.date.value;
    aircraft.tlprange = acForm.tlpfrom.value+" "+document.getElementById("toorand").innerHTML+" "+acForm.tlpto.value;
    var status = acForm.statusselection.value;
    aircraft.remarks = statusUpdate(status, "remarks");
    aircraft.afhrs = acForm.afhrs.value;
    aircraft.afcyc = acForm.afcyc.value;
    aircraft.msn = 'MSN: '+ acForm.msn.value;
    aircraft.e1hrs = acForm.e1hrs.value;
    aircraft.e1cyc = acForm.e1cyc.value;
    aircraft.e1esn = 'ESN: '+ acForm.e1esn.value;
    aircraft.e2hrs = acForm.e2hrs.value;
    aircraft.e2cyc = acForm.e2cyc.value;
    aircraft.e2esn = 'ESN: '+ acForm.e2esn.value;
    aircraft.apuhrs = acForm.apuhrs.value;
    aircraft.apucyc = acForm.apucyc.value;
    aircraft.apusn = 'P-'+ acForm.apusn.value;
    aircraft.chka = acForm.chka.value;
    aircraft.chkc = acForm.chkc.value;
    
    if(db.records.findOne({registration : aircraft.registration}) === undefined) {
        db.records.save([aircraft]);
    } else {
        alert(aircraft.registration + " is already in Database");
    }
    
    DisplayRecords();
    DisplayEstimator();
    selectionDisplay();
    
};


//Removes Aircraft from records.
var remAcForm = document.getElementById("removeac-form");
remAcForm.onsubmit = function (e) {
    e.preventDefault();
    var selected = document.getElementById("remselection").value;
    var data = db.records.findOne({_id: selected});
    var acname = data.registration;
    var makesure = confirm("Are you sure to remove " + acname + "?");   //http://t4t5.github.io/sweetalert/
    if (makesure === true) {
        db.records.remove({_id : selected});
    }
    DisplayRecords();
    DisplayEstimator();
    selectionDisplay();
};


//Updates Aircraft in records.
var updateAcForm = document.getElementById("updateac-form");
updateAcForm.onsubmit = function (e) {
    e.preventDefault();
    var thrs = document.getElementById("thrs").value;
    var tcyc = document.getElementById("tcyc").value;
    var upapuhrs = document.getElementById("upapuhrs").value;
    var upapucyc = document.getElementById("upapucyc").value;
    var upDate = document.getElementById("up-date").value;
    var uptlprange = document.getElementById("uptlpfrom").value+" "+document.getElementById("uptoorand").innerHTML+" "+document.getElementById("uptlpto").value;
    var status = document.getElementById("upstatusselection").value;
    var upremarks = statusUpdate(status, "upremarks");
    var selectedAc = document.getElementById("updateselection").value;
    var resetchka = document.getElementById("resetchka").checked;
    var resetchkc = document.getElementById("resetchkc").checked;
    var upchka = function() {
            var a;
            if(resetchka){
                a = "750:00";
            } else {
                a = subtractTime(data.chka, thrs);
            }
            return a;
        };
    var upchkc = function() {
            var a;
            if(resetchkc){
                a =  "7500:00";
            } else {
                a = subtractTime(data.chkc, thrs);
            }
            return a;
        };
    
    var data = db.records.findOne({_id: selectedAc});
    
    var query = {_id : selectedAc};
    var update = {
        date:  upDate,
        tlprange: uptlprange,
        remarks: upremarks,
        afhrs: addtime(data.afhrs, thrs),
        afcyc: (parseInt(data.afcyc) + parseInt(tcyc)).toString(),
        apuhrs: upapuhrs,
        apucyc: upapucyc,
        e1hrs: addtime(data.e1hrs, thrs),
        e1cyc: (parseInt(data.e1cyc) + parseInt(tcyc)).toString(),
        e2hrs: addtime(data.e2hrs, thrs),
        e2cyc: (parseInt(data.e2cyc) + parseInt(tcyc)).toString(),
        chka : upchka(),
        chkc : upchkc()
    };
    
    var acname = data.registration;
    var makesure = confirm("Are you sure you want to update " + acname + " ?");   //http://t4t5.github.io/sweetalert/
    if (makesure === true) {
        db.records.update(query, update);
    }
    
    DisplayRecords();
    DisplayEstimator();
};



//Adjusts Checks in records.
var adjustChksForm = document.getElementById("adjustchks-form");
adjustChksForm.onsubmit = function (e) {
    e.preventDefault();
    var lastchkahrs = document.getElementById("adjustchka").value;
    var lastchkchrs = document.getElementById("adjustchkc").value;
    var selectedAc = document.getElementById("adjustselection").value;
    var resetchka = document.getElementById("adjustresetchka").checked;
    var resetchkc = document.getElementById("adjustresetchkc").checked;
    var data = db.records.findOne({_id: selectedAc});
    var adjustchka = function() {
            var a;
            if(resetchka){
                var difference = subtractTime(data.afhrs, lastchkahrs);
                a = subtractTime("750:00", difference);
            } else {
                a = data.chka;
            }
            return a;
        };
    var adjustchkc = function() {
            var a;
            if(resetchkc){
                var difference = subtractTime(data.afhrs, lastchkchrs);
                a = subtractTime("7500:00", difference);
            } else {
                a = data.chkc;
            }
            return a;
        };
    
    var query = {_id : selectedAc};
    var update = {
        chka : adjustchka(),
        chkc : adjustchkc()
    };
    
    var acname = data.registration;
    var makesure;
    if(resetchka === true && resetchkc === false){
        makesure = confirm("Are you sure you want to adjust Check A of " + acname + " ?");
    } else if(resetchka === false && resetchkc === true) {
        makesure = confirm("Are you sure you want to adjust Check C of " + acname + " ?");
    } else if(resetchka === true && resetchkc === true) {
        makesure = confirm("Are you sure you want to adjust Both Checks of " + acname + " ?");
    }
    
    if (makesure === true) {
        db.records.update(query, update);
    }
    
    DisplayRecords();
};


//Copies Table to Clipboard.
var clipboard = new Clipboard('.copy');
clipboard.on('success', function (e) {
    $('#copy-msg').append('<div class="alert alert-success animated fadeInDown">Table copied <strong>Successfully!</strong></div>');

    function closeAlert() {
        $('.alert').alert('close');
    }
    setTimeout(closeAlert, 1000);

    function clearSelection() {
        if (document.selection) {
            document.selection.empty();
        }
        else if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }
    clearSelection();
    
});

///Prints whatever you want.
function printContent(el){
	var printcontent = document.getElementById(el).innerHTML;
	document.body.innerHTML = printcontent;
	window.print();
    window.location.reload();
}




DisplayRecords();
DisplayEstimator();
selectionDisplay();



$('#addac').draggable();
$('#removeac').draggable();
$('#updateac').draggable();
$('#estimator').draggable();
$('#chksadjust').draggable();


$('.timepicker').timeEntry({unlimitedHours: true, spinnerImage: ''}); //http://keith-wood.name/timeentry.html (Link used for time library)
$('.date').datepicker({
    format: "dd-M-yyyy",
    todayHighlight: true,
    autoclose: true
});