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
//https://stackoverflow.com/questions/32084571/why-is-an-object-in-an-xmlhttprequest-sent-to-a-node-express-server-empty?noredirect=1&lq=1
//https://stackoverflow.com/questions/42942176/what-callback-function-should-i-use-in-an-xmlhttprequest-to-render-the-response
