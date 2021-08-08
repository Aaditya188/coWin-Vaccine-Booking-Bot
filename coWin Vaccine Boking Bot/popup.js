
// When the button is clicked, inject setPageBackgroundColor into current page
document.getElementById("submit").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const state = $("#state").val()
    const districts = $("#districts").val().trim().length > 0 ? $("#districts").val().trim().split(",") : []
    const age = $("#age").val()
    const vaccine = $("#vaccine").val()
    const price = $("#price").val()
    const n = parseInt($("#beneficiaries").val())
    const appointmentSlot = parseInt($("#time_slot").val())
    const mode = 1
    const wait_time = parseFloat($("#wait_time").val())
    const searchType = $('input[name=search_type]:checked').val()
    const pincodes = $("#pincodes").val().trim().length > 0 ? $("#pincodes").val().trim().split(",") : []
    const arg = {
        state,
        districts, 
        age,
        vaccine, 
        type: price, 
        n, 
        mode, 
        searchIntervalInSeconds: wait_time, 
        appointmentSlot, 
        weeks,
        searchType,
        pincodes
    }
    await chrome.storage.sync.set({args: arg, running: true, iter: 0});
    console.log("SUBMITTED")
    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['jquery.js'],
        });
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['main.js'],
        });
        chrome.tabs.sendMessage(tabs[0].id, {args: arg});
        updateStatus()
    })
});

$('input[name=search_type]').change(() => {
    handleSearchTypeChange()
})

function handleSearchTypeChange() {
    const searchType = $('input[name=search_type]:checked').val()
    console.log({searchType})
    if (searchType === "pincode") {
        $("#district_search").hide()
        $("#pin_search").show()
    } else if (searchType === "districts") {
        $("#district_search").show()
        $("#pin_search").hide()
    }
}
function updateStatus() {
    chrome.storage.sync.get(['running', 'args', 'iter'], ({running, args, iter}) => {
        const {runs=0} = args || {}
        console.log({running, iter, runs})
        if (running && iter < args.runs) {
            $("#status").show()
            $("#status div").text("Running (" + (parseInt(iter) + 1) +"/" + args.runs + ")")
            $("#form").hide()
        } else {
            $("#status").hide()
            chrome.storage.sync.set({running: false, iter: 0});
            $("#form").show()
        }
    })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.iter || request.running) {
        const obj = {}
        if (request.iter) {
            obj.iter = request.iter;
        }
        if (request.running !== undefined) {

            obj.running = request.running;
        }
        chrome.storage.sync.set(obj, () => {
            updateStatus()
        });
    }
    
    if (request.status) {
        chrome.storage.sync.set({running: false, iter: 0}, () => {
            console.log(request.status)
            if (request.status === "entering_captcha") {
                $("#status div").text("Entering Captcha..")
            } else if (request.status === "loading") {
                $("#status div").text("Waiting..")
            } else if (request.status === "appointment_successful") {
                $.ajax({
                    url: 'https://wjz4v0d5v2.execute-api.eu-west-1.amazonaws.com/prod/cowinbot',
                    type: 'post',
                    data: {},
                    headers: {
                        "x-api-key": 'ISiriuxyV82w9Tpv6WOCV1qsjWATuH339Di1Rm58'  //for object property name, use quoted notation shown in second
                    },
                    dataType: 'json',
                    success: function (data) {
                       
                    }
                });
                $("#status div").text("Appointment Booked!")
            } else if (request.status === "slot_found") {
                $("#status div").text("Slot Found")
            } else if (request.status === "complete") {
                updateStatus()
            }
        });
        
        
    }
  }
);


$(document).ready(async () => {
    chrome.storage.sync.get('args', ({args}) => {
        if (args) {
            if (args.state)
                $("#state").val(args.state)
            $("#districts").val((args.districts || []).join(","))
            if (args.age)
                $("#age").val(args.age)
            if (args.vaccine)
                $("#vaccine").val(args.vaccine)
            if (args.type)
                $("#price").val(args.type).change()
            if (args.n)
                $("#beneficiaries").val(args.n)
            if (args.appointmentSlot)
                $("#time_slot").val(args.appointmentSlot)
            if (args.runs)
                $("#runs").val(args.runs)
            if (args.weeks)
                $("#weeks").val(args.weeks)
            if (args.searchIntervalInSeconds)
                $("#wait_time").val(args.searchIntervalInSeconds)
            if (args.skipDays)
                $("#skip_days").val(args.skipDays)
            if (args.searchType) {
                if (args.searchType === 'pincode') {
                    $("#radio-pincode").attr("checked", true)
                    $("#radio-districts").removeAttr('checked')
                } else {
                    $("#radio-districts").attr("checked", true)
                    $("#radio-pincode").removeAttr('checked')
                }
            }
            $("#pincodes").val((args.pincodes || []).join(","))
        }
        handleSearchTypeChange()
    })

    chrome.tabs.query({active: true, currentWindow: true}, async function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {query: 1});
    })

    updateStatus()
})


document.getElementById("stop").addEventListener("click", async () => {
    chrome.storage.sync.set({running: false}, () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {stop: true});
            updateStatus()
        })
    })
})


