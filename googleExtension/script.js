var total = 0
var orders = new Map();
var opts = {
  method: 'GET',      
  headers: {}
}

function displayError(stringTotal){
  document.getElementById("total").style.color="red"
  document.getElementById("total").innerHTML="Login in your shopee acount and click the button of your country's shopee website"
}

function displayTotal(stringTotal){
  document.getElementById("total").style.color="blue"
  document.getElementById("total").innerHTML=stringTotal
}

function populateTable(){
  let table = '<table class="table table-bordered" >';
   table += `<tr><th>Order Name</th><th>Item Total</th></tr>`;
   orders.forEach((count, itemTotal) => {
       table = table + `<tr>`;
       table = table + `<td>${itemTotal}</td>`;
       table = table + `<td>${count}</td>`;
       table += `</tr>`;
    });
    table += "</table>";
    document.getElementById("ordersTable").innerHTML = table;
}

function processing(){
  document.getElementById("total").style.color="green"
  document.getElementById("total").innerHTML="Calculating Your Total"
}

function displayAll(stringTotal){
  displayTotal(stringTotal)
  populateTable()
}

function calculateTotal(body){
  for (let [key, value] of Object.entries(body.data.details_list)) {
    var itemTotal = value.info_card.final_total / 100000;
    total += itemTotal;
    orders.set(value.info_card.order_list_cards[0].items[0].name, itemTotal)
  }
}

//start region: country calculation

async function calculatePH(offset){
  processing()
  try {
    var res = await fetch('https://shopee.ph/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  if(next_offset >= 0){
    calculateTotal(body)
    calculatePH(next_offset)
  } else {
    displayAll("Total: ₱" + total)
  }
}

async function calculateTW(offset){
  processing()
  try {
    var res = await fetch('https://shopee.tw/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  console.log(res)
  if(next_offset >= 0){
    calculateTotal(body)
    calculateTW(next_offset)
  } else {
    displayAll("Total: NT$" + total)
  }
}

async function calculateTH(offset){
  processing()
  try {
    var res = await fetch('https://shopee.co.th/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  if(next_offset >= 0){
    calculateTotal(body)
    calculateTH(next_offset)
  } else {
    displayAll("Total: ฿" + total)
  }
}

async function calculateSG(offset){
  processing()
  try {
    var res = await fetch('https://shopee.sg/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  if(next_offset >= 0){
    calculateTotal(body)
    calculateSG(next_offset)
  } else {
    displayAll("Total: S$" + total)
  }
}

async function calculateMY(offset){
  processing()
  try {
    var res = await fetch('https://shopee.com.my/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  if(next_offset >= 0){
    calculateTotal(body)
    calculateMY(next_offset)
  } else {
    displayAll("Total: RM" + total)
  }
}

async function calculateID(offset){
  processing()
  try {
    var res = await fetch('https://shopee.co.id/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  if(next_offset >= 0){
    calculateTotal(body)
    calculateID(next_offset)
  } else {
    displayAll("Total: Rp" + total)
  }
}

async function calculateVN(offset){
  processing()
  try {
    var res = await fetch('https://shopee.vn/api/v4/order/get_order_list?limit=20&list_type=3&offset='+offset, opts)
  } catch (error) {
    displayError()
  }
  var body = await res.json()
  var next_offset = body.data.next_offset
  if(next_offset >= 0){
    calculateTotal(body)
    calculateVN(next_offset)
  } else {
    displayAll("Total: ₫" + total)
  }
}

//endregion

document.getElementById("PH").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculatePH(0)
})
document.getElementById("TW").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculateTW(0)
})
document.getElementById("TH").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculateTH(0)
})
document.getElementById("SG").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculateSG(0)
})
document.getElementById("MY").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculateMY(0)
})
document.getElementById("ID").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculateID(0)
})
document.getElementById("VN").addEventListener('click', function (){
  total = 0
  orders = new Map()
  calculateVN(0)
})