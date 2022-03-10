jQuery("#formLogin").submit(async function (event) {
  event.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200)
          redirect('');
  }
  xhr.open("POST", '/login')
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  const s = sch(document.getElementById("vk").value);
  const jsn = JSON.stringify(s.public)
  xhr.send(jsn)


});
// function httpGetAsync(theUrl, callback){
//         const s = sch(document.getElementById("vk").value);
//         const jsn = JSON.stringify(s.public)
//         var xhr = new XMLHttpRequest();
//         xhr.onreadystatechange = function() {
//             if (xhr.readyState == 4 && xhr.status == 200)
//                 callback(xhr.responseText);
//         }
//         xhr.open("POST", theUrl);
//         xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
//         xhr.send(jsn)
//     }
